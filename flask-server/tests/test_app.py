import unittest
from datetime import datetime
from flask_testing import TestCase
import sys
import os
# Add the project root (flask-server) to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from server import app, db
from models.product import Product

# Install the Ctr-C handler to exit the test running
unittest.installHandler()

class ProductTestCase(TestCase):
  def create_app(self):
    # Set up the Flask test app and use a different database for testing.
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_products.db'
    app.config['TESTING'] = True
    app.config['DEBUG'] = False
    return app
  
  def setUp(self):
    # This runs before each test. It creates a new database for testing.
    db.create_all()
    # Adding sample data for testing
    sample_product = Product(name='Sample', expiration_date=datetime(2024, 10, 25))
    db.session.add(sample_product)
    db.session.commit()
    
  def tearDown(self):
    # This runs after each test. It removes the test database.
    db.session.remove()
    db.drop_all()
  
    # Test for adding a product
  def test_add_product(self):
    response = self.client.post('/add_product', json={
        'name': 'Milk',
        'expiration_date': '2024-12-01'
    })
    self.assertEqual(response.status_code, 200)
    self.assertIn('Product added successfully', response.json['message'])

    # Test for getting a product by id
  def test_get_product_by_id(self):
    product = Product.query.filter_by(name="Sample").first()
    response = self.client.get(f'/get_product/{product.id}')

    # Check result
    self.assertEqual(response.status_code, 200)
    self.assertIn(product.name, response.json['name'])
    self.assertIn(product.expiration_date.strftime('%Y-%m-%d'), response.json['expiration_date'])

    # Test for deleting a product
  def test_delete_product_by_id(self):
    # Retrieve product from db
    product = Product.query.filter_by(name='Sample').first() # Product "Sample" initialized in setUp()

    # Test for deletion on existing item
    response = self.client.delete(f'/delete_product/{product.id}')
    self.assertEqual(response.status_code, 200)
    self.assertIn(f'Product {product.name} with id {product.id} has been deleted successfully', response.json['message'])

    # Test for deletion on non-existent item
    response = self.client.delete(f'/delete_product/{product.id}') # Uses same id as "Sample"
    self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
  unittest.main()