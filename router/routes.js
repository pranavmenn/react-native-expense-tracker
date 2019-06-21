const Data = require("../models/Data");
const User = require("../models/users");
const UserSession = require("../models/UserSession");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());

const router = express.Router();

app.use(bodyParser.json());

//Register
router.route("/register").post(function(req, res) {
  const { body } = req;
  const { username, password } = body;
  User.find(
    {
      username: username
    },
    (err, previousUsers) => {
      if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Account already exists"
        });
      }

      const newUser = new User();
      newUser.username = username;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server Error"
          });
        }
        return res.send({
          success: true,
          message: "Signed up"
        });
      });
    }
  );
});

//Login
router.route("/login").post(function(req, res) {
  const { body } = req;
  const { username, password } = body;

  User.find({ username: username }, (err, users) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: server Error"
      });
    }
    if (users.length != 1) {
      return res.send({
        success: false,
        message: "Invalid Login"
      });
    }
    user = users[0];

    if (!user.validPassword(password)) {
      return res.send({
        success: false,
        message: "Invalid Login"
      });
    } else {
      const JWTToken = jwt.sign(
        {
          username: user.username,
          _id: user._id
        },
        "secret",
        {
          expiresIn: "2h"
        }
      );

      return res.send({
        success: true,
        message: "Valid Login",
        token: JWTToken
      });
    }
  });
});

//not being used

//User sessions

router.route("/userSession").post(function(req, res) {
  const { body } = req;
  const { username } = body;
  UserSession.find(
    {
      username: username
    },
    (err, previousUsers) => {
      if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Already logged in"
        });
      }

      const newSession = new UserSession();
      newSession.username = username;
      newSession.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server Error"
          });
        }
        return res.send({
          success: true,
          message: "Session logged"
        });
      });
    }
  );
});

//Check sessions
router.route("/checkSession/:id").get(function(req, res) {
  UserSession.findOne({ username: req.params.id }, function(err, data) {
    if (!data) {
      return res.send({
        success: false,
        message: "Session Not found"
      });
    } else {
      return res.send({
        success: true,
        message: "Session Found"
      });
    }
  });
});
//end of not being used

//Logout
router.route("/logout/:id").get(function(req, res) {
  UserSession.findOneAndDelete({ username: req.params.id }, function(
    err,
    username
  ) {
    if (err) res.json(err);
    else {
      return res.send({
        success: true,
        message: "Logout Successful"
      });
    }
  });
});

/*****************************CRUD*****************************************/
//Create
router.route("/putDataToDB/:id").post(function(req, res) {
  let data = new Data();
  data.userId = req.params.id;
  data.date = req.body.date;
  data.sno = req.body.sno;
  data.name = req.body.name;
  data.amount = req.body.amount;
  data
    .save()
    .then(game => {
      res.status(200).json({ expense: "Expense Added Successfully" });
    })
    .catch(err => {
      res.status(400).send("Adding failed");
    });
});

//Read
router.route("/getData/:id").get(function(req, res) {
Data.find({ userId: req.params.id }).sort().limit(5).exec(function(err,expense){
  if(err)
    res.send(err);
  res.json(expense);

})
});

//Delete

router.route("/deleteData/:id").get(function(req, res) {
  Data.findByIdAndRemove({ _id: req.params.id }, function(err, expense) {
    if (err) res.json(err);
    else res.json("Expense deleted");
  });
});

//Update
router.route("/edit/:id").post(function(req, res) {
  Data.findById(req.params.id, function(err, data) {
    if (!data) res.status(404).send("data is not found");
    else {
      data.name = req.body.name;
      data.amount = req.body.amount;

      data
        .save()
        .then(data => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

module.exports = router;
