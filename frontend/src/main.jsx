import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { GETProvider } from './context/Get_context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GETProvider>
    <App />
    </GETProvider>
  </React.StrictMode>,
)
