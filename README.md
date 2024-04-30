# vetrl - Veterinary client management systems

<br />

## Funding 

The project currently has the running costs:

Domain name registration - Yearly - $13.99

Server hosting - monthly - $5

If you are enjoying the project and would like to help with the costs, check out the sponsor section.

## Description

<br />

This project has been in my mind for a while, a Vetenarian centric open source, online client management system.

This project aims to eliminate the high financial barrier for entry associated with many client management systems for junior Vetenarians around the world. 

<br />

## Usage instructions:

The live site can be found at:
[vetrl](https://vetrl.com/)

Or the service can be ran localy after adding your own Auth0 and MongoDb credentials.

After registration, the service is usable immediately with the current features:

Overview Page -
- Daily schedule
- Task list

![Overview Picture](https://github.com/Curtis-Thomas/vetrl/raw/main/src/components/landingPage/features/assets/overview%20picture.png)

Appointment Page -
- Client creation
- Patient creation
- Appointment card creation
- Invoice creation with PDF download (work in progress)

Calendar Page -
- Weekly view
- Monthly view

![Calendar Picture](https://github.com/Curtis-Thomas/vetrl/raw/main/src/components/landingPage/features/assets/calendar%20picture.png)

Records page - 
- Appointment record storage

Codex page -
- Drugs list, name, price, description
- Procedures list, name, price, description
- Supplies list, name, price, description
- Client list
- Patient list




<br />

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org)
- **Authentication:** [Auth0](https://auth0.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Styling:** [Material-UI (MUI)](https://mui.com/)
- **Hosting:** [Netlify](https://www.netlify.com/)

## Getting Started - Locally

To get started with vetrl locally, follow these steps:

1. Clone the repository to your local machine:
```
git clone https://github.com/Curtis-Thomas/vetrl.git
```
2. Install dependencies::
```
cd vetrl
npm install
```

3. Set up environment variables:

Create an environment file for the backend:Create a file named .env inside the backend folder:
```
/backend/.env
```
Populate it with the following:
```
MONGODB_URI='YOUR_MONGODB_CONNECTION_STRING'
PORT=3001
CLIENT_URL=http://localhost:3000
```
Create an environment file for the frontend:Create a file named .env in the root of the project:
```
/.env
```
Populate it with the following:
```
AUTH0_SECRET='CREATE_AUTH0_SECRET_HERE'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='ADD_AUTH0_URL_HERE'
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
NEXT_PUBLIC_DOMAIN_URL='http://localhost:3001'
```




4. Run the backend server::
```
cd backend
nodemon server.js
```

5. Run the frontend:
```
npm run dev
```
6. Open http://localhost:3000 in your browser to see the application running locally.

Remember to replace placeholders like YOUR_MONGODB_CONNECTION_STRING, YOUR_AUTH0_CLIENT_ID, and YOUR_AUTH0_CLIENT_SECRET with your actual credentials. Once you've completed these steps, you should have vetrl running locally on your machine, ready for development or testing.
