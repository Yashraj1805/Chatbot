import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ChatbotsProvider } from './context/ChatbotsContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ChatbotsProvider>
          <App />
        </ChatbotsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
