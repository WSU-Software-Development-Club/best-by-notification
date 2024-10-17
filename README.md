# Best By Notification

This repository is for the **Best By Notification** app, developed by the WSU Software Development Club. The app helps users manage their food items by notifying them 2 days before their products expire. It allows users to scan food items and store expiration dates, making food management easier and more efficient.

## Set up for the environments

### 1. Install Node.js for the frontend

Download Node.js here: https://nodejs.org/en

### 2. Set up npm 

In the project directory terminal:

```bash
cd client
npm install
```

### 3. Install Python

Check if you have Python: 

In the project directory terminal:

```bash
python --version
```
To install Python:

Directly install Python from the website: https://www.python.org/downloads/

### 4. Install Flask:

```bash
pip install Flask
```

### 5. Install Flask Library:

In our project directory:

```bash
cd flask-server
```

#### Install Flask_SQLAlchemy

```bash
pip install -U Flask-SQLAlchemy
```

#### Install Flask_CORS

```bash
pip install -U flask-cors
```
## How to run the Project

### To run the Frontend

In your project directory terminal (best-by-notification):

```bash
cd client
npm run start
```

### To run the Backend

If you are in the /client directory, do this command to go back one file level:

```bash
cd ..
```

In your project directory terminal (best-by-notification):

```bash
python server.py
```

## How to Contribute

### 1. Checkout a Branch

Before starting any work, ensure you're working on one of your own branches or a branch that you've been assigned to. To switch to a branch, run the following command in your terminal:

```bash
git checkout <branch-name>
```

If the branch doesn’t exist yet, create it:

```bash
git checkout -b <branch-name>
```
### 2. Make Changes (basically coding)
Implement your changes, bug fixes, or updates within the checked-out branch. Be sure to follow coding standards and project guidelines when contributing.

### 3. Commit Your Changes
After making changes, you need to stage and commit them. Make sure to use a meaningful and descriptive commit message to clearly explain what changes were made.

```bash
git add .
git commit -m "Your descriptive commit message"
```
### 4. Push the Branch to Origin
Once you're satisfied with your changes, push the branch to the remote repository on GitHub:

```bash
git push origin <branch-name>
```

### 5. Create a Pull Request (PR)
Go to the Best By Notification GitHub repository and create a pull request (PR) from your branch to the appropriate base branch (usually main).

1. Go to the Pull Requests tab.
2. Click on New Pull Request.
3. Choose your branch and the branch you want to merge into (e.g., main).
4. Add a description of the changes (along with images would be great) you made and submit the PR.
   
Once your pull request has been reviewed and approved by the maintainers, it will be merged into the main codebase.
