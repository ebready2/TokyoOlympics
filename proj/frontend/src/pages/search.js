import React, {useState, useEffect} from "react";
import Axios from 'axios';
import showRows from "../components/MyTable.js";
import Select from "react-select";
import data from '../data.json';

function Search() {
    const [responseData, setResponseData] = useState([]);
    const [attributeList, setAttributeList] = useState([]);

    const [searchTable, setSearchTable] = useState([]);
    const [searchAttribute, setSearchAttribute] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState([]);

    const handleTableChange = (obj) => {
      setSearchTable(obj);
      setAttributeList(obj.attributes);
      setSearchAttribute(null);
    };

    const handleAttributeChange = (obj) => {
      setSearchAttribute(obj);
    };

    const submitSearch = () => {
        Axios.get('http://localhost:3002/api/search', {
          params: {
            searchTable: searchTable.tableName,
            searchAttribute: searchAttribute.attributeName,
            searchKeyword: searchKeyword
          }
        }).then((response) => {
          setResponseData(response.data);
          console.log(response);
        }).catch((error) => {
          console.log('Search error');
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
            <h2> Search for Keyword</h2>
            <Select
                placeholder="Select Table"
                value={searchTable}
                options={data}
                onChange={handleTableChange}
                getOptionLabel={x => x.tableName}
                getOptionValue={x => x.tableName}
            />
            <br/>
            <Select
                placeholder="Select Attribute"
                value={searchAttribute}
                options={attributeList}
                onChange={handleAttributeChange}
                getOptionLabel={x => x.attributeName}
                getOptionValue={x => x.attributeName}
            />
            <br/>
            <label> Keyword: </label>
            <input type="text" name="searchKeyword" onChange={(e) => {
                setSearchKeyword(e.target.value)
            }}/>
            <button onClick={submitSearch}> Search</button>
            <button onClick={() => showRows(responseData)}> Display</button>
            <br/>
            <br/>
            <h2 className="response">Your Results</h2>
            <div id="container"></div>
            </div>
        </div>
        </div>
    );
}

export default Search;