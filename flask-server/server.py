from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from flask_cors import CORS
import secrets
from datetime import datetime
from db_setup import db
from models.product import Product
from routes.products import products_bp
from models.user import User
from routes.users import users_bp
import threading
from flask_login import LoginManager
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)  # Initialize Bcrypt with the app
CORS(app) # Allows cross-origin requests from React frontend
mail = Mail(app) # instantiate the mail class 
# app.secret_key = secrets.token_hex(32) # 32 bytes = 64-character hex string
app.secret_key = os.getenv('FLASK_SECRET_KEY')

# configuration of mail 
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_DEFAULT_SENDER'] = 'khangbui2023@gmail.com'
app.config['MAIL_USERNAME'] = 'khangbui2023@gmail.com'
app.config['MAIL_PASSWORD'] = 'omdt jihh bqho enfc'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app) 

# Global variable to store recipient email
recipient_email = None
thread_running = False

# Config SQLite database

# Tells Flask-SQLAlchemy to use an SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# Set this to False to improve performance and avoid seeing unnecessary warnings.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Set up the database
db.init_app(app)

# Initialize LoginManager
login_manager = LoginManager()
login_manager.init_app(app)  # Bind to the app
login_manager.login_view = 'login'

# User loader for Flask-Login
@login_manager.user_loader
def load_user(id):
  return User.query.get(int(id))

# Register blueprints
app.register_blueprint(products_bp)
app.register_blueprint(users_bp)

# Initialize the database
with app.app_context():
    db.create_all()

# Background task to check for expiring products
def check_expiring_products():
  with app.app_context(): # Ensure we are inside an application context
    users = User.query.all()
    today = datetime.today().date()
    
    # Only proceed if a recipient email is set
    for user in users:
      if not user.email:
        print(f"User with id {user.id} does not have an email set.")
        continue
      
      products = Product.query.filter_by(id = user.id).all()
      for product in products:
        dayLeft = (product.expiration_date - today).days
        
        if dayLeft <= 0:
          send_email_notification(user.email, product, "expired", "It belongs in the street!!!")
          print(f"Notification: {product.name} is expired.")
          
        elif dayLeft <= 2:
          send_email_notification(user.email, product, "expiring soon", "Please cook with it!")
          print(f"Notification: {product.name} is expiring in {dayLeft} days. You better cook with it soon!")
    threading.Timer(86400, check_expiring_products).start()

# Method to send email, notifying about expiring/expired product(s)
def send_email_notification(user_email, product, status, action): 
  if user_email:
    subject = f"Product {product.name} is {status}"
    body = f"Dear user,\n\nYour product {product.name} is {status}. \n{action}."
    msg = Message(subject, recipients=[user_email], body = body)
    mail.send(msg)
    return f'Notification email successfully sent for {product.name} ({status})'
  else:
    print("No recipient email set")
    return None

# Endpoint to set recipient email from frontend
@app.route("/set-recipient", methods=["POST"])
def set_recipient():
    global recipient_email, thread_running
    data = request.get_json()
    new_email = data.get("email")
    if not new_email:
        return jsonify({"error": "Email is required"}), 400
    
    # Update recipient email so that email is always updated
    recipient_email = new_email
    print(f"Recipient email updated to: {recipient_email}")
    # Start background thread only if it's not running already
    if not thread_running:
        thread_running = True
        check_expiring_products()
    return jsonify({"message": "Recipient email set successfully!"}), 200

# Start the expiration checking thread:
check_expiring_products()  

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000, debug=True)