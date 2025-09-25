URL Shortener - Full-Stack MERN Application
A full-stack URL shortening web application built with the MERN stack (MongoDB, Express.js, React, Node.js). This service allows users to register, log in, and create shortened, easy-to-share links from long URLs.

🚀 Live Demo
Front-End (Vercel): https://your-frontend-app-name.vercel.app

Back-End API (Render): https://your-api-name.onrender.com

✨ Features
User Authentication: Secure user registration and login system using JSON Web Tokens (JWT).

URL Shortening: Generate a unique, short URL for any valid long URL.

User Dashboard: View, manage, and track all the URLs you've shortened.

Redirection: Short links seamlessly redirect to the original destination URL.

Responsive Design: A clean and modern UI that works on all devices.

🛠️ Tech Stack
Front-End: React, React Router, Axios, Tailwind CSS (or your choice of CSS library)

Back-End: Node.js, Express.js

Database: MongoDB with Mongoose

Authentication: JWT (JSON Web Tokens), bcryptjs for password hashing

Validation: Zod or Yup for schema validation

📁 Project Structure
The project is organized into two main directories:

front-end/: Contains the complete React application.

back-end/: Contains the Node.js/Express server and API logic.

.
├── front-end/              # React UI
│   └── src/
│       ├── assets/
│       ├── modules/
│       ├── hooks/
│       ├── pages/
│       └── ...
└── back-end/               # Node.js API
    └── src/
        ├── api/
        ├── controllers/
        ├── models/
        ├── services/
        └── ...

⚙️ Getting Started
Follow these instructions to set up and run the project on your local machine.

Prerequisites
Node.js (v16 or later recommended)

npm

MongoDB installed locally or a connection URI from MongoDB Atlas.

1. Clone the Repository
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

2. Set Up the Back-End
# Navigate to the back-end directory
cd back-end

# Install dependencies
npm install

# Create a .env file in the back-end root directory
# and add the following variables:

back-end/.env

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=1234

3. Set Up the Front-End
# Navigate to the front-end directory from the root
cd front-end

# Install dependencies
npm install

# Create a .env file in the front-end root directory
# and add the following variable:

front-end/.env

REACT_APP_API_URL=http://localhost:1234

Note: If you are using Vite, the variable should be VITE_API_URL.

4. Run the Application
You'll need two separate terminal windows to run both the front-end and back-end servers simultaneously.

In the first terminal (for the back-end):

cd back-end
node --watch server.js

In the second terminal (for the front-end):

cd front-end
npm start

Your front-end application should now be running at http://localhost:3000 and connected to your back-end API at http://localhost:1234.

🚀 Deployment
This application is designed to be deployed with a split front-end/back-end architecture.

Back-End (API): Deploy as a Web Service on a platform like Render or Railway. Remember to set environment variables for MONGODB_URI and JWT_SECRET.

Front-End (React App): Deploy as a Static Site on a platform like Vercel or Netlify. Set the REACT_APP_API_URL environment variable to your live back-end URL.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.