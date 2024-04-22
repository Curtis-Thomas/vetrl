## Getting Started

1:

npm install

2:

add env file to backend folder

/backend/.env

3:

Populate backend env to setup local dev environment

.env

MONGODB_URI='\*\*YOUR MONGO DB CONNECTION STRING GOES HERE, IT STARTS WITH: mongodb+srv:// '

port=3001

CLIENT_URL=http://localhost:3000

4:

Add env file to frontend

add .env file in root

5:

Populate frontend env file https://auth0.com/

AUTH0*SECRET='CREATE AUTH0SECRET HERE'

AUTH0_BASE_URL='http://localhost:3000'

AUTH0_ISSUER_BASE_URL='*Add auth0 Url here'

AUTH0_CLIENT_ID='Auth0 client Id here'

AUTH0_CLIENT_SECRET='Auth0_client_secret here'

NEXT_PUBLIC_DOMAIN_URL='http://localhost:3001'

6:

Run backend:

cd backend

nodemon server.js

Run frontend:

npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
