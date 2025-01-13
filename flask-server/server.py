from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from flask_cors import CORS
from datetime import datetime
from db_setup import db
from models.product import Product
from routes.products import products_bp
from models.user import User
from routes.users import users_bp
import threading
from flask_login import LoginManager
from flask_session import Session
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)  # Initialize Bcrypt with the app
CORS(app, supports_credentials=True, origins=["http://192.168.0.101:3000", "http://localhost:3000"]) # Allows cross-origin requests from React frontend
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

# Session and cookie configuration
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
# app.config['SESSION_COOKIE_SECURE'] = os.getenv('FLASK_ENV') == 'production'
app.config['SESSION_COOKIE_SECURE'] = False

app.config['SESSION_TYPE'] = 'filesystem'  # Store sessions on the server filesystem
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
Session(app)

# Global variable to store recipient email
thread_running = False

# Config SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# Set this to False to improve performance and avoid seeing unnecessary warnings.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Set up the database
db.init_app(app)

# Initialize LoginManager
login_manager = LoginManager()
login_manager.init_app(app)  # Bind to the app
login_manager.login_view = 'login'
login_manager.login_message = "Unauthorized access. Please log in first."
login_manager.login_message_category = "error"

# Custom unauthorized handler
@login_manager.unauthorized_handler
def unauthorized():
    return jsonify({'error': 'Unauthorized access. Please log in first.'}), 401

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
      print(user.email)
      if not user.email:
        print(f"User with id {user.id} does not have an email set.")
        continue
      
      products = Product.query.filter_by(user_id = user.id).all()
      for product in products:
        print(product.name)
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

# Start the expiration checking thread:
check_expiring_products()  

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000, debug=True)