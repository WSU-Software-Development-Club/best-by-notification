from datetime import datetime
from db_setup import db
from product import Product
from flask import Blueprint, request, jsonify

# Create a Blueprint for products
products_bp = Blueprint('products', __name__)

# TODO: make a route to add a product:


# TODO: Route to fetch all products
@products_bp.route('/get_product', methods = ['GET'])
def get_products():
    products = Product.query.all()
    all_products = [x for x in products]
    dict_products = []
    for cur_product in all_products:
        dict = {
            "id" : cur_product.id,
            "name" : cur_product.name,
            "expiration date": cur_product.expiration_date.strftime('%Y-%m-%d')
        }
        dict_products.append(dict)
    return jsonify(dict_products, status=200)


# TODO: Route to fetch a product by name


# TODO: Route to fetch a product by ID


# TODO: Route to delete a product by ID
