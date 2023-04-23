import './App.css';
import MySideNav from './components/MySideNav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Search from './pages/search';
import Insert from './pages/insert';
import Delete from './pages/delete';
import Update from './pages/update';
import AQ1 from './pages/aq1';
import AQ2 from './pages/aq2';

function App() {
  return  (
    <Router>
      <MySideNav/>
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/insert' element={<Insert/>} />
        <Route path='/delete' element={<Delete/>} />
        <Route path='/update' element={<Update/>} />
        <Route path='/aq1' element={<AQ1/>} />
        <Route path='/aq2' element={<AQ2/>} />
      </Routes>
    </Router>
  );
}

export default App;

// import './App.css';
// import React, {useState, useEffect} from "react";
// import Axios from 'axios';

// function App() {
//   // inputs
//   const [responseData, setResponseData] = useState('');
//   const [myQuery, setMyQuery] = useState('');

//   const [NOCName, setNOCName] = useState('');
//   const [ranking, setRanking] = useState('');
//   const [weightedRanking, setWeightedRanking] = useState('');
//   const [goldMedalCount, setGoldMedalCount] = useState('');
//   const [silverMedalCount, setSilverMedalCount] = useState('');
//   const [bronzeMedalCount, setBronzeMedalCount] = useState('');
//   const [totalMedalCount, setTotalMedalCount] = useState('');

//   const [deleteTable, setDeleteTable] = useState('');
//   const [deleteAttribute, setDeleteAttribute] = useState('');
//   const [deleteValue, setDeleteValue] = useState('');

//   const [updateTable, setUpdateTable] = useState('');
//   const [updateSetAttribute, setUpdateSetAttribute] = useState('');
//   const [updateSetValue, setUpdateSetValue] = useState('');
//   const [updateAttribute, setUpdateAttribute] = useState('');
//   const [updateValue, setUpdateValue] = useState('');

  // const [searchTable, setSearchTable] = useState('');
  // const [searchAttribute, setSearchAttribute] = useState('');
  // const [searchKeyword, setSearchKeyword] = useState('');

//   // requests
//   const submitInsert = () => {
//     Axios.post('http://localhost:3002/api/insert', {
//       NOCName: NOCName,
//       ranking: ranking,
//       weightedRanking: weightedRanking,
//       goldMedalCount: goldMedalCount,
//       silverMedalCount: silverMedalCount,
//       bronzeMedalCount: bronzeMedalCount,
//       totalMedalCount: totalMedalCount
//     }).then((response) => {
//       // display the inputted record and ones with similar NOCNames
//       setMyQuery(`SELECT * FROM NOC WHERE NOCName LIKE '%${NOCName}%';`);
//       console.log(response);
//     }).catch((error) => {
//       console.log('Insert error');
//       console.log(error);
//     })
//   };

//   const submitUpdate = () => {
//     Axios.post('http://localhost:3002/api/update', {
//       updateTable: updateTable,
//       updateSetAttribute: updateSetAttribute,
//       updateSetValue: updateSetValue,
//       updateAttribute: updateAttribute,
//       updateValue: updateValue
//     }).then((response) => {
//       // display updated record and ones with a similar updateValue
//       // can't change primary key, only other attributes
//       setMyQuery(`SELECT * FROM ${updateTable} WHERE ${updateAttribute} LIKE '%${updateValue}%';`);
//       console.log(response);
//     }).catch((error) => {
//       console.log('Update error');
//       console.log(error);
//     })
//   }

  // const submitSearch = () => {
  //   Axios.get('http://localhost:3002/api/search', {
  //     params: {
  //       searchTable: searchTable,
  //       searchAttribute: searchAttribute,
  //       searchKeyword: searchKeyword
  //     }
  //   }).then((response) => {
  //     setResponseData(response.data);
  //     console.log(response);
  //   }).catch((error) => {
  //     console.log('Search error');
  //     console.log(error);
  //   })
  // };

  // const submitDisplay = () => {
  //   Axios.get('http://localhost:3002/api/display', {
  //     params: {
  //       myQuery: myQuery
  //     }
  //   }).then((response) => {
  //     setResponseData(response.data);
  //     console.log(response);
  //     showResponse("output");
  //   }).catch((error) => {
  //     console.log('Display error');
  //     console.log(error);
  //   })
  // };

//   const submitQuery1 = () => {
//     Axios.get('http://localhost:3002/api/query1')
//     .then((response) => {
//       setResponseData(response.data);
//       console.log(response);
//       showResponse("output");
//     }).catch((error) => {
//       console.log('Query 1 error');
//       console.log(error);
//     })
//   }

  // const submitQuery2 = () => {
  //   Axios.get('http://localhost:3002/api/query2')
  //   .then((response) => {
  //     setResponseData(response.data);
  //     console.log(response);
  //     showResponse("output");
  //   }).catch((error) => {
  //     console.log('Query 2 error');
  //     console.log(error);
  //   })
  // }

//   const showResponse = (output) => {
//     // pretty print in response box
//     document.getElementsByName(output)[0].value = JSON.stringify(responseData, null, 2);
//   }

//   return (
//     <div className="App">
//       <div className="stage4">
//         <h1 className="whatif">What-If Olympics</h1>
//       </div>
//       <div>
//         <div className="content">
//           <h2> Insert</h2>
//           <table className="contentTable">
//             <div className="form">
//               <tr>
//                 <td><label> NOCName:</label></td>
//                 <td><input type="text" name="NOCName" onChange={(e) => {
//                   setNOCName(e.target.value)
//                 } }/></td>
//               </tr>

//               <tr>
//                 <td><label> ranking:</label></td>
//                 <td><input type="text" name="ranking" onChange={(e) => {
//                   setRanking(e.target.value)
//                 }}/></td>
//               </tr>

//               <tr>
//                 <td><label> weightedRanking:</label></td>
//                 <td><input type="text" name="weightedRanking" onChange={(e) => {
//                   setWeightedRanking(e.target.value)
//                 }}/></td>
//               </tr>

//               <tr>
//                 <td><label> goldMedalCount:</label></td>
//                 <td><input type="text" name="goldMedalCount" onChange={(e) => {
//                   setGoldMedalCount(e.target.value)
//                 }}/></td>
//               </tr>

//               <tr>
//                 <td><label> silverMedalCount:</label></td>
//                 <td><input type="text" name="silverMedalCount" onChange={(e) => {
//                   setSilverMedalCount(e.target.value)
//                 }}/></td>
//               </tr>

//               <tr>
//                 <td><label> bronzeMedalCount:</label></td>
//                 <td><input type="text" name="bronzeMedalCount" onChange={(e) => {
//                   setBronzeMedalCount(e.target.value)
//                 }}/></td>
//               </tr>

//               <tr>
//                 <td><label> totalMedalCount:</label></td>
//                 <td><input type="text" name="totalMedalCount" onChange={(e) => {
//                   setTotalMedalCount(e.target.value)
//                 }}/></td>
//               </tr>

//               <button onClick={submitInsert}> Insert</button>
//               <button onClick={() => submitDisplay()}> Display</button>
//             </div>
//           </table>

//           <h2> Delete</h2>
//           <table>
//             <div className="form">
//               <tr>
//                 <td><label> deleteTable:</label></td>
//                 <td><input type="text" name="deleteTable" onChange={(e) => {
//                   setDeleteTable(e.target.value)
//                 } }/></td>
//               </tr>
              
//               <tr>
//                 <td><label> deleteAttribute:</label></td>
//                 <td><input type="text" name="deleteAttribute" onChange={(e) => {
//                   setDeleteAttribute(e.target.value)
//                 } }/></td>
//               </tr>

//               <tr>
//                 <td><label> deleteValue:</label></td>
//                 <td><input type="text" name="deleteValue" onChange={(e) => {
//                   setDeleteValue(e.target.value)
//                 } }/></td>
//               </tr>

//               <button onClick={submitDelete}> Delete</button>
//               <button onClick={() => submitDisplay()}> Display</button>
//             </div>
//           </table>

//           <h2> Update</h2>
//           <table>
//             <div className="form">
//               <tr>         
//                 <td><label> updateTable:</label></td>
//                 <td><input type="text" name="updateTable" onChange={(e) => {
//                   setUpdateTable(e.target.value)
//                 } }/></td>
//               </tr>

