import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  // Inputs
  const [NOCName, setNOCName] = useState('');
  const [ranking, setRanking] = useState('');
  const [weightedRanking, setWeightedRanking] = useState('');
  const [goldMedalCount, setGoldMedalCount] = useState('');
  const [silverMedalCount, setSilverMedalCount] = useState('');
  const [bronzeMedalCount, setBronzeMedalCount] = useState('');
  const [totalMedalCount, setTotalMedalCount] = useState('');

  // const [table, setTable] = useState('');
  // const [keyword, setKeyword] = useState('');

  // Functions
  const submitInsert = () => {
    Axios.post('http://localhost:3002/api/insert', {
      NOCName: NOCName,
      ranking: ranking,
      weightedRanking: weightedRanking,
      goldMedalCount: goldMedalCount,
      silverMedalCount: silverMedalCount,
      bronzeMedalCount: bronzeMedalCount,
      totalMedalCount: totalMedalCount
    }).then(() => {
      alert('success insert')
    })
  };

  const submitDisplay = () => {
    const resp = Axios.get('http://localhost:3002/api/display')
    .then(function (response) {
      console.log(response.data);
      document.getElementsByName('output')[0].value = JSON.stringify(response.data);
    });
  };

  // const submitSearch = () => {
  //   Axios.get('http://localhost:3002/api/search', {
  //     table: table,
  //     keyword: keyword
  //   }).then(() => {
  //     alert('success search')
  //   })
  // };

  return (
    <div className="App">
      <h1> CRUD APPLICATIONS</h1>

      <h2> Insert</h2>
      <div className="form">
        <label> NOCName:</label>
        <input type="text" name="NOCName" onChange={(e) => {
          setNOCName(e.target.value)
        } }/>
        <label> ranking:</label>
        <input type="text" name="ranking" onChange={(e) => {
          setRanking(e.target.value)
        }}/>
        <label> weightedRanking:</label>
        <input type="text" name="weightedRanking" onChange={(e) => {
          setWeightedRanking(e.target.value)
        }}/>
        <label> goldMedalCount:</label>
        <input type="text" name="goldMedalCount" onChange={(e) => {
          setGoldMedalCount(e.target.value)
        }}/>
        <label> silverMedalCount:</label>
        <input type="text" name="silverMedalCount" onChange={(e) => {
          setSilverMedalCount(e.target.value)
        }}/>
        <label> bronzeMedalCount:</label>
        <input type="text" name="bronzeMedalCount" onChange={(e) => {
          setBronzeMedalCount(e.target.value)
        }}/>
        <label> totalMedalCount:</label>
        <input type="text" name="totalMedalCount" onChange={(e) => {
          setTotalMedalCount(e.target.value)
        }}/>

        <button onClick={submitInsert}> Submit</button>

        <button onClick={submitDisplay}> Display</button>
        <label for="output">The response is: </label><input type="textbox" name="output"></input>
        
      </div>

      {/* <h2> Search</h2>
      <div className="form">
      <label> table:</label>
        <input type="text" name="table" onChange={(e) => {
          setTable(e.target.value)
        } }/>
        <label> keyword:</label>
        <input type="text" name="keyword" onChange={(e) => {
          setKeyword(e.target.value)
        } }/>
        <button onClick={submitSearch}> Submit</button>
      </div> */}
  
    </div>
  );
}

export default App;
