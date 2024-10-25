from datetime import datetime
from db_setup import db
from models.product import Product
from flask import Blueprint, request, jsonify

# Create a Blueprint for products
products_bp = Blueprint('products', __name__)

# TODO: make a route to add a product:

# TODO: Route to fetch all products
@products_bp.route('/get_products', methods = ['GET'])
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
    return jsonify(dict_products), 200


# TODO: Route to fetch a product by name


# TODO: Route to fetch a product by ID
@product_bp.route('/get_product/<int:id>', methods=['GET'])
def get_product(id):
    # Step 2: Retrieve the Product by ID
    product = Product.query.get(id)
    
    # Step 3: Check if the Product Exists
    if product:
        # Step 4: Return the Product Data as JSON
        product_data = {
            'id': product.id,
            'name': product.name,
            'expiration_date': product.expiration_date.strftime('%Y-%m-%d')
        }
        return jsonify(product_data), 200
    else:
        # Step 5: Handle the Case When the Product is Not Found
        return jsonify({'message': 'Product not found'}), 404

# TODO: Route to delete a product by ID
