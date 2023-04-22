import React, {useState, useEffect} from "react";
import Axios from 'axios';
import showRows from "../Display.js";

function DeleteNOC() {
  const [myQuery, setMyQuery] = useState([]);

  const [deleteValue, setDeleteValue] = useState([]);

  const submitDelete = () => {
    Axios.post('http://localhost:3002/api/delete', {
      deleteTable: 'NOC',
      deleteAttribute: 'NOCName',
      deleteValue: deleteValue
    }).then((response) => {
      // display the remaining entries with a similar deleteValue
      setMyQuery(`SELECT * FROM NOC WHERE NOCName LIKE '%${deleteValue}%';`);
      console.log(response);
    }).catch((error) => {
      console.log('Delete error');
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
            <h1> Delete a Country</h1>
            <table className="contentTable">
                <div className="form">
                <tr>
                    <td><label> deleteValue:</label></td>
                    <td><input type="text" name="deleteValue" onChange={(e) => {
                    setDeleteValue(e.target.value)
                    } }/></td>
                </tr>

                <button onClick={submitDelete}> Delete</button>
                <button onClick={submitDisplay}> Display</button>
                </div>
            </table>
            <h1 className="response">Verify with Search</h1>
            <div id="container"></div>
            </div>
        </div>
    </div>
  );
}

export default DeleteNOC;
