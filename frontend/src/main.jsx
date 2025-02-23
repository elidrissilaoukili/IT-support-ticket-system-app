// src/main.jsx or src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // This imports Tailwind's CSS
import { ToastContainer } from "react-toastify";
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>
)
