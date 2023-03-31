// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



// const express = require('express');
// const app = express();
// app.get('/', (require, response) => {
//  response.send("Hello world");
// })
// app.listen(3002, () => {
//  console.log("running on port 3002");
// })



const express = require("express");
const app = express();
const mysql = require("mysql");

var db = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password:'mypassword',
  database:'411demo',
})

app.get('/', (require, response) => {
  const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES ('Spider2', 'good movie');";
  db.query(sqlInsert, (err, result) => {
  response.send("Hello world!!!");
  })
})

app.listen(3002, () => {
  console.log("running on port 3002");
})
