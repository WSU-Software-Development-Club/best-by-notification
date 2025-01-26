# Use the official Python image as a base
FROM python:3.12-slim

# Set environment variables to avoid Python writing .pyc files and enabling unbuffered output
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application into the container
COPY . .

# Expose the application port
EXPOSE 5000

# Run the Flask application
CMD ["python", "server.py"]