const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var db = mysql.createConnection({
    host:'34.71.11.31',
    user:'root',
    password:'heeheehawhaw011',
    database:'whatif',
})
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/insert", (require, response) => {
    const NOCName = require.body.NOCName;
    const ranking = require.body.ranking;
    const weightedRanking = require.body.weightedRanking;
    const goldMedalCount = require.body.goldMedalCount;
    const silverMedalCount = require.body.silverMedalCount;
    const bronzeMedalCount = require.body.bronzeMedalCount;
    const totalMedalCount = require.body.totalMedalCount;

    const sqlInsert = `INSERT INTO NOC (NOCName,ranking,weightedRanking,goldMedalCount,silverMedalCount,bronzeMedalCount,totalMedalCount) VALUES ('${NOCName}',${ranking},${weightedRanking},${goldMedalCount},${silverMedalCount},${bronzeMedalCount},${totalMedalCount});`;
    db.query(sqlInsert, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Inserted!");
            response.send(result);
        }
    })
});

app.post("/api/delete", (require, response) => {
    const table = require.body.table;
    const attribute = require.body.attribute;
    const value = require.body.value;
    console.log(table);
    console.log(attribute);
    console.log(value);

    const sqlDelete = `DELETE FROM ${table} WHERE ${attribute} = '${value}';`;
    db.query(sqlDelete, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted!");
            console.log(result);
            response.send(result);
        }
    })
})

app.post("/api/update", (require, response) => {
    const updateTable = require.body.updateTable;
    const updateNewAttribute = require.body.updateNewAttribute;
    const updateNewValue = require.body.updateNewValue;
    const updateAttribute = require.body.updateAttribute;
    const updateValue = require.body.updateValue;

    const sqlUpdate = `UPDATE ${updateTable} SET ${updateNewAttribute} = '${updateNewValue}' WHERE ${updateAttribute} = '${updateValue}';`;
    db.query(sqlUpdate, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Updated!");
            response.send(result);
        }
    })
});

app.get("/api/search", (require, response) => {
    const table = require.query.table;
    const attribute = require.query.attribute;
    const keyword = require.query.keyword;

    const sql1 = `SELECT * FROM ${table} WHERE ${attribute} LIKE '%${keyword}%';`;
    db.query(sql1, (err, result) => {
        if (err) {
            console.log(err);
        } else if (result.length == 0) {
            console.log("Empty response");
            response.send("Empty");
        } else {
            console.log("Searched!");
            response.send(result);
        }
    });
});

app.get("/api/display", (require, response) => {
    const myquery = require.query.myquery;
    console.log(myquery);

    const sqlSearch = `${myquery}`;
    db.query(sqlSearch, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Searched!");
            console.log(result);
            response.send(result);
        }
    })
});

app.get("/api/query1", (require, response) => {
    const sqlQuery1 = `SELECT n.NOCName, n.goldMedalCount
    FROM NOC n NATURAL JOIN Athlete a
    WHERE n.goldMedalCount > 0 AND n.goldMedalCount > (
    SELECT AVG(n1.goldMedalCount) AS AverageCount
    FROM NOC n1 NATURAL JOIN Athlete a
    WHERE a.discName = 'Karate'
    )
    GROUP BY n.NOCName
    ORDER BY n.goldMedalCount DESC;`;
    db.query(sqlQuery1, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Query 1!");
            console.log(result);
            response.send(result);
        }
    })
});

app.get("/api/query2", (require, response) => {
    const sqlQuery2 = `(SELECT coachName, c.NOCName, c.discName, COUNT(athleteName) AS athleteCount
    FROM Athlete a JOIN Coach c ON (a.NOCName = c.NOCName AND a.discName = c.discName)
    WHERE a.discName = 'Basketball'
    GROUP BY coachName, c.NOCName, c.discName)
    UNION
    (SELECT coachName, c.NOCName, c.discName, COUNT(athleteName) AS athleteCount
    FROM Athlete a JOIN Coach c ON (a.NOCName = c.NOCName AND a.discName = c.discName)
    WHERE a.discName = 'Football'
    GROUP BY coachName, c.NOCName, c.discName)
    ORDER BY coachName
    LIMIT 15;
    `;
    db.query(sqlQuery2, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Query 2!");
            console.log(result);
            response.send(result);
        }
    })
})

app.listen(3002, () => {
    console.log("running on port 3002");
});