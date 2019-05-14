///////////////////////////GETTING NEEDED PACKGES AND SAVING THEM////////////
var http = require('http');
var fs = require('fs');
var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;
var mysql = require("mysql");
const path = require('path');
const router = express.Router();


app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json({
  type: 'application/*+json'
}));
app.use(express.static('public'));

///////////////////////////CONNECTING TO LOCAL HOST////////////////////////
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "webuser",
  password: "UCR",
  database: "bridge_the_gap_db"
});
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
/////////////////////////// COLLECTING INFORMATION FROM HTML ////////////////////////
// var http = require('http');
// var fs = require('fs');
/////////////////////////// API ROUTES AND DIRECTION ////////////////////////
router.get("/", function (req, res) {
  console.log("You are on the main page")
  console.log(__dirname);
  res.sendFile(path.join(__dirname + '/public/html/index.html'));

});

// Routing for Individual form
router.get("/indForm", function (req, res) {
  res.sendFile(path.join(__dirname + '/public/html/indForm.html'));
});

// Routing for Agency form -- agencies that have things to supply
router.get("/agencyForm", function (req, res) {
  res.sendFile(path.join(__dirname + '/public/html/agencyForm.html'));
});

// Routing for Agency needing supplies form
router.get("/agencyNeedForm", function (req, res) {
  res.sendFile(path.join(__dirname + '/public/html/agencyNeedForm.html'));
});

// Routing for Community Donator/Volunteer form 
router.get("/commSupplyForm", function (req, res) {
  res.sendFile(path.join(__dirname + '/public/html/commSupplyForm.html'));
});


app.use('/', router);

app.post("/api/homeless", function (req, res) {
  console.log("POST", req.body);
  var sql = "INSERT INTO homeless";
  sql += " (fullName, email, phoneNumber, maillingAddress, catagory, explination, quantity)";
  sql += " VALUES ";
  sql += " (?,?,?,?,?,?,?);";
  connection.query(sql, [
    req.body.fullName,
    req.body.email,
    req.body.phoneNumber,
    req.body.maillingAddress,
    req.body.catagory,
    req.body.explination,
    req.body.quantity
  ], function (err, sqlResult) {
    if (err) {
      console.log("OH DEAR GOD SO MUCH IS GONE BAD!! WHY IS THERE SO MUCH BLOOD??");
      throw err;
    };
    console.log(sqlResult);
    res.json(sqlResult);

  });
});
app.post("/api/agency_supply", function (req, res) {
  console.log("POST", req.body);
  var sql = "INSERT INTO agency_supply";
  sql += " (fullName, email, phoneNumber, maillingAddress, catagory, explination, quantity)";
  sql += " VALUES ";
  sql += " (?,?,?,?,?,?,?);";
  connection.query(sql, [
    req.body.fullName,
    req.body.email,
    req.body.phoneNumber,
    req.body.maillingAddress,
    req.body.catagory,
    req.body.explination,
    req.body.quantity
  ], function (err, sqlResult) {
    if (err) {
      console.log("OH DEAR GOD SO MUCH IS GONE BAD!! WHY IS THERE SO MUCH BLOOD??");
      throw err;
    };
    res.json(sqlResult);
    console.log(sqlResult);
  });
});
app.post("/api/agency_need", function (req, res) {
  console.log("POST", req.body);
  var sql = "INSERT INTO agency_need";
  sql += " (fullName, email, phoneNumber, maillingAddress, catagory, explination, quantity)";
  sql += " VALUES ";
  sql += " (?,?,?,?,?,?,?);";
  connection.query(sql, [
    req.body.fullName,
    req.body.email,
    req.body.phoneNumber,
    req.body.maillingAddress,
    req.body.catagory,
    req.body.explination,
    req.body.quantity
  ], function (err, sqlResult) {
    if (err) {
      console.log("OH DEAR GOD SO MUCH IS GONE BAD!! WHY IS THERE SO MUCH BLOOD??");
      throw err;
    };
    res.json(sqlResult);
    console.log(sqlResult);
  });
});

app.post("/api/volunteer", function (req, res) {
  console.log("POST", req.body);
  var sql = "INSERT INTO volunteer";
  sql += " (fullName, email, phoneNumber, maillingAddress, catagory, explination, quantity)";
  sql += " VALUES ";
  sql += " (?,?,?,?,?,?,?);";
  connection.query(sql, [
    req.body.fullName,
    req.body.email,
    req.body.phoneNumber,
    req.body.maillingAddress,
    req.body.catagory,
    req.body.explination,
    req.body.quantity
  ], function (err, sqlResult) {
    if (err) {
      console.log("OH DEAR GOD SO MUCH IS GONE BAD!! WHY IS THERE SO MUCH BLOOD??");
      throw err;
    };
    res.json(sqlResult);
    console.log(sqlResult);
  });
});

///////////////////////////PART TWO/////////////////////////

app.get("/api/homelessSupply", function (req, res) {
  var sql = "SELECT * FROM agency_supply join homeless where homeless.catagory = agency_supply.catagory;"
  connection.query(sql, function (err, sqlResult) {
    if (err) {
      console.log("OH DEAR GOD SO MUCH IS GONE BAD!! WHY IS THERE SO MUCH BLOOD??");
      throw err;
    };
    res.json(sqlResult);
  });

});

app.get("/api/agencyResponseToSupply", function (req, res) {
  var sql = "SELECT * FROM homeless join agency_supply where homeless.catagory = agency_supply.catagory;"
  connection.query(sql, function (err, sqlResult) {
    if (err) {
      console.log("OH DEAR GOD SO MUCH IS GONE BAD!! WHY IS THERE SO MUCH BLOOD??");
      throw err;
    };
    res.json(sqlResult);
  })
});

app.get("/api/agencyResponseToRequest", function (req, res) {
  var sql = "SELECT * FROM volunteer join agency_need where volunteer.catagory = agency_need.catagory;"
  connection.query(sql, function (err, sqlResult) {
    if (err) {
      console.log("OH DEAR GOD SO MUCH IS GONE BAD!! WHY IS THERE SO MUCH BLOOD??");
      throw err;
    };
    res.json(sqlResult);
  })
});

app.get("/api/volunteerResponseToSupply", function (req, res) {
  var sql = "SELECT * FROM agency_need join volunteer where volunteer.catagory = agency_need.catagory;"
  connection.query(sql, function (err, sqlResult) {
    if (err) {
      console.log("OH DEAR GOD SO MUCH IS GONE BAD!! WHY IS THERE SO MUCH BLOOD??");
      throw err;
    };
    res.json(sqlResult);
  })
});
///////////////////////////LISTENING TO PORT/////////////////////////
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});