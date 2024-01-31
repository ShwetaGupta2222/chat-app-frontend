import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { ChatContextProvider } from './context/ChatContext';
import { IndexContextProvider } from './context/IndexContext';
import { DeleteContextProvider } from './context/DeleteContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <IndexContextProvider>
     <ChatContextProvider>
         <DeleteContextProvider>
              <React.StrictMode>
                  <App />
              </React.StrictMode>
         </DeleteContextProvider>
      </ChatContextProvider>
    </IndexContextProvider>
  </AuthContextProvider>
);
