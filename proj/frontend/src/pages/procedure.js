import React, {useState, useEffect} from "react";
import Axios from 'axios';
import showRows from "../components/MyTable.js";

function Procedure() {
    const [responseData, setResponseData] = useState([]);

    const submitProcedure = () => {
        Axios.get('http://localhost:3002/api/procedure')
        .then((response) => {
            setResponseData(response.data[0]);
            console.log(response);
        }).catch((error) => {
            console.log('Procedure error');
            console.log(error);
        })
    };

    return (
        <div className="App">
            <div className="stage4">
                <h1 className="whatif">What-If Olympics</h1>
            </div>
            <h2 className='content'>Give the Underdog a Chance</h2>
            <br/>
            <div className="content">
                <button onClick={submitProcedure}> Run</button>
                <button onClick={() => showRows(responseData)}> Display</button>
            </div>
            <br/>
            <div className="content">
            <h2 className="response">Your Results</h2>
            <div id="container"></div>
            </div>
        </div>
    );
}

export default Procedure;