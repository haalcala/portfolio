const { LogUserTemp } = require('./services/UserTemp')

const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')

const app = express()
const port = 8888

app.use(compression())

app.use(bodyParser.json())

app.use(express.static('public'));

app.post('/api/v1/user_temp', async (req, res, next) => {
    try {
        console.log("req:", req.body)

        const {name, temperature, symptomatic, in_contact} = req.body

        await LogUserTemp(name, temperature, symptomatic, in_contact)
        
        res.send({success:true})        
    }
    catch (e) {
        console.log("================== e:", e)
        next(e)
    }
})

app.use((err, req, res, next) => {
    console.log("Middleware 1 called. err:", err)
    console.log(req.path)

    if (err) {
        res.send(500, {error_code: err.code || 500, error_message: err.message || "Unknown error occurred."})
    }

    // next(err) // calling next middleware function or handler
  })

app.listen(port, (err) => {
    console.log(`Example app listening on port ${port}`, err)
})