# Chat Application full stack Project

## Deployment
`Deployed URL`- https://c-h-a-t--a-p-p.web.app/
-Used railway(for backend) hosting and firebase(for frontend) hosting

## Tech Stack
1- Frontend - HTML, SCSS , ReactJs , (stomp and sockjs for websocket connection)
2- Backend - Java, Springboot, webSocket

## Features

- **React for UI:** The project leverages React, a popular JavaScript library for building user interfaces, to create a responsive and interactive user experience.

- **User Authentication and Validation:** RESTful APIs are implemented to handle user authentication and validation. The project includes `/login` and `/register` endpoints to facilitate user registration and login securely.

- **Real-time Communication:** Stomp and Socket.js are employed to enable real-time communication between two users for private chats. This ensures a seamless and instant messaging experience.

- **Websocket Endpoint:** A Websocket endpoint is set up for each user based on receiver ID. This allows for real-time communication tailored to a specific user.


## Extra Features

- **User Search:** A search functionality is implemented, allowing users to search for others by typing a string as a prefix. This feature enhances user interaction and connectivity. Used `Rest API` for getting all the users with a special prefix name.  

- **Change Password:** Users have the ability to change their passwords through a dedicated feature. Backend `REST APIs` are implemented to support the change password functionality.


## Running Locally

1. **Clone the Frontend Repository:**
   git clone https://github.com/ShwetaGupta2222/chat-app-frontend.git
   cd chat-app-frontend
   npm install
   npm start

2. **Clone the Backend Repository:**
   git clone https://github.com/ShwetaGupta2222/chat-app-backend.git
   cd chat-app-backend
   install all package dependencies using maven
   run the backend server
   
3.  Open your web browser and navigate to `http://localhost:3000` to access the Chat application locally.


*I hope you like my approach. I tried my best to make this in the given time. :)*
