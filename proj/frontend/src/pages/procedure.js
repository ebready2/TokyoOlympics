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
            <div className="content">
                <p className='title'>Give the Underdog a Chance</p>
                <p className="pgraph"> Click this button to apply a bonus and recalculate the rankings for smaller countries.</p>
                <br/>
                <div className="content">
                    <button className="btn" onClick={submitProcedure}> Run</button>
                    <button className="btn" onClick={() => showRows(responseData)}> Display</button>
                </div>
                <br/>
                <div className="content">
                <p className="title">Your Results</p>
                <div id="container"></div>
            </div>
            </div>
        </div>
    );
}

export default Procedure;