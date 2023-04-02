const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'heeheehawhaw011',
    database:'whatif',
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/insert", (require, response) => {
    // const NOCName = require.body.NOCName;
    // const ranking = require.body.ranking;
    // const weightedRanking = require.body.weightedRanking;
    // const goldMedalCount = require.body.goldMedalCount;
    // const silverMedalCount = require.body.silverMedalCount;
    // const bronzeMedalCount = require.body.bronzeMedalCount;
    // const totalMedalCount = require.body.totalMedalCount;

    const sqlInsert = "INSERT INTO `NOC` (`NOCName`,`ranking`,`weightedRanking`,`goldMedalCount`,`silverMedalCount`,`bronzeMedalCount`,`totalMedalCount`) VALUES ('Test',0,0,0,0,0,0);";
    db.query(sqlInsert, (err, result) => {
        response.send("Hello world!!!");
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})