import React, {useState, useEffect} from "react";
import Axios from 'axios';
import showRows from "../components/MyTable.js";

function AQ1() {
    const [responseData, setResponseData] = useState([]);

    const submitQuery1 = () => {
        Axios.get('http://localhost:3002/api/query1')
        .then((response) => {
            setResponseData(response.data);
            console.log(response);
        }).catch((error) => {
            console.log('Query 1 error');
            console.log(error);
        })
    };

    return (
        <div className="App">
        <div className="stage4">
            <h1 className="whatif">What-If Olympics</h1>
        </div>
        <div className="content">
        <p className="title"> Select Countries with More Than the Average Number of Gold Medals </p>
            <table>
                <tr>
                    <td>
                    SELECT n.NOCName, n.goldMedalCount<br></br>
                    FROM NOC n NATURAL JOIN Athlete a<br></br>
                    WHERE n.goldMedalCount &gt; 0 AND n.goldMedalCount &gt; (<br></br>
                            &emsp;SELECT AVG(n1.goldMedalCount) AS AverageCount<br></br>
                            &emsp;FROM NOC n1 NATURAL JOIN Athlete a<br></br>
                            &emsp;WHERE a.discName = 'Karate'<br></br>
                    )<br></br>
                    GROUP BY n.NOCName<br></br>
                    ORDER BY n.goldMedalCount DESC;<br></br>
                    </td>
                </tr>
                <tr>
                    <td>
                    <button className="btn" onClick={submitQuery1}> Run</button>
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