from datetime import datetime
from db_setup import db
from models.product import Product
from flask import Blueprint, request, jsonify

# Create a Blueprint for products
products_bp = Blueprint('products', __name__)

# TODO: make a route to add a product:
@products_bp.route('/add_product', methods=['POST'])
def add_product():
  data = request.get_json()
  name = data['name']
  # Parse into the date and time object with specific syntax
  expiration_date = datetime.strptime(data['expiration_date'], '%Y-%m-%d')
  # Create a new product with the given data and add it to the database
  new_product = Product(name = name, expiration_date = expiration_date)
  db.session.add(new_product)
  db.session.commit()
  return jsonify({'message': 'Product added successfully'}), 200

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


# Route to fetch a product by name
@products_bp.route('/get_product/<string:name>', methods=['GET'])
def get_product_by_name(name):
    # query only first product from db
    product = Product.query.filter_by(name=name).first()
    if product:
        # product exists
        return jsonify({
            "id" : product.id,
            "name" : product.name,
            "expiration date": product.expiration_date.strftime('%Y-%m-%d')
        }), 200
    else:
        # product == None, does not exist
        return jsonify({'message':"Product not found"}), 404

# Route to fetch a product by ID
@products_bp.route('/get_product/<int:id>', methods=['GET'])
def get_product_by_id(id):
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

# Route to delete a product by ID
@products_bp.route("/delete_product/<int:id>", methods=['GET', 'DELETE'])
def delete_product_by_id(id):
    # query first product to check if it exists
    product = Product.query.get(id)
    if product: # product found
        # mark product for deletion
        db.session.delete(product)
        # commit changes
        db.session.commit()
        return jsonify({'message': f"Product {product.id} deleted."}), 200
    else: # product not found
        return jsonify({'message': f"Product {product.id} not found."}), 404

# Route to update a product's expiration date with its ID
@products_bp.route('/update_product/<int:id>', methods=['PUT'])
def update_product(id):
    # Fetch the product that is targeted for updating
    product = Product.query.get(id)
    if product:  # Run the code inside this if statement if the product exists
        task = request.get_json() # Gets the JSON data from the request, containing the expiration date

        if task.get('expiration_date'):  # If the expiration date exists in the request, then run the following:
            expiration_date = task.get('expiration_date') # Get the expiration date from the request
            
            try:  # Try to convert the expiration date for use
                new_expiration_date = datetime.strptime(task['expiration_date'], '%Y-%m-%d') # Formats the date into YYYY-MM-DD for the new expiration date
            
            except ValueError:  # ValueError indicates the date format is incorrect, and if so, return an error
                return jsonify({'message': f"Invalid date format. Please use YYYY-MM-DD."}), 400 # Returns a 400 Bad Request error

            # As long as no error has been returned...
            product.expiration_date = new_expiration_date # Assign the new expiration date to the product

            # Commit the change to the database
            db.session.commit()

        else:  # Otherwise, run this code if the expiration date is not specified.
            return jsonify({'message': f"Expiration date is required."}), 400 # Returns a 400 Bad Request error

    else:  # Otherwise, run this code if the product does NOT exist.
        return jsonify({'message': f"Product ID {product.id} was not found."}), 404 # Returns a 404 Not Found error

    # As long as everything was successful...
    return jsonify({'message': f"Expiration date for {product.name} (ID {product.id}) has been updated successfully."}), 200 # Returns a 200 OK response