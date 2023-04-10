import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  // Inputs
  const [responseData, setResponseData] = useState('');

  const [updateTable, setUpdateTable] = useState('');
  const [updateNewAttribute, setUpdateNewAttribute] = useState('');
  const [updateNewValue, setUpdateNewValue] = useState('');
  const [updateAttribute, setUpdateAttribute] = useState('');
  const [updateValue, setUpdateValue] = useState('');

  const [value, setValue] = useState('');
  const [attribute, setAttribute] = useState('');
  const [table, setTable] = useState('');
  const [keyword, setKeyword] = useState('');

  const [NOCName, setNOCName] = useState('');
  const [ranking, setRanking] = useState('');
  const [weightedRanking, setWeightedRanking] = useState('');
  const [goldMedalCount, setGoldMedalCount] = useState('');
  const [silverMedalCount, setSilverMedalCount] = useState('');
  const [bronzeMedalCount, setBronzeMedalCount] = useState('');
  const [totalMedalCount, setTotalMedalCount] = useState('');

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
    }).then((response) => {
      // setResponseData(response.config.data);
      console.log(response);
    }).catch((error) => {
      console.log('Insert error');
      console.log(error);
    })
  };

  const submitDelete = () => {
    Axios.post('http://localhost:3002/api/delete', {
      table: table,
      attribute: attribute,
      value: value
    }).then((response) => {
      // setResponseData(response);
      console.log(response);
    }).catch((error) => {
      console.log('Delete error');
      console.log(error);
    })
  };

  const submitUpdate = () => {
    Axios.post('http://localhost:3002/api/update', {
      updateTable: updateTable,
      updateNewAttribute: updateNewAttribute,
      updateNewValue: updateNewValue,
      updateAttribute: updateAttribute,
      updateValue: updateValue
    }).then((response) => {
      // setResponseData(response);
      console.log(response);
    }).catch((error) => {
      console.log('Update error');
      console.log(error);
    })
  }

  const submitSearch = () => {
    Axios.get('http://localhost:3002/api/search', {
      params: {
        table: table,
        attribute: attribute,
        keyword: keyword
      }
    }).then((response) => {
      setResponseData(response.data);
      console.log(response);
    }).catch((error) => {
      console.log('Search error');
      console.log(error);
    })
  };

  const submitDisplay = (myquery) => {
    Axios.get('http://localhost:3002/api/display', {
      params: {
        myquery: myquery
      }
    }).then((response) => {
      setResponseData(response.data);
      console.log(response);
      showRows("output");
    }).catch((error) => {
      console.log('Display error');
      console.log(error);
    })
  };

  const submitQuery1 = () => {
    Axios.get('http://localhost:3002/api/query1')
    .then((response) => {
      setResponseData(response.data);
      console.log(response);
    }).then(() => {
      showRows("output");
    }).catch((error) => {
      console.log('Query 1 error');
      console.log(error);
    })
  }

  const submitQuery2 = () => {
    console.log("Starting Query 2")
    Axios.get('http://localhost:3002/api/query2')
    .then((response) => {
      setResponseData(response.data);
      console.log(response);
    }).then(() => {
      showRows("output");
    }).catch((error) => {
      console.log('Query 2 error');
      console.log(error);
    })
  }

  const showRows = (output) => {
    document.getElementsByName(output)[0].value = JSON.stringify(responseData);
  }

  // useEffect(() => {
  //   showRows("output");
  // });

  return (
    <div className="App">
      <h1> What-If Olympics</h1>
      <div className="stage4">

        <h2> Insert</h2>
        <div className="form">
          <label> NOCName:</label>
          <input type="text" name="NOCName" onChange={(e) => {
            setNOCName(e.target.value)
          } }/><br></br>
          <label> ranking:</label>
          <input type="text" name="ranking" onChange={(e) => {
            setRanking(e.target.value)
          }}/><br></br>
          <label> weightedRanking:</label>
          <input type="text" name="weightedRanking" onChange={(e) => {
            setWeightedRanking(e.target.value)
          }}/><br></br>
          <label> goldMedalCount:</label>
          <input type="text" name="goldMedalCount" onChange={(e) => {
            setGoldMedalCount(e.target.value)
          }}/><br></br>
          <label> silverMedalCount:</label>
          <input type="text" name="silverMedalCount" onChange={(e) => {
            setSilverMedalCount(e.target.value)
          }}/><br></br>
          <label> bronzeMedalCount:</label>
          <input type="text" name="bronzeMedalCount" onChange={(e) => {
            setBronzeMedalCount(e.target.value)
          }}/><br></br>
          <label> totalMedalCount:</label>
          <input type="text" name="totalMedalCount" onChange={(e) => {
            setTotalMedalCount(e.target.value)
          }}/><br></br>

          <button onClick={submitInsert}> Insert</button>
          <button onClick={() => submitDisplay(`SELECT * FROM NOC WHERE NOCName = '${NOCName}';`)}> Display</button>
          
        </div>

        <h2> Delete</h2>
        <div className="form">
          <label> Table:</label>
          <input type="text" name="table" onChange={(e) => {
            setTable(e.target.value)
          } }/><br></br>
          <label> Attribute:</label>
          <input type="text" name="attribute" onChange={(e) => {
            setAttribute(e.target.value)
          } }/><br></br>
          <label> Value:</label>
          <input type="text" name="value" onChange={(e) => {
            setValue(e.target.value)
          } }/><br></br>

          <button onClick={submitDelete}> Delete</button>
          <button onClick={() => submitDisplay(`SELECT * FROM ${table} WHERE ${attribute} = '${value}';`)}> Display</button>
        </div>

        <h2> Update</h2>
        <div className="form">
          <label> updateTable:</label>
          <input type="text" name="updateTable" onChange={(e) => {
            setUpdateTable(e.target.value)
          } }/><br></br>
          <label> updateNewAttribute:</label>
          <input type="text" name="updateNewAttribute" onChange={(e) => {
            setUpdateNewAttribute(e.target.value)
          } }/><br></br>
          <label> updateNewValue:</label>
          <input type="text" name="updateNewValue" onChange={(e) => {
            setUpdateNewValue(e.target.value)
          } }/><br></br>
          <label> updateAttribute:</label>
          <input type="text" name="updateAttribute" onChange={(e) => {
            setUpdateAttribute(e.target.value)
          } }/><br></br>
          <label> updateValue:</label>
          <input type="text" name="updateValue" onChange={(e) => {
            setUpdateValue(e.target.value)
          } }/><br></br>        

          <button onClick={submitUpdate}> Update</button>
          <button onClick={() => submitDisplay(`SELECT * FROM ${updateTable} WHERE ${updateAttribute} = '${updateValue}';`)}> Display</button>
        </div>

        <h2> Search</h2>
        <div className="form">
          <label> Table:</label>
          <input type="text" name="table" onChange={(e) => {
            setTable(e.target.value)
          } }/><br></br>
          <label> Attribute:</label>
          <input type="text" name="attribute" onChange={(e) => {
            setAttribute(e.target.value)
          } }/><br></br>
          <label> Keyword:</label>
          <input type="text" name="keyword" onChange={(e) => {
            setKeyword(e.target.value)
          } }/><br></br>

          <button onClick={submitSearch}> Search</button>
          <button onClick={() => showRows("output")}> Display</button>
        </div>

        <br></br>
        <h1> RESPONSE</h1>
        <label for="output"></label>
        <textarea name="output" rows="2" cols="10"></textarea>

        <br></br>
        <h1> ADVANCED QUERIES</h1>

        <h2> Query 1</h2>
        <h3>
        SELECT n.NOCName, n.goldMedalCount<br></br>
        FROM NOC n NATURAL JOIN Athlete a<br></br>
        WHERE n.goldMedalCount > 0 AND n.goldMedalCount > (<br></br>
              &emsp;SELECT AVG(n1.goldMedalCount) AS AverageCount<br></br>
              &emsp;FROM NOC n1 NATURAL JOIN Athlete a<br></br>
              &emsp;WHERE a.discName = 'Karate'<br></br>
        )<br></br>
        GROUP BY n.NOCName<br></br>
        ORDER BY n.goldMedalCount DESC;<br></br>
        </h3>
        <button onClick={submitQuery1}> Run</button>

        <h2> Query 2</h2>
        <h3>
        (SELECT coachName, c.NOCName, c.discName, COUNT(athleteName) AS athleteCount<br></br>
        FROM Athlete a JOIN Coach c ON (a.NOCName = c.NOCName AND a.discName = c.discName)<br></br>
        WHERE a.discName = 'Basketball'<br></br>
        GROUP BY coachName, c.NOCName, c.discName)<br></br>
        &emsp;UNION<br></br>
        (SELECT coachName, c.NOCName, c.discName, COUNT(athleteName) AS athleteCount<br></br>
        FROM Athlete a JOIN Coach c ON (a.NOCName = c.NOCName AND a.discName = c.discName)<br></br>
        WHERE a.discName = 'Football'<br></br>
        GROUP BY coachName, c.NOCName, c.discName)<br></br>
        ORDER BY coachName<br></br>
        LIMIT 15;<br></br>
        </h3>
        <button onClick={submitQuery2}> Run</button>

      </div>
    </div>
  );
}

export default App;
