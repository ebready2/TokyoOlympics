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
    const deleteTable = require.body.deleteTable;
    const deleteAttribute = require.body.deleteAttribute;
    const deleteValue = require.body.deleteValue;

    const sqlDelete = `DELETE FROM ${deleteTable} WHERE ${deleteAttribute} = '${deleteValue}';`;
    db.query(sqlDelete, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted!");
            response.send(result);
        }
    })
})

app.post("/api/update", (require, response) => {
    const updateTable = require.body.updateTable;
    const updateSetAttribute = require.body.updateSetAttribute;
    const updateSetValue = require.body.updateSetValue;
    const updateAttribute = require.body.updateAttribute;
    const updateValue = require.body.updateValue;

    const sqlUpdate = `UPDATE ${updateTable} SET ${updateSetAttribute} = ${updateSetValue} WHERE ${updateAttribute} = '${updateValue}';`;
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
    const searchTable = require.query.searchTable;
    const searchAttribute = require.query.searchAttribute;
    const searchKeyword = require.query.searchKeyword;

    const sql1 = `SELECT * FROM ${searchTable} WHERE ${searchAttribute} LIKE '%${searchKeyword}%';`;
    db.query(sql1, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Searched!");
            response.send(result);
        }
    });
});

app.get("/api/display", (require, response) => {
    const myQuery = require.query.myQuery;
    console.log(myQuery);

    const sqlSearch = `${myQuery}`;
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