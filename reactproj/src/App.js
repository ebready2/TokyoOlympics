// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  return (
  <div className="App">
    <h1> CRUD APPLICATIONS</h1>

    <div className="form">
      <label> Movie Name:</label>
      <input type="text" name="movieName" />
      <label> Review:</label>
      <input type="text" name="Review" />

      <button> Submit</button>
    </div>

  </div>
  );
}

export default App;