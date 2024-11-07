const express = require('express')
const router = express.Router()
const database = require('../database')

router.get("/get", (req, res) => {
    console.log("Form Get")
    res.send("Form Get")
})

router.post("/submit", (req, res) => {
    console.log("Form Submit")

    if (req.body.type == "information") {
        database.query("", (err, result) => {
            if (err) {
                console.error("Error executing query: " + err.stack)
                res.status(500).send({"status": false, "error": "Error sending data"})
                return
            }
            res.status(201).json({"status": true})
        })
    } else if (req.body.type == "donation") {
        database.query("", (err, result) => {
            if (err) {
                console.error("Error executing query: " + err.stack)
                res.status(500).send({"status": false, "error": "Error sending data"})
                return
            }
            res.status(201).json({"status": true})
        })
    } else {
        res.status(400).send("Bad Request")
    }
})

module.exports = router