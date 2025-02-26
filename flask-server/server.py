from flask import Flask, jsonify
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from flask_cors import CORS
from datetime import datetime
from db_setup import db, init_db
from models.product import Product
from routes.products import products_bp
from models.user import User
from routes.users import users_bp
import threading
from flask_login import LoginManager
from flask_session import Session
from flask_migrate import Migrate
from dotenv import load_dotenv
from flask import request
import os

app = Flask(__name__)
load_dotenv()
bcrypt = Bcrypt(app)  # Initialize Bcrypt with the app
CORS(app, supports_credentials=True, origins=["http://localhost:3000", "http://192.168.0.101:3000", "https://best-by-notification.onrender.com"])
# app.secret_key = secrets.token_hex(32) # 32 bytes = 64-character hex string
app.secret_key = os.getenv('FLASK_SECRET_KEY')

# configuration of mail 
app.config['MAIL_SERVER']=os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL') == 'True'
mail = Mail(app) # instantiate the mail class 


# Config Postgres database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Set this to False to improve performance and avoid seeing unnecessary warnings.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Session and cookie configuration
app.config['SESSION_COOKIE_HTTPONLY'] = os.getenv('SESSION_COOKIE_HTTPONLY') == 'True'
app.config['SESSION_COOKIE_SAMESITE'] = os.getenv('SESSION_COOKIE_SAMESITE')
app.config['SESSION_COOKIE_SECURE'] = os.getenv('SESSION_COOKIE_SECURE') == 'True'
app.config['SESSION_TYPE'] = os.getenv('SESSION_TYPE')
app.config['SESSION_PERMANENT'] = os.getenv('SESSION_PERMANENT') == 'True'
app.config['SESSION_USE_SIGNER'] = os.getenv('SESSION_USE_SIGNER') == 'True'


# Set up PostgreSQL-backed session storage
#app.config['SESSION_SQLALCHEMY'] = db  # Connects Flask-Session to SQLAlchemy (PostgreSQL)
Session(app)

# Global variable to store recipient email
thread_running = False

# Set up the database
init_db(app)

# Initialize LoginManager
login_manager = LoginManager()
login_manager.init_app(app)  # Bind to the app
login_manager.login_view = 'login'
login_manager.login_message = "Unauthorized access. Please log in first."
login_manager.login_message_category = "error"

# Initialize Flask-Migrate
migrate = Migrate(app, db)

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

#Initialize the database
with app.app_context():
  if not os.path.exists('app.db'):  # Only create the database if it doesn't exist
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
          
        elif dayLeft <= 7:
          send_email_notification(user.email, product, f"is expiring in {dayLeft} days.", "Please use it!")
          print(f"Notification: {product.name} is expiring in {dayLeft} days. You better cook with it soon!")
    # threading.Timer(86400, check_expiring_products).start()

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

@app.route('/check-expiry')
def trigger_expiry_check():
  # Validate the cron secret token
  auth_token = request.args.get('token') or request.headers.get('X-Auth-Token')
  if auth_token != os.getenv('CRON_SECRET_TOKEN'):
    return jsonify({'error': 'Unauthorized'}), 401
  # Run in thread to avoid blocking
  thread = threading.Thread(target=check_expiring_products)
  thread.start()
  return jsonify({'message': 'Expiration check initiated'}), 200

# Start the expiration checking thread:
# check_expiring_products()  

@app.route('/')
def hello():
  return "Hello from the Best-By app Backend."

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000)