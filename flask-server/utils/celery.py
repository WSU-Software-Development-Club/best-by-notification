from celery import Celery
from flask import Flask
from celery.schedules import crontab

def make_celery(app: Flask) -> Celery:
    # Set the broker (you may need to change this based on your setup)
    celery = Celery(
        app.import_name,
        backend=app.config['CELERY_RESULT_BACKEND'],
        broker=app.config['CELERY_BROKER_URL']
    )
    celery.conf.update(app.config)
    return celery

# Example Flask app initialization
app = Flask(__name__)
app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379/0',
    CELERY_RESULT_BACKEND='redis://localhost:6379/0'
)

celery = make_celery(app)

# Celery Beat schedule
celery.conf.beat_schedule = {
    'check-expiring-products-daily': {
        'task': 'utils.tasks.check_expiring_products',
        'schedule': crontab(minute='*'),   # Runs daily at midnight
    },
}

