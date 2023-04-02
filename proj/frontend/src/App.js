import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [NOCName, setNOCName] = useState('');
  const [ranking, setRanking] = useState('');
  const [weightedRanking, setWeightedRanking] = useState('');
  const [goldMedalCount, setGoldMedalCount] = useState('');
  const [silverMedalCount, setSilverMedalCount] = useState('');
  const [bronzeMedalCount, setBronzeMedalCount] = useState('');
  const [totalMedalCount, setTotalMedalCount] = useState('');

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

  return (
    <div className="App">
      <h1> CRUD APPLICATIONS</h1>

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
      </div>
  
    </div>
  );
}

export default App;
