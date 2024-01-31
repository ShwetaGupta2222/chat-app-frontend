# Chat Application Full Stack Project

## Deployment
- **Deployed URL:** https://c-h-a-t--a-p-p.web.app/
- **Hosting:**
  - Frontend: Firebase Hosting
  - Backend: Railway Hosting

## Tech Stack
1. **Frontend:**
   - HTML
   - SCSS
   - ReactJs
   - Stomp and Sockjs for WebSocket connection
2. **Backend:**
   - Java
   - Spring Boot
   - WebSocket
3. **Database:**
   - MySQL (Provided On Aiven)

## Features
- **React for UI:** The project leverages React, a popular JavaScript library for building user interfaces, to create a responsive and interactive user experience.
- **User Authentication and Validation:** RESTful APIs handle user authentication and validation. `/login` and `/register` endpoints facilitate secure user registration and login.
- **Real-time Communication:** Stomp and Socket.js enable real-time communication between users for private chats, ensuring a seamless and instant messaging experience.
- **Websocket Endpoint:** A Websocket endpoint is set up for each user based on the receiver ID, allowing real-time communication tailored to a specific user.

## Extra Features
- **User Search:** Implemented a search functionality for users to search for others using a string prefix. Utilized a `Rest API` to fetch users with a specified prefix name.
- **Change Password:** Users can change their passwords through dedicated backend `REST APIs`.
- **Delete Chats:**
  - *Delete All Chats:* Users can clear their entire chat history with a single action.
  - *Delete Selected Chats:* Users have the flexibility to selectively remove specific chats.
- **Dynamic Friends List Order:** The friends list is dynamically ordered based on the latest incoming messages, ensuring the friend with the latest message appears at the top of the list.

## Running Locally
1. **Clone the Backend Repository:**
   - `git clone https://github.com/ShwetaGupta2222/chat-app-backend.git`
   - `cd chat-app-backend`
   - Install all package dependencies using Maven.
   - Run the backend server.

2. **Clone the Frontend Repository:**
   - `git clone https://github.com/ShwetaGupta2222/chat-app-frontend.git`
   - `cd chat-app-frontend`
   - `npm install`
   - `npm start`


3. Open your web browser and navigate to `http://localhost:3000` to access the Chat application locally.

*I hope you like my approach. I tried my best to make this in the given time. :)*
