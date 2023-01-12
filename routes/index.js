var express = require('express');
var router = express.Router();
/* GET home page. */
var monedas = require('./../models/monedas')
var axios = require('axios');
const { response } = require('express');


router.get('/all/:token', async function (req, res, next) {

  var token = req.params.token
  var noAutheticator = 'error'

  try {

    if (token == process.env.apiKey) {

      var today = new Date();

      async function mostrarDatos() {
        var datos = await monedas.getMonedas()
        return res.json(datos)
      }

      async function cargarDatos() {
        monedas.deleteMonedas()
        monedas.deleteRegistroshorarios()


        var mes = today.getMonth()
        var dia = today.getDate()
        var hora = today.getHours()
        var minuto = today.getMinutes()
        var segundo = today.getSeconds()



        monedas.insertRegistroHorario({
          dia,
          mes,
          hora,
          minuto,
          segundo
        })
        var moneda = await axios.get(`https://api.currencyapi.com/v3/latest?apikey=${process.env.currencyapikey}&base_currency=USD`).then(response => { return response.data })
        for (var property in moneda.data) {
          code = ` ${moneda.data[property].code}`
          value = `${moneda.data[property].value}`
          monedas.insertMonedas({
            code,
            value
          });
        }


        return mostrarDatos()


      }


      var registro = await monedas.getLastRegistroHorario()


      if (registro[0] == undefined) {
        console.log('1')
        cargarDatos()
      } else {
        if (registro[0].dia != today.getDate() || registro[0].mes != today.getMonth()) {
          console.log('3')
          cargarDatos()
        } else if ((today.getHours() - registro[0].hora) >= 6) {
          console.log('4')
          cargarDatos()
        } else {
          console.log('5')
          mostrarDatos()
        }
      }


    } else {
      res.json({
        noAutheticator
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      error: error
    })
  }

});

router.get('/info/:token', async function (req, res, next) {
  token = req.params.token
  var noAutheticator = 'error'
  if (token == process.env.apiKey) {
    var info = await monedas.getInfo()
    res.json(info)

  } else {
    res.json({
      noAutheticator
    })
  }
})



router.get('/conver/:from/:to/:amount/:token', async function (req, res, next) {
  const token = req.params.token
  const from = req.params.from
  const to = req.params.to
  const amount = req.params.amount
  var today = new Date()


  async function setValores() {

    const div1 = await monedas.getMonedasFromID(to)
    const div2 = await monedas.getMonedasFromID(from)



    try {
      const conversion = ((div1[0].value / div2[0].value) * amount)
      const conversionUnidad = (div1[0].value / div2[0].value)

      if (token == process.env.apiKey) {

        res.json({
          conversion,
          conversionUnidad
        })

      } else {
        var noAutheticator = 'error'
        res.json({
          noAutheticator
        })
      }

    } catch (error) {
      let conversion = 'error'
      let conversionUnidad = 'error'
      res.json({
        conversion,
        conversionUnidad
      })
    }


  }






  async function cargarDatos() {
    monedas.deleteMonedas()
    monedas.deleteRegistroshorarios()

    var mes = today.getMonth()
    var dia = today.getDate()
    var hora = today.getHours()
    var minuto = today.getMinutes()
    var segundo = today.getSeconds()



    monedas.insertRegistroHorario({
      dia,
      mes,
      hora,
      minuto,
      segundo
    })



    var moneda = await axios.get(`https://api.currencyapi.com/v3/latest?apikey=${process.env.currencyapikey}&base_currency=USD`).then(response => { return response.data })
    for (var property in moneda.data) {
      code = ` ${moneda.data[property].code}`
      value = `${moneda.data[property].value}`
      monedas.insertMonedas({
        code,
        value
      });
    }




    return await setValores()



  }
  var registro = await monedas.getLastRegistroHorario()

  if (registro[0] == undefined) {
    cargarDatos()
  } else {
    if (registro[0].dia != today.getDate() || registro[0].mes != today.getMonth()) {
      cargarDatos()
    } else if ((today.getHours() - registro[0].hora) >= 6) {
      cargarDatos()
    } else {
      setValores()
    }
  }



});


router.get('/especificall/:to/:amount/:token', async function (req, res, next) {
  try {
    const to = req.params.to
    const amount = req.params.amount

    const divisa1 = await monedas.getMonedasFromID(to)
    const Valuedivisa = divisa1[0].value
    const resultado = []
    var info = await axios.get(`https://api.next-change.com.arinfo/${process.env.apiKey} `).then(response => { return response.data })




    var moneda = await axios.get(`https://api.next-change.com.ar/all/${process.env.apiKey} `).then(response => { return response.data })
    for (var property in moneda) {

      let codigo = moneda[property].code




      for (var i in info) {

        if (info[i].code === codigo) {
          var name = info[i].name
          var symbol_native = info[i].symbol_native

          break
        }
        if (info[i].name === null) {
          var name = ''
          var symbol_native = ''

        }


      }

      var code = moneda[property].code
      var value = ((moneda[property].value / Valuedivisa) * amount)
      var ID = moneda[property].ID

      if (code != to) {
        if (name != '')
          resultado.push(
            {
              ID,
              code,
              value,
              name,
              symbol_native
            })
      }

    }



    // }

    res.json(
      resultado
    )
  } catch (error) {
    console.log(error)
    let conversion = 'error'
    let conversionUnidad = 'error'
    res.json({
      conversion,
      conversionUnidad
    })
  }

})

router.get('/dataindex/:token', async function (req, res, next) {
  token = req.params.token
  var error = 'noAutheticator'
  if (token == process.env.apiKey) {


    const EUR = await monedas.getMonedasFromID(' EUR')
    const AED = await monedas.getMonedasFromID(' AED')
    const BRL = await monedas.getMonedasFromID(' BRL')
    const GBP = await monedas.getMonedasFromID(' GBP')

    const UsdEur = EUR[0].value
    const UsdAed = AED[0].value
    const UsdBrl = BRL[0].value
    const EurGBp = EUR[0].value / GBP[0].value



    res.json({
      UsdEur,
      UsdAed,
      UsdBrl,
      EurGBp
    })




  } else {
    res.json({
      error
    })
  }
})


module.exports = router;
