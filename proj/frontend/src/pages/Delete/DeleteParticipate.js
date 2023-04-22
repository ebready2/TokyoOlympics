import React, {useState, useEffect} from "react";
import Axios from 'axios';

function DeleteParticipate() {
  const [responseData, setResponseData] = useState([]);
  const [myQuery, setMyQuery] = useState([]);

  const [deleteValue1, setDeleteValue1] = useState([]);
  const [deleteValue2, setDeleteValue2] = useState([]);

  const submitDelete = () => {
    Axios.post('http://localhost:3002/api/delete2', {
      deleteTable: 'Participate',
      deleteAttribute1: 'NOCName',
      deleteAttribute2: 'discName',
      deleteValue1: deleteValue1,
      deleteValue2: deleteValue2
    }).then((response) => {
      // display the remaining entries with a similar deleteValue
      setMyQuery(`SELECT * FROM NOC WHERE NOCName LIKE '%${deleteValue1}%' AND discName LIKE '%${deleteValue2}%';`);
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
                    <td><label> deleteValue1:</label></td>
                    <td><input type="text" name="deleteValue" onChange={(e) => {
                    setDeleteValue1(e.target.value)
                    } }/></td>
                </tr>
                <tr>
                    <td><label> deleteValue2:</label></td>
                    <td><input type="text" name="deleteValue" onChange={(e) => {
                    setDeleteValue2(e.target.value)
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
                        key={provider.NOCName}> 
                        <div className = "card1">
                            <tr>
                                <td><label>NOC Name: </label></td>
                                <td><label>{provider.NOCName}</label></td>
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

export default DeleteParticipate;
