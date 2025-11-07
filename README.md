🛒 Mock E-Commerce Cart

This project is a simple full-stack e-commerce shopping cart web application. Users can browse products, add items to their cart, update quantities, and proceed to checkout by providing their name and email. Orders are then saved to MongoDB for persistence. The frontend communicates with a Node.js and Express backend, which integrates with MongoDB Atlas for data storage and uses the Fake Store API to load product data.

🚀 Features

The app includes the following key features:

Displays products fetched from the Fake Store API.

Allows adding, removing, and updating quantities of items in the cart.

Provides a checkout form with name and email validation.

Saves order details (mock user data, cart items, and total) to MongoDB.

Shows a mock receipt after successful checkout.

Includes UI feedback such as color change when an item is added to the cart.

Clean and responsive design with clear user flow.

🧠 Tech Stack

Frontend: React, Context API, Axios, CSS modules
Backend: Node.js, Express.js, MongoDB (via Mongoose), dotenv, body-parser, CORS

⚙️ Setup Instructions
Step 1: Clone the repository

Clone the project into your local system using Git.

Step 2: Backend setup

Navigate to the backend folder and install dependencies using npm install.
Create a .env file inside the backend folder containing your MongoDB connection string and preferred port number. Example:
MONGO_URI = mongodb+srv://your_username:your_password@cluster0.mongodb.net/?appName=Cluster0
PORT = 5000

After that, run the backend using node index.js. If configured properly, it should connect to MongoDB and display a “Server running on port 5000” message.

Step 3: Frontend setup

Go to the frontend directory and run npm install to install required dependencies.
Start the React app using npm start (or npm run dev if using Vite).
Ensure the frontend runs on a different port (usually 3000 or 5173).

🧾 Functionality Flow

The frontend fetches product data from the Fake Store API.

When a user adds a product to the cart, the “Add to Cart” button changes color to indicate success.

The cart view allows updating quantities and removing items.

On checkout, user details (name and email) and cart data are sent to the backend.

The backend validates input and saves the order to MongoDB.

A mock receipt is displayed to the user with total, name, email, and timestamp.

🖼️ Screenshots

![Product Screenshot](./Screenshots/productlisting.png)

![Cart Screenshot](./Screenshots/cart.png)

![Receipt Screenshot](./Screenshots/mocktrceipt.png)



🎥 Demo
https://youtu.be/_bBaOX8mlaY
