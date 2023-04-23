import React, {useState, useEffect} from "react";
import Axios from 'axios';
import showRows from "../components/MyTable.js";
import Select from "react-select";
import data from '../data.json';


function Update() {
    const [myQuery, setMyQuery] = useState([]);
    const [attributeList, setAttributeList] = useState([]);

    const [updateTable, setUpdateTable] = useState([]);
    const [updateAttribute1, setUpdateAttribute1] = useState([]);
    const [updateValue1, setUpdateValue1] = useState([]);
    const [updateAttribute2, setUpdateAttribute2] = useState([]);
    const [updateValue2, setUpdateValue2] = useState([]);

    const handleTableChange = (obj) => {
        setUpdateTable(obj);
        setAttributeList(obj.attributes);
        setUpdateAttribute1(null);
        setUpdateAttribute2(null);
      };
  
    const handleAttribute1Change = (obj) => {
        setUpdateAttribute1(obj);
    };

    const handleAttribute2Change = (obj) => {
        setUpdateAttribute2(obj);
    };

    const submitUpdate = () => {
        Axios.post('http://localhost:3002/api/update', {
            updateTable: updateTable.tableName,
            updateAttribute1: updateAttribute1.attributeName,
            updateValue1: updateValue1,
            updateAttribute2: updateAttribute2.attributeName,
            updateValue2: updateValue2
        }).then((response) => {
        // display updated record and ones with a similar updateValue
        // can't change primary key, only other attributes
            setMyQuery(`SELECT * FROM ${updateTable.tableName} WHERE ${updateAttribute2.attributeName} LIKE '%${updateValue2}%';`);
            console.log(response);
        }).catch((error) => {
            console.log('Update error');
            console.log(error);
        })
    }

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
              <h2> Update Matching Records</h2>
                <Select
                    placeholder="Select Table to Update"
                    value={updateTable}
                    options={data}
                    onChange={handleTableChange}
                    getOptionLabel={x => x.tableName}
                    getOptionValue={x => x.tableName}
                />
                <br/>
                <Select
                    placeholder="Select Attribute to Set"
                    value={updateAttribute1}
                    options={attributeList}
                    onChange={handleAttribute1Change}
                    getOptionLabel={x => x.attributeName}
                    getOptionValue={x => x.attributeName}
                />
                <br/>
                <label> Value to Set: </label>
                <input type="text" name="updateValue1" onChange={(e) => {
                    setUpdateValue1(e.target.value)
                }}/>
                <br/>
                <br/>
                <Select
                    placeholder="Select Attribute to Filter By"
                    value={updateAttribute2}
                    options={attributeList}
                    onChange={handleAttribute2Change}
                    getOptionLabel={x => x.attributeName}
                    getOptionValue={x => x.attributeName}
                />
                <br/>
                <label> Value to Filter By: </label>
                <input type="text" name="updateValue2" onChange={(e) => {
                    setUpdateValue2(e.target.value)
                }}/>
                <br/>
                <br/>
                <button onClick={submitUpdate}> Update</button>
                <button onClick={submitDisplay}> Display</button>
                <br/>
                <br/>
                <h2 className="response">Your Updated Records</h2>
                <div id="container"></div>
            </div>
          </div>
        </div>
    );   
}

export default Update;