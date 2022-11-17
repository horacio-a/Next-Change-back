var express = require('express');
var router = express.Router();
var monedas = require('./../models/monedas')
var axios = require('axios')

/* GET users listing. */
router.get('/', async function(req, res, next) {
 

    axios.get('http://localhost:3000/users').then(response => {
        var moneda =  response.data
        res.json(moneda)

      })
});

module.exports = router;
