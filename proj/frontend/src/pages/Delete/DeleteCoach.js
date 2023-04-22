import React, {useState, useEffect} from "react";
import Axios from 'axios';

function DeleteCoach() {
  const [responseData, setResponseData] = useState([]);
  const [myQuery, setMyQuery] = useState([]);

  const [deleteValue, setDeleteValue] = useState([]);

  const submitDelete = () => {
    Axios.post('http://localhost:3002/api/delete', {
      deleteTable: 'Coach',
      deleteAttribute: 'coachName',
      deleteValue: deleteValue
    }).then((response) => {
      // display the remaining entries with a similar deleteValue
      setMyQuery(`SELECT * FROM Coach WHERE coachName LIKE '%${deleteValue}%';`);
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
      setResponseData(response.data);
      console.log(response);
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
            <h1> Delete</h1>
            <table className="contentTable">
                <div className="form">
                <tr>
                    <td><label> deleteValue:</label></td>
                    <td><input type="text" name="deleteValue" onChange={(e) => {
                    setDeleteValue(e.target.value)
                    } }/></td>
                </tr>

                <button onClick={submitDelete}> Delete</button>
                <button onClick={() => submitDisplay()}> Display</button>
                </div>
            </table>
            <h1 className="response">Your New Country</h1>
                {/* <table>
                    {responseData.map(provider =>
                        <div
                        key={provider.coachName}> 
                        <div className = "card1">
                            <tr>
                                <td><label>Coach Name: </label></td>
                                <td><label>{provider.coachName}</label></td>
                            </tr>
                            
                        </div>
                        </div>
                    )}
            </table> */}
            </div>
        </div>
    </div>
  );
}

export default DeleteCoach;
