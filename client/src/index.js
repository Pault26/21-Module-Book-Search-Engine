import React from 'react'; // Import React
import ReactDOM from 'react-dom'; // Import ReactDOM
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css'; // Import custom CSS
import App from './App'; // Import the main App component

// Render the App component inside the root element of the HTML document
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
