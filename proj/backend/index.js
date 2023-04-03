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

    const sqlInsert = "INSERT INTO `NOC` (`NOCName`,`ranking`,`weightedRanking`,`goldMedalCount`,`silverMedalCount`,`bronzeMedalCount`,`totalMedalCount`) VALUES (?,?,?,?,?,?,?);";
    db.query(sqlInsert, [NOCName, ranking, weightedRanking, goldMedalCount, silverMedalCount, bronzeMedalCount, totalMedalCount], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Inserted!");
        }
    })
});

app.get("/api/display", (require, response) => {
    const sqlSearch = "SELECT * FROM `NOC` ORDER BY `ranking` ASC LIMIT 5;";
    db.query(sqlSearch, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Searched!");
            response.send(result);
        }
    })
})

app.post("/api/delete", (require, response) => {
    const NOCName = require.body.NOCName;

    const sqlDelete = "DELETE FROM `NOC` WHERE `NOCName` = ?;";
    db.query(sqlDelete, [NOCName], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted!");
        }
    })
})

app.post("/api/update", (require, response) => {
    const NOCName = require.body.NOCName;
    const attribute = require.body.attribute;
    const value = require.body.value;

    const sqlUpdate = `UPDATE NOC SET ${attribute} = ? WHERE NOCName = ?;`;
    db.query(sqlUpdate, [value, NOCName], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Updated!");
        }
    })
})

// app.get("/api/search", (require, response) => {
//     const table = require.body.table;
//     const keyword = require.body.keyword;
// });

app.listen(3002, () => {
    console.log("running on port 3002");
})