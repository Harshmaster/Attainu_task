# Setup and Installation

Step-1: Clone the repository at desired location.
`git clone https://github.com/Harshmaster/Attainu_task`

Step-2: Install necessary dependencies.
`npm install`

Step-3: Get the server up and running.
`npm start`

# Authentication

If running on localhost:

1. Send a POST request to `http://localhost:3000/login`.
2. Request body should contain email and password.
   ```
       {
           "email": "harshsinghmarwah@gmail.com",
           "password": "Harsh123",
       }
   ```
3. In response we get the required JWT as a cookie(with key as "token").
4. This cookie is required for future requests to the server.

# Apply JSON Patch

# Create Image Thuumbnail
