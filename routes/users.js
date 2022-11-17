var express = require('express');
var router = express.Router();
var monedas = require('./../models/monedas')
var axios = require('axios')

/* GET users listing. */
router.get('/', async function (req, res, next) {
    let code = ' ADA'
    let a = await monedas.getNamebyid(code)
    console.log(a)
    // let as = a[0].name
    if(a != ''){
        console.log(a)

    }else{
        console.log('si')
    }
    res.json( 
        a
       )
    // monedas.deleteAllInfo()

    // var moneda = await axios.get('https://api.currencyapi.com/v3/currencies?apikey=HtKewgMjZxWwPIiVk8koj1FMGEfjhFIUbkjxXRCI&base_currency=USD').then(response => { return response.data })
    // for (var property in moneda.data) {

    //     if(moneda.data[property] == null){
    //         symbol = null
    //         name =null
    //         symbol_native =null
    //         decimal_digits = null
    //         rounding =null
    //         code = null
    //         name_plural = null
    //     }else{
    //         symbol =` ${moneda.data[property].symbol}`
    //         name = ` ${moneda.data[property].name}`.replace('-', ' ')
    //         symbol_native =` ${moneda.data[property].symbol_native}`
    //         decimal_digits = ` ${moneda.data[property].decimal_digits}`
    //         rounding =` ${moneda.data[property].rounding}`
    //         code = ` ${moneda.data[property].code}`
    //         name_plural = `${moneda.data[property].name_plural}`

    //     }


    //     monedas.insertInfo({
    //         symbol,
    //         name,
    //         symbol_native,
    //         decimal_digits,
    //         rounding,
    //         code,
    //         name_plural
    //     });
    // }


    // var hola = 'hola mundo'
    // res.json({
    //     hola
    // })

});

module.exports = router;
