# Backend-side of interexy test task

Deploy you can find [here](https://vladislav-metik-interexy.herokuapp.com). 

## Routes

### POST /api/user/create - Email and password in body. Returns user.
### POST /api/user/login - Email and password in body. Returns user.
### POST /api/user/change - UserId, email, password, bio in body. Rewrite user info and returns user with new info.
### GET /api/user/:userId - User id as path parameter. Returns user object.

## For running locally

### In the project directory, run for dependencies install:
#### `npm install` or `yarn install`

### And this is for running the project:
#### `npm start` or `yarn start`

### You can also find frontend repository [here](https://github.com/destolyar/interexy-test-task)

### Thanks for your attention!
