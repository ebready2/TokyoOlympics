import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  // Inputs
  const [value, setValue] = useState('');
  const [attribute, setAttribute] = useState('');

  const [NOCName, setNOCName] = useState('');
  const [ranking, setRanking] = useState('');
  const [weightedRanking, setWeightedRanking] = useState('');
  const [goldMedalCount, setGoldMedalCount] = useState('');
  const [silverMedalCount, setSilverMedalCount] = useState('');
  const [bronzeMedalCount, setBronzeMedalCount] = useState('');
  const [totalMedalCount, setTotalMedalCount] = useState('');

  // const [table, setTable] = useState('');
  // const [keyword, setKeyword] = useState('');

  // Submits
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

  const submitDisplay = (output) => {
    Axios.get('http://localhost:3002/api/display')
    .then(function (response) {
      console.log(response.data);
      document.getElementsByName(output)[0].value = JSON.stringify(response.data);
    });
  };

  const submitDelete = () => {
    Axios.post('http://localhost:3002/api/delete', {
      NOCName: NOCName
    }).then(() => {
      alert('success delete')
    })
  };

  const submitUpdate = () => {
    Axios.post('http://localhost:3002/api/update', {
      NOCName: NOCName,
      attribute: attribute,
      value: value
    }).then(() => {
      alert('success update')
    })
  }


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

        <button onClick={submitInsert}> Insert</button>

        <button onClick={() => submitDisplay("output")}> Display</button>
        <label for="output">The response is: </label><input type="textbox" name="output"></input>
      </div>

      <h2> Delete</h2>
      <div className="form">
        <label> NOCName:</label>
        <input type="text" name="NOCName" onChange={(e) => {
          setNOCName(e.target.value)
        } }/>

        <button onClick={submitDelete}> Delete</button>

        <button onClick={() => submitDisplay("output2")}> Display</button>
        <label for="output2">The response is: </label><input type="textbox" name="output2"></input>
      </div>

      <h2> Update</h2>
      <div className="form">
        <label> NOCName:</label>
        <input type="text" name="NOCName" onChange={(e) => {
          setNOCName(e.target.value)
        } }/>
        <label> Attribute:</label>
        <input type="text" name="Attribute" onChange={(e) => {
          setAttribute(e.target.value)
        } }/>
        {/* <select name="update" id="update-select" onChange={(e) => {
            setAttribute(e.value)
          } }>
          <option value="">--Please choose an option--</option>
          <option value="ranking">Ranking</option>
          <option value="weightedRanking">WeightedRanking</option>
          <option value="goldMedalCount">GoldMedalCount</option>
          <option value="silverMedalCount">SilverMedalCount</option>
          <option value="bronzeMedalCount">BronzeMedalCount</option>
          <option value="totalMedalCount">TotalMedalCount</option>
        </select> */}
        <label> Value:</label>
        <input type="text" name="Value" onChange={(e) => {
          setValue(e.target.value)
        } }/>

        <button onClick={submitUpdate}> Update</button>

        <button onClick={() => submitDisplay("output3")}> Display</button>
        <label for="output3">The response is: </label><input type="textbox" name="output3"></input>
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
