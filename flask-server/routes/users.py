from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, LoginManager, current_user
from models.user import User
from db_setup import db
from models.product import Product
import random
import string
from datetime import datetime, timedelta

users_bp = Blueprint('users', __name__)

@users_bp.route('/signup', methods=['POST'])
def signup():
  """Route for user signup"""
  data = request.get_json()
  email = data.get('email')
  password = data.get('password')
  
  # Input validation
  if not email or not password:
    return jsonify({'error': 'Email and password are required'}), 400
  if len(password) <6:
    return jsonify({'error': 'Password must be at least 6 characters long'}), 400
  
  # Check if user already exists
  if User.query.filter_by(email=email).first():
    return jsonify({'error': 'Email already in use'}), 400
  
  # Create new user
  new_user = User(email=email, password=password)
  db.session.add(new_user)
  db.session.commit()
  
  # Log the new user in after signing up
  # login_user(new_user)
  
  return jsonify({'message': f'User with email {email} created successfully'}), 201

@users_bp.route('/delete_user', methods=['DELETE'])
def delete_user():
  """Route to delete a user"""
  email = request.args.get('email') # Get email from query parameter
  user = User.query.filter_by(email=email).first()
  
  # Input validation
  if not email:
    return jsonify({'error': 'Email is required'}), 400
  
  # Check if user exists
  user = User.query.filter_by(email=email).first()
  if not user:
    return jsonify({'error': f'User with email {email} not found'}), 404
  
  # Delete all products linked to this user
  Product.query.filter_by(user_id=user.id).delete()
  
  # Delete user
  db.session.delete(user)
  db.session.commit()
  
  return jsonify({'message': f'User with email {email} deleted successfully'}), 200

@users_bp.route('/login', methods=['POST'])
def login():
  """Route for user login"""
  data = request.get_json()
  email = data.get('email')
  password = data.get('password')
  
  user = User.query.filter_by(email=email).first()
  if user and user.check_password(password):
    login_user(user)
    return jsonify({
      'message': 'Login successful',
      'user': {
          'id': user.id,
          'email': user.email
      }
    }), 200
  else:
    return jsonify({'error': 'Invalid email or password'}), 401
  
@users_bp.route('/current_user', methods=['GET'])
@login_required
def get_current_user():
  """Fetch the currently logged-in user's details"""
  return jsonify({
    'id': current_user.id,
    'email': current_user.email
  })
  
@users_bp.route('/logout', methods=['POST'])
@login_required
def logout():
  print("Logout route accessed")  # Add this log
  logout_user()
  response = jsonify({'message': 'Logged out successfully'})
  response.headers['Cache-Control'] = 'no-store'
  response.set_cookie('session', '', expires=0)  # Clear session cookie
  return response

@users_bp.route('/protected', methods=['GET'])
@login_required
def protected_route():
  return jsonify({'message': 'This is a protected route accessible only to authenticated users.'})

#Forgot Password
#generate random code
def generate_reset_code(length = 6):
  return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

@users_bp.route('/forgot_password', methods=['POST'])
def forgot_password():
  """Route for password reset"""
  data = request.get_json()
  email = data.get('email')
  
  # Input validation
  if not email:
    return jsonify({'error': 'Email is required'}), 400
  
  user = User.query.filter_by(email=email).first()
  if not user:
    return jsonify({'error': f'User with email {email} not found'}), 404
  
  reset_code = generate_reset_code()
  user.reset_code = reset_code
  user.reset_code_expiry = timedelta(minutes=15)  # Set expiry time for reset code
  db.session.commit()

# Send email with reset code
  try:
    msg = Message('Password Reset Code', recipients=[email])
    msg.body = f"Your password reset code is {reset_code}."
    mail.send(msg)
    return jsonify({'message': 'Reset code sent successfully'}), 200
  except Exception as e:
    return jsonify({'error': 'Failed to send email'}), 500

# Verify the code
@users_bp.route('/verify_reset_code', methods=['POST'])
def verify_reset_code():
  data = request.get_json()
  email = data.get('email')
  reset_code = data.get('reset_code')
  
  # Input validation
  if not email or not reset_code:
    return jsonify({'error': 'Email and reset code are required'}), 400
  
  user = User.query.filter_by(email=email).first()
  if not user:
    return jsonify({'error': f'User with email {email} not found'}), 404
  
  if user.reset_code == reset_code and user.reset_code_expiry < datetime.now():
    return jsonify({'message': 'Reset code verified successfully'}), 200
  else:
    return jsonify({'error': 'Invalid reset code'}), 401

# Reset new password 
@users_bp.route('/reset_password', methods=['POST'])
def reset_password():
  data = request.get_json()
  email = data.get('email')
  reset_code = data.get('reset_code')
  new_password = data.get('new_password')
  
  # Input validation
  if not email or not reset_code or not new_password:
    return jsonify({'error': 'Email, reset code, and new password are required'}), 400
  
  user = User.query.filter_by(email=email).first()
  if not user:
    return jsonify({'error': f'User with email {email} not found'}), 404
  
  if user.reset_code == reset_code and user.reset_code_expiry < datetime.now():
    user.password = new_password
    user.reset_code = None
    user.reset_code_expiry = None
    db.session.commit()
    return jsonify({'message': 'Password reset successfully'}), 200
  else:
    return jsonify({'error': 'Invalid reset code'}), 401
