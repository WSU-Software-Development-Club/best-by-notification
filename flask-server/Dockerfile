# Use the official Python image as a base
FROM python:3.10-slim

# Set environment variables to avoid Python writing .pyc files and enabling unbuffered output
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .