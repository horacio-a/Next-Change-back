const { route } = require('../routes')
var pool = require('./db')

async function getLastRegistroHorario() {
    try {
        var query = 'select * from registro_horarios limit 1'
        var rows = await pool.query(query)
        return rows
    } catch (error) {
        console.log(error)
    }
}


async function deleteRegistroshorarios() {
    try {
        var query = 'delete from registro_horarios'
        var rows = await pool.query(query)
    } catch (error) {
        console.log(error)
    }
}

async function insertRegistroHorario(obj) {
    try {
        var query = 'insert into registro_horarios set ?';
        var rows = await pool.query(query, [obj])
        console.log(rows)
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getMonedas() {
    try {
        var query = 'select * from data'
        var rows = await pool.query(query)
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getMonedasFromID(code) {
    try {
        var query = 'select * from data where code = ?'
        var rows = await pool.query(query, [code])
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getIndexData() {
    try {
        var query = `select * from data where code = ' EUR' OR code =' AED' OR code =' BRL' OR code =' GBP' `
        var rows = await pool.query(query)
        console.log(rows)
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getMonedasConver(div1, div2, amount) {
    try {
        var query = `select * from data where code = '${div1}' OR code = '${div2}'`
        var rows = await pool.query(query)

        if (rows[0].code === div1) {

            return {
                conversion: rows[0].value / rows[1].value * amount,
                conversionUnidad: rows[0].value / rows[1].value
            }
        } else {
            return {
                conversion: rows[1].value / rows[0].value * amount,
                conversionUnidad: rows[1].value / rows[0].value
            }
        }

    } catch (error) {
        console.log(error)
    }
}


async function deleteMonedas() {
    try {
        var query = 'delete from data'
        var rows = await pool.query(query)
    } catch (error) {
        console.log(error)
    }
}

async function insertMonedas(query) {
    try {

        var rows = await pool.query(query)
        console.log(rows)
        return rows
    } catch (error) {
        console.log(error)
    }
}


async function insertInfo(obj) {
    try {
        var query = 'insert into info set ?'
        var rows = await pool.query(query, [obj])
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getInfo() {
    try {
        var query = 'select * from info'
        var rows = await pool.query(query)
        return rows
    } catch (error) {
        console.log(error)
    }
}


async function deleteAllInfo() {
    try {
        var query = 'delete from info'
        var rows = await pool.query(query)
    } catch (error) {
        console.log(error)
    }
}


async function getNamebyid(code) {
    try {
        var query = 'select * from info where code = ?'
        var rows = await pool.query(query, [code])
        return rows
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getIndexData, getMonedasConver, getNamebyid, getInfo, deleteAllInfo, insertInfo, getMonedasFromID, insertMonedas, getLastRegistroHorario, insertRegistroHorario, deleteRegistroshorarios, getMonedas, deleteMonedas }