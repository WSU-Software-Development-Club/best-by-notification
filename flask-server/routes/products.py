from datetime import datetime
from db_setup import db
from models.product import Product
from models.user import User
from flask import Blueprint, request, jsonify

# Create a Blueprint for products
products_bp = Blueprint('products', __name__)

# Route to add a product for a user
@products_bp.route('/user/<int:user_id>/add_product', methods=['POST'])
def add_product_for_user(user_id):
  data = request.get_json()
  name = data.get('name')
  expiration_date = data.get('expiration_date')
  category = data.get('category')
  
  # Validate inputs
  if not name or not expiration_date or not category:
    return jsonify({'error': 'Name, expiration date, and category are required.'}), 400
  
    # Validate category (can expand this list as needed)
  valid_categories = ['poultry', 'seafood', 'dairy', 'fruits', 'vegetables', 'grains', 'snacks', 'beverages', 'frozen', 'other']
  if category not in valid_categories:
    return jsonify({'error': 'Invalid category. Please select a valid category. Yours:' + category}), 400
  
  user = User.query.get(user_id)
  
  # If user not found
  if not user:
    return jsonify({'error': f'User with id {user_id} not found'}), 404
  
  # Else
  try:
    expiration_date = datetime.strptime(expiration_date, '%Y-%m-%d')
  except ValueError:
    return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
  
  # Add product for user:
  new_product = Product(name=name, category=category, expiration_date=expiration_date, user_id=user_id)
  db.session.add(new_product)
  db.session.commit()
  
  # check_single_product_expiration(user, new_product) # This function is not defined here
  
  return jsonify({'message': f'Product {name} added for user {user.email}'}), 201

# Route to get all products for a user
@products_bp.route('/user/<int:user_id>/get_products', methods = ['GET'])
def get_user_product(user_id):
  user = User.query.get(user_id)
  if not user:
    return jsonify({'error': 'User with id {user_id} not found.'}), 404
  
  products = Product.query.filter_by(user_id=user_id).all()
  return jsonify([{
    'id': product.id,
    'name': product.name,
    'category': product.category,
    'expiration date': product.expiration_date
  } for product in products]), 200  

# Route to add a product:
@products_bp.route('/add_product', methods=['POST'])
def add_product():
  data = request.get_json()
  name = data['name']
  # Parse into the date and time object with specific syntax
  expiration_date = datetime.strptime(data['expiration_date'], '%Y-%m-%d')
  user_id = data['user_id']
  category = data['category']
  # Create a new product with the given data and add it to the database
  new_product = Product(name = name, category=category, expiration_date = expiration_date, user_id = user_id)
  db.session.add(new_product)
  db.session.commit()
  return jsonify({'message': 'Product added successfully'}), 200

# Route to fetch all products
@products_bp.route('/get_products', methods=['GET'])
def get_products():
  products = Product.query.all()
  return jsonify([{
    'id': product.id,
    'name': product.name, 
    'category': product.category,
    'expiration date': product.expiration_date.strftime('%Y-%m-%d')} for product in products
  ]), 200

# Route to fetch a product by name
@products_bp.route('/get_product/<string:name>', methods=['GET'])
def get_product_by_name(name):
  product = Product.query.filter_by(name = name).first()
  if product:
    return jsonify({
      'id': product.id,
      'name': product.name,
      'category': product.category,
      'expiration date': product.expiration_date.strftime('%Y-%m-%d')
    }), 200
  else: 
    return jsonify({'message': f'Product {name} not found'}), 404
  
# Route to fetch a product by id
@products_bp.route('/get_product/<int:id>', methods=['GET'])
def get_product_by_id(id):
  # Fetch the product by its id
  product = Product.query.get(id)
  
  # Check if the product exists
  if product:
    return jsonify({
      'id': product.id,
      'name': product.name,
      'category': product.category,
      'expiration date': product.expiration_date.strftime('%Y-%m-%d')
    }), 200
  else: 
    return jsonify({'message': f'Product with id {id} not found'}), 404

# Route to delete a product by id
@products_bp.route('/delete_product/<int:id>', methods=['DELETE'])
def delete_product_by_id(id):
  # Fetch the product by its id
  product = Product.query.get(id)
  
  # Check if the product exists
  if product:
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': f'Product {product.name} with id {id} has been deleted successfully.'}), 200
  else:
    return jsonify({'message': f'Product with id {id} not found.'}), 404
  
# Route to update a product's expiration date by id
@products_bp.route('/update_product/<int:id>', methods=['PUT'])
def update_product(id):
  # Get the product by its id
  product = Product.query.get(id)
  
  # Check if the product exists
  if not product:
    return jsonify({'message': f'Product with id {id} not found'}), 404
  # Get the new expiration date from the request data
  data = request.get_json()
  if 'expiration_date' not in data:
    return jsonify({'message': 'Expiration date is required' }), 400
  try:
    # Parse the new expiration date
    new_expiration_date = datetime.strptime(data['expiration_date'], '%Y-%m-%d')
  except ValueError:
    return jsonify({'message': 'Invalid date format. Use YYYY-MM-DD'}), 400
  # Update the product's expiration date
  product.expiration_date = new_expiration_date
  db.session.commit()
  return jsonify({'message': f'Expiration date for product {product.name} with id {product.id} has been updated successfully'}), 200