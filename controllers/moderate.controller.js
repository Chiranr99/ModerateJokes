

const axios = require('axios')
const db = require("../models")
const Moderate = db.moderate
const dbLinks = require("../config/db.config.js")
const { response } = require('express')

exports.create = (req, res) => {

    const moderate = new Moderate({
        _active: true
    })

    moderate
        .save(moderate)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error"
            })
        })
}


exports.findAll = (req, res) => {
    Moderate.find({ _active: true })
    .then(data => {
console.log(data)
if (data) {
    axios
  .get(dbLinks.getAllJokes,{responseType: "json"})
  .then(function (response) {
    res.send(response.data);
  });
} else 
    res.send(true)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error"
        })
    })
   
}

exports.Accept = (req, res) => {
    const Id = req.params.SId;
    Moderate.find({ _active: true })
    .then(data => {
console.log(data)
if (data) {
    
    axios.put(dbLinks.moderateSuccess + Id ,{responseType: "json"})
    axios.get(dbLinks.getonejoke+Id)
  .then(function (response) {
    res.send(response.data);
  });
} else 
    res.send(true)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "error"
        })
    })
   
}

exports.Reject = (req, res) => {
    const Id = req.params.SId;
    Moderate.find({ _active: true })
    .then(data => {
console.log(data)
if (data) {
    axios
  .put(dbLinks.deleteJoke + Id ,{responseType: "json"})
  .then(function (response) {
    //console.log(response.data);
    res.send(response.data);
  });
} else 
    res.send(true)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error"
        })
    })
   
}