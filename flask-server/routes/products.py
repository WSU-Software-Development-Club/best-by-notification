from datetime import datetime
from db_setup import db
from product import Product
from flask import Blueprint, request, jsonify

# Create a Blueprint for products
products_bp = Blueprint('products', __name__)
@product_bp.route('/add_product', methods = ['POST']):
# TODO: make a route to add a product:
def add_product():
    data = request.get_json()
    name = data.get('name')
    expiration_date = datetime.strptime(data.geet('expiration_date'), '%Y-%m-%d')
    new_product = product.new_product


# TODO: Route to fetch all products


# TODO: Route to fetch a product by name


# TODO: Route to fetch a product by ID


# TODO: Route to delete a product by ID
