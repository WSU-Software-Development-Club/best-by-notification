from db_setup import db

#product class
class Product(db.Model):
    __tablename__ = 'products'
    
    #class variables
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    expiration_date = db.Column(db.Date, nullable=False)
    
    #class init
    def __init__(self, name, expiration_date):
        self.name = name
        self.expiration_date = expiration_date

    #class repr
    def __repr__(self):
        return f'<Product {self.name}>'

