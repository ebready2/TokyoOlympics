import React, {useState, useEffect} from "react";
import Axios from 'axios';
import showRows from "../components/MyTable.js";

function Insert() {
    const [myQuery, setMyQuery] = useState('');
    const [NOCName, setNOCName] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [weightedRanking, setWeightedRanking] = useState([]);
    const [goldMedalCount, setGoldMedalCount] = useState([]);
    const [silverMedalCount, setSilverMedalCount] = useState([]);
    const [bronzeMedalCount, setBronzeMedalCount] = useState([]);
    const [totalMedalCount, setTotalMedalCount] = useState([]);

    // requests
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
            // display the inputted record and ones with similar NOCNames
            setMyQuery(`SELECT * FROM NOC WHERE NOCName LIKE '%${NOCName}%';`);
            console.log(response);
        }).catch((error) => {
            console.log('Insert error');
            console.log(error);
        })
    };

    const submitDisplay = () => {
        Axios.get('http://localhost:3002/api/display', {
          params: {
            myQuery: myQuery
          }
        }).then((response) => {
          showRows(response.data);
        }).catch((error) => {
          console.log('Display error');
          console.log(error);
        })
    };

    return (
        <div className="App">
          <div className="stage4">
            <h1 className="whatif">What-If Olympics</h1>
          </div>
          <div>
            <div className="content">
              <p className="title"> Add a New Country</p>
              <table className="contentTable">
                <div className="form">
                  <tr>
                    <td><label> NOC Name:</label></td>
                    <td><input type="text" name="NOCName" onChange={(e) => {
                      setNOCName(e.target.value)
                    } }/></td>
                  </tr>
    
                  <tr>
                    <td><label> Ranking:</label></td>
                    <td><input type="text" name="ranking" onChange={(e) => {
                      setRanking(e.target.value)
                    }}/></td>
                  </tr>
    
                  <tr>
                    <td><label> Weighted Ranking:</label></td>
                    <td><input type="text" name="weightedRanking" onChange={(e) => {
                      setWeightedRanking(e.target.value)
                    }}/></td>
                  </tr>
    
                  <tr>
                    <td><label> Gold Medal Count:</label></td>
                    <td><input type="text" name="goldMedalCount" onChange={(e) => {
                      setGoldMedalCount(e.target.value)
                    }}/></td>
                  </tr>
    
                  <tr>
                    <td><label> Silver Medal Count:</label></td>
                    <td><input type="text" name="silverMedalCount" onChange={(e) => {
                      setSilverMedalCount(e.target.value)
                    }}/></td>
                  </tr>
    
                  <tr>
                    <td><label> Bronze Medal Count:</label></td>
                    <td><input type="text" name="bronzeMedalCount" onChange={(e) => {
                      setBronzeMedalCount(e.target.value)
                    }}/></td>
                  </tr>
    
                  <tr>
                    <td><label> Total Medal Count:</label></td>
                    <td><input type="text" name="totalMedalCount" onChange={(e) => {
                      setTotalMedalCount(e.target.value)
                    }}/></td>
                  </tr>
    
                  <button className="btn" onClick={submitInsert}> Insert</button>
                  <button className="btn" onClick={submitDisplay}> Display</button>
                </div>
              </table>
              <br/>
              <p className="response, title">Your New Country</p>
              <div id="container"></div>
            </div>
          </div>
        </div>
    );
}

export default Insert;