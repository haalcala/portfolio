import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import App from './App'
import { MyContextProvider } from './context/MyContextProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyContextProvider>
      <Router>
        <App />
      </Router>
    </MyContextProvider>
  </React.StrictMode>,
)