//               <tr>
//                 <td><label> updateSetAttribute:</label></td>
//                 <td><input type="text" name="updateSetAttribute" onChange={(e) => {
//                   setUpdateSetAttribute(e.target.value)
//                 } }/></td>
//               </tr>

//               <tr>
//                 <td><label> updateSetValue:</label></td>
//                 <td><input type="text" name="updateSetValue" onChange={(e) => {
//                   setUpdateSetValue(e.target.value)
//                 } }/></td>
//               </tr>

//               <tr>
//                 <td><label> updateAttribute:</label></td>
//                 <td><input type="text" name="updateAttribute" onChange={(e) => {
//                   setUpdateAttribute(e.target.value)
//                 } }/></td>
//               </tr>

//               <tr>
//                 <td><label> updateValue:</label></td>
//                 <td><input type="text" name="updateValue" onChange={(e) => {
//                   setUpdateValue(e.target.value)
//                 } }/></td>
//               </tr>    

//               <button onClick={submitUpdate}> Update</button>
//               <button onClick={() => submitDisplay()}> Display</button>
//             </div>
//           </table>

//           <h2> Search</h2>
//           <table>
//             <div className="form">
//               <tr>
//                 <td><label> searchTable:</label></td>
//                 <td><input type="text" name="searchTable" onChange={(e) => {
//                   setSearchTable(e.target.value)
//                 } }/></td>
//               </tr>

//               <tr>
//                 <td><label> searchAttribute:</label></td>
//                 <td><input type="text" name="searchAttribute" onChange={(e) => {
//                   setSearchAttribute(e.target.value)
//                 } }/></td>
//               </tr>

//               <tr>
//                 <td><label> searchKeyword:</label></td>
//                 <td><input type="text" name="searchKeyword" onChange={(e) => {
//                   setSearchKeyword(e.target.value)
//                 } }/></td>
//               </tr>

//               <button onClick={submitSearch}> Search</button>
//               <button onClick={() => showResponse("output")}> Display</button>
//             </div>
//           </table>

//           <br></br>
//           <h1> RESPONSE</h1>
//           <div classname="response">
//             <label for="output"></label>
//             <textarea name="output" rows="2" cols="40"></textarea>
//           </div>

//           <br></br>
//           <h1> ADVANCED QUERIES</h1>

//           <h2> Query 1</h2>
//           <p>
//           SELECT n.NOCName, n.goldMedalCount<br></br>
//           FROM NOC n NATURAL JOIN Athlete a<br></br>
//           WHERE n.goldMedalCount &gt; 0 AND n.goldMedalCount &gt; (<br></br>
//                 &emsp;SELECT AVG(n1.goldMedalCount) AS AverageCount<br></br>
//                 &emsp;FROM NOC n1 NATURAL JOIN Athlete a<br></br>
//                 &emsp;WHERE a.discName = 'Karate'<br></br>
//           )<br></br>
//           GROUP BY n.NOCName<br></br>
//           ORDER BY n.goldMedalCount DESC;<br></br>
//           </p>
//           <button onClick={submitQuery1}> Run</button>

//           <h2> Query 2</h2>
//           <p>
//           (<br></br>
//           &emsp;SELECT coachName, c.NOCName, c.discName, COUNT(athleteName) AS athleteCount<br></br>
//           &emsp;FROM Athlete a JOIN Coach c ON (a.NOCName = c.NOCName AND a.discName = c.discName)<br></br>
//           &emsp;WHERE a.discName = 'Basketball'<br></br>
//           &emsp;GROUP BY coachName, c.NOCName, c.discName<br></br>
//           )<br></br>
//           UNION<br></br>
//           (<br></br>
//           &emsp;SELECT coachName, c.NOCName, c.discName, COUNT(athleteName) AS athleteCount<br></br>
//           &emsp;FROM Athlete a JOIN Coach c ON (a.NOCName = c.NOCName AND a.discName = c.discName)<br></br>
//           &emsp;WHERE a.discName = 'Football'<br></br>
//           &emsp;GROUP BY coachName, c.NOCName, c.discName<br></br>
//           )<br></br>
//           ORDER BY coachName<br></br>
//           LIMIT 15;<br></br>
//           </p>
//           <button onClick={submitQuery2}> Run</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

