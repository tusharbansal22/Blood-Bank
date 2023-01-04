import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

fetch('https://jsonplaceholder.typicode.com/posts')
  .then((res) => res.json())
  .then((resJson) => {
    const data = JSON.parse(resJson)
  })
