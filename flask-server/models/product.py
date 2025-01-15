from db_setup import db

# Define Product model
class Product(db.Model):
  __tablename__ = 'product'
  
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  expiration_date = db.Column(db.Date, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
  category = db.Column(db.String(50), nullable=False)  # Add category field
  
  user = db.relationship('User', back_populates='products')
  
  def __init__(self, name, category, expiration_date, user_id):
    self.name = name
    self.expiration_date = expiration_date
    self.user_id = user_id
    self.category = category