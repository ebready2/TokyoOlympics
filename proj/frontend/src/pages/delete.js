import React, {useState, useEffect} from "react";
import Axios from 'axios';
import showRows from "../components/MyTable.js";
import Select from "react-select";
import data from '../data.json';

function DeleteAthlete() {
  const [myQuery, setMyQuery] = useState('');
  const [attributeList, setAttributeList] = useState([]);

  const [deleteTable, setDeleteTable] = useState([]);
  const [deleteAttribute, setDeleteAttribute] = useState([]);
  const [deleteValue, setDeleteValue] = useState([]);

  const handleTableChange = (obj) => {
    setDeleteTable(obj);
    setAttributeList(obj.attributes);
    setDeleteAttribute(null);
  }

  const handleAttributeChange = (obj) => {
    setDeleteAttribute(obj);
  }

  const submitDelete = () => {
    Axios.post('http://localhost:3002/api/delete', {
      deleteTable: deleteTable.tableName,
      deleteAttribute: deleteAttribute.attributeName,
      deleteValue: deleteValue
    }).then((response) => {
      // display the remaining entries with a similar deleteValue
      setMyQuery(`SELECT * FROM ${deleteTable.tableName} WHERE ${deleteAttribute.attributeName} LIKE '%${deleteValue}%';`);
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
      <div className="content">
        <h2> Delete Matching Records </h2>
        <Select
            placeholder="Select Table"
            value={deleteTable}
            options={data}
            onChange={handleTableChange}
            getOptionLabel={x => x.tableName}
            getOptionValue={x => x.tableName}
        />
        <br/>
        <Select
            placeholder="Select Attribute"
            value={deleteAttribute}
            options={attributeList}
            onChange={handleAttributeChange}
            getOptionLabel={x => x.attributeName}
            getOptionValue={x => x.attributeName}
        />
        <br/>
        <label> Delete Value: </label>
        <input type="text" name="deleteValue" onChange={(e) => {
            setDeleteValue(e.target.value)
        }}/>
        <button onClick={submitDelete}> Delete</button>
        <button onClick={submitDisplay}> Display</button>
        <br/>
        <br/>
        <h2 className="response">Verify with Search</h2>
        <div id="container"></div>
      </div>
    </div>
  );
}

export default DeleteAthlete;