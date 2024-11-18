from flask import Flask, request, jsonify
from flask_cors import CORS
from db_setup import db
from routes.products import products_bp
from models.product import Product
from datetime import datetime, timedelta
import threading

app = Flask(__name__)
CORS(app) # Allows cross-origin requests from React frontend

# Config SQLite database

# Tells Flask-SQLAlchemy to use an SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
# Set this to False to improve performance and avoid seeing unnecessary warnings.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Set up the database
db.init_app(app)

# Register blueprints
app.register_blueprint(products_bp)


# Initialize the database
with app.app_context():
    db.create_all()

# Members API route
@app.route("/members")

def members():
  return {"members": ["Member1", "Member2", "Member3"]}

#Notifies the console when prodcuts expire
def check_expiring_products():
    with app.app_context():
        products = Product.query.all()
        today = datetime.today().date()
        for product in products:
            daysLeft = (product.expiration_date - today).days
            if daysLeft <= 0:
                print(f"Notification: {product.name} is expired. It belongs in the street.")
            elif daysLeft <= 2:
                print(f"Notification: {product.name} will expire soon. Cook with it.")
            elif daysLeft <= 7:
                print(f"Notification: {product.name} expires in less than a week. You might want to defrost it.")
    threading.Timer(86400, check_expiring_products).start()
  
check_expiring_products()

if __name__ == "__main__":
  app.run(debug=True)

