# Ausadhi ghar

## Project Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/hackathon-zed/backend.git

2. Change the directory
```bash
cd backend
```


3. Install the required packages
```bash
yarn install
```

4. Start the development server
```bash
yarn start
```

5. Open the browser and go to `http://localhost:{PORT}/api/v1/` to see the API documentation

6. Open the browser and go to `http://localhost:{PORT}/api/v1/swagger` to see the API documentation in Swagger UI

## ENV Variables

Create a .env file in the root directory and add the following variables

```bash
PORT=3000
SESSION_SECRET=secret
JWT_SECRET=secret
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

#google auth
GOOGLE_CLIENT_ID='GOOGLE_CLIENT_ID'
GOOGLE_CLIENT_SECRET='GOOGLE_CLIENT_SECRET'
GOOGLE_CALLBACK_URL='http://localhost:3000/api/v1/auth/google/callback'




#mongodb connection
MONGO_URI='your mongodb connection string'

```