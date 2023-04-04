# my-node-app
User Signup and login using MERN

This is a MERN web application that allows users to create an account and Login to their account using login credentials
also user can create a Table and do CRUD operations on the same

Installation and Setup :

Clone the repository: git clone https://github.com/PratsN/my-node-app.git
Run the development server: 
Backend Server
1. cd to nodeserver
2. make changes in package.json in nodeserver as follows =>  In script start change "node index.js" to "nodemon index.js"
3. Do npm install and then npm start
4. This will start backend server

Frontend Server
1.cd to reactclient
2.Do npm install and then npm start
3.This will start frontend server

Steps to Follow :

Navigate to http://localhost:300 to see the webpage.
O landing page you can see 2 buttons at header to login or signup, If you don't have an account then you can signup and then login
If you are already having an account then you can directly login using the credentials
If you forget your password then you can reset password using the option "forget password" at login page
Once you Login to your account then you will be redirected to dashbaord where table is displayed with information of users
You can create a new user using "Add User" button
You can also edit the Information of user using Edit Icon also you can delete user
You can serach user based on name, city and occupation
You can logout from your account using "Logout" button
Once you Logout you will be redirected to landing page

Point to Note:
1. Most of the validations are handle at backend
2. Only Input field related validations are handled at frontend

