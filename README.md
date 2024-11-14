Nutrition App Tracking - Backend
Overview
This repository hosts the backend code for the Nutrition App Tracking project. Designed to support personal nutrition management, this application provides a robust API that helps users track calories, monitor nutritional intake, and manage dietary goals. The backend is powered by Node.js and Express, with a MySQL database, and includes a comprehensive API documentation generated with Swagger.

Features
Food Management: Add, edit, and delete foods with detailed nutritional information such as calories, protein, carbs, and fat.
Meal Management: Create, update, and manage meals with calculated nutritional totals based on included foods.
Personal Nutrition Tracking: Maintain user profiles with data on age, weight, height, and health conditions; calculate TDEE and other nutrition-related metrics.
User Authentication: Register, login, forgot password, and reset password functionalities.
Tech Stack
Node.js: JavaScript runtime environment.
Express.js: Backend framework.
MySQL: Relational database management system.
Swagger: API documentation and testing interface.
Getting Started
Prerequisites
Node.js v14+ and npm (or yarn)
MySQL server
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/nutrition-app-backend.git
cd nutrition-app-backend
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory with the following configuration:

env
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=nutrition_db
PORT=3000
JWT_SECRET=your_jwt_secret_key
Replace these values with your database credentials and other settings.

Initialize the database:

Import a sample SQL file (if available) or use the database schema provided in the code to create the necessary tables.
Start the server:

bash
Copy code
npm start
The server will start on http://localhost:3000 by default.

API Documentation
Swagger Documentation
Detailed API documentation is accessible via:

http://localhost:3000/api-docs
With Swagger, you can explore and test all available endpoints, including:

Food Management: POST /api/foods, GET /api/foods
Meal Management: POST /api/meals, GET /api/meals
Nutrition Tracking: POST /api/nutrition
Plus various other endpoints for tracking and managing personal nutrition data.
Key API Endpoints
User Registration: POST /api/auth/register
User Login: POST /api/auth/login
Add Food: POST /api/foods
Create Meal: POST /api/meals
Daily Nutrition Log: GET /api/diary
Contributing
We welcome contributions! If you have ideas for improvements, features, or fixes, feel free to open a pull request.

Contact
If you have any questions or need further assistance, please reach out:

Email: your-email@example.com
GitHub: yourusername
This README provides a thorough introduction and guidance for contributors, helping them get started quickly and efficiently.
