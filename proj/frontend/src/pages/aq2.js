import React, {useState, useEffect} from "react";
import Axios from 'axios';
import showRows from "../components/MyTable.js";

function AQ1() {
    const [responseData, setResponseData] = useState([]);

    const submitQuery2 = () => {
        Axios.get('http://localhost:3002/api/query2')
        .then((response) => {
          setResponseData(response.data);
          console.log(response);
        }).catch((error) => {
          console.log('Query 2 error');
          console.log(error);
        })
    }

    return (
        <div className="App">
        <div className="stage4">
            <h1 className="whatif">What-If Olympics</h1>
        </div>
        <div className="content">
            <p className="title">  Athletes that Baskeball and Football Coaches Manage</p>
            <table className="contentTable">
                <tr>
                    <td>
                    (<br></br>
                    &emsp;SELECT coachName, c.NOCName, c.discName, COUNT(athleteName) AS athleteCount<br></br>
                    &emsp;FROM Athlete a JOIN Coach c ON (a.NOCName = c.NOCName AND a.discName = c.discName)<br></br>
                    &emsp;WHERE c.discName = 'Basketball'<br></br>
                    &emsp;GROUP BY coachName, c.NOCName, c.discName<br></br>
                    )<br></br>
                    UNION<br></br>
                    (<br></br>
                    &emsp;SELECT coachName, c.NOCName, c.discName, COUNT(athleteName) AS athleteCount<br></br>
                    &emsp;FROM Athlete a JOIN Coach c ON (a.NOCName = c.NOCName AND a.discName = c.discName)<br></br>
                    &emsp;WHERE c.discName = 'Football'<br></br>
                    &emsp;GROUP BY coachName, c.NOCName, c.discName<br></br>
                    )<br></br>
                    ORDER BY coachName<br></br>
                    LIMIT 15;<br></br>
                    </td>
                </tr>
                <tr>
                    <td>
                    <button className="btn" onClick={submitQuery2}> Run</button>
                    <button className="btn" onClick={() => showRows(responseData)}> Display</button>
                    </td>
                </tr>
            </table>
            <br/>
            <p className="response, title">Your Results</p>
            <div id="container"></div>
        </div>
        </div>
    );
}

export default AQ1;