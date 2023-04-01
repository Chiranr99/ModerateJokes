const axios = require('axios')
const db = require("../models")
//const { customer, purchase, invoice } = require("../models")
    //const customers = require("../controllers/customer.controller.js")
// const Invoice = db.invoice
// const Customer = db.customer
// const Item = db.item
// const Purchase = db.purchase
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
                message: err.message || "Some error occurred while creating the moderate data"
            })
        })
}


exports.findAll = (req, res) => {
    Moderate.find({ _active: true })
    .then(data => {
console.log(data)
if (data) {
    axios
  .get(dbLinks.getAllJokesUrl,{responseType: "json"})
  .then(function (response) {
    //console.log(response.data);
    res.send(response.data);
  });
} else 
    res.send(true)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the joke via axios."
        })
    })
   
}

exports.moderateAccept = (req, res) => {
    const Id = req.params.SId;
    Moderate.find({ _active: true })
    .then(data => {
console.log(data)
if (data) {
    
    axios.put(dbLinks.moderateSuccessUrl + Id ,{responseType: "json"})
    axios.get(dbLinks.getonejoke+Id)
  .then(function (response) {
    //console.log(response.data);
    res.send(response.data);
  });
} else 
    res.send(true)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while approving the joke via axios."
        })
    })
   
}

exports.moderateReject = (req, res) => {
    const Id = req.params.SId;
    Moderate.find({ _active: true })
    .then(data => {
console.log(data)
if (data) {
    axios
  .put(dbLinks.deleteJokeUrl + Id ,{responseType: "json"})
  .then(function (response) {
    //console.log(response.data);
    res.send(response.data);
  });
} else 
    res.send(true)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while rejecting the joke via axios."
        })
    })
   
}