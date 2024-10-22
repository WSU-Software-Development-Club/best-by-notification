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
    new_product = Product(name, expiration_date)
    db.session.add(new_product)
    db.session.commit()
    return jsonify({
        'message': 'Product added successfully',
        'product': {
            'id': new_product.id,
            'name': new_product.name,
            'expiration_date': new_product.expiration_date
        }
        }), 200

# TODO: Route to fetch all products


# TODO: Route to fetch a product by name
def fetch_product_by_name(name):
    product = Product.query.filter_by(name=name).first()
    if product:
        product_data = {
            'id': product.id,
            'name': product.name
            'expiration_date': product.expiration_date.strptime('%Y-%m-%d')
        }
        return jsonify(product_data), 200

    else:
        return jsonify({'error': 'Product not Found'}), 404

# TODO: Route to fetch a product by ID
def fetch_product_by_id(id):
    product = Product.query.filter_by(id=id).first()
    if product:
        product_data = {
            'id': product.id,
            'name': product.name,
            'expiration_date': product.expiration_date.strptime('%Y-%m-%d')
        }
        return jsonify(product_data), 200
    else:
        retrun jsonify({'error': 'Product not Found'}), 404

# TODO: Route to delete a product by ID
def delete_product_by_id(id):
    product = Product.query.get(id)
    if product:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Product Deleted Successfully'}), 200
    else:
        return jsonify({'error': 'Product not Found'}), 404

