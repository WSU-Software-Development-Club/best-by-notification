from server import app, mail
from flask_mail import Message
from utils.celery import celery
from celery import shared_task
from datetime import datetime
from models.product import Product
from models.user import User

@celery.task
def check_expiring_products():
  with app.app_context():  # Ensure we are inside an application context
    users = User.query.all()
    today = datetime.today().date()
    
    for user in users:
      if not user.email:
        continue
      
      products = Product.query.filter_by(user_id=user.id).all()
      for product in products:
        day_left = (product.expiration_date - today).days
        
        if day_left <= 0:
            send_email_notification(user.email, product, "expired", "It belongs in the street!!!")
        elif day_left <= 7:
            send_email_notification(user.email, product, "expiring soon", "Please use it!")

def send_email_notification(user_email, product, status, action):
  if user_email:
    subject = f"Product {product.name} is {status}"
    body = f"Dear user,\n\nYour product {product.name} is {status}. \n{action}."
    msg = Message(subject, recipients=[user_email], body=body)
    mail.send(msg)
