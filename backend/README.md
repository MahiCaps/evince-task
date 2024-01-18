
# Evince task

Build REST API Server enable its user to add new Employee and user can also perform edit and 
delete operation on employee. This API can be used anonymously by any user.

## Node Version 
  
  Use Node version 18 or more

## Available Scripts

In the project directory, you can run:

### `npm run start:dev`

Runs the app in the development mode on define port in the .env file but yes please use 5005 port because using this port calling api from frontend

### `npm run build`

Builds the app for production to the `build` folder.\

### for env variables you can take reference from the env.example file or you can directly add below variabls.

NODE_ENV="development"
PORT=5005
DB_CLIENT=3306
HOST=localhost
DB_NAME=evince-employee
DB_HOST=localhost
DB_USER=root

### Api route 

  /api/employee