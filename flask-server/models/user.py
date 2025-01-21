from db_setup import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'user'
  
  id = db.Column(db.Integer, primary_key = True, autoincrement=True)
  email = db.Column(db.String(150), unique=True, nullable=False) # User's email
  password_hash = db.Column(db.String(256), nullable=False)  # Store hashed password
  active = db.Column(db.Boolean, default=True, nullable=False)  # Active status
  # products = db.relationship('Product', backref='user', lazy=True) # Relationship with Product
  
  # Relationships
  products = db.relationship('Product', back_populates='user', lazy=True)  # Bidirectional relationship
  
  # Optional reset code
  reset_code = db.Column(db.String(6), nullable=True)
  reset_code_expiry = db.Column(db.DateTime, nullable=True)
  
  def set_password(self, password):
    """Hashes and sets the password."""
    from server import bcrypt  # Import here to avoid circular dependency
    self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
  
  def check_password(self, password):
    """Checks if the password matches the stored hash."""
    from server import bcrypt  # Import here to avoid circular dependency
    return bcrypt.check_password_hash(self.password_hash, password)
  
  @property
  def is_active(self):
    return self.active  # Flask-Login checks this to see if the user is active

  # def get_id(self):
  #   return str(self.id)  # Flask-Login requires a method to return the user ID
  
  def __init__(self, email, password, active=True):
    self.email = email
    self.set_password(password)
    self.active = active  # Add an active flag for the user
  