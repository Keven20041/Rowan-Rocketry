const express = require('express')
const router = express.Router()
const database = require('../database')

router.get("/get", (req, res) => {
    console.log("Form Get")
    res.send("Form Get")
})

router.post("/submit", (req, res) => {
    console.log("Form Submit")

    // TODO: Reorganize code
    if (req.body.type == "SponsorInfo") {
        var query = `INSERT INTO SponsorInfos() VALUES ('Placeholder', 'Test)`
        database.query(query, (err, result) => {
            if (err) {
                console.error("Error executing query: " + err.stack)
                res.status(500).send({"status": false, "error": "Error sending data"})
                return
            }
            res.status(201).send("OK")
        })
    } else if (req.body.type == "SponsorDonation") {
        var query = `INSERT INTO SponsorDonations() VALUES ('Placeholder', 'Test)`
        database.query(query, (err, result) => {
            if (err) {
                console.error("Error executing query: " + err.stack)
                res.status(500).send({"status": false, "error": "Error sending data"})
                return
            }
            res.status(201).send("OK")
        })
    } else if (req.body.type == "Email") {
        var query = `INSERT INTO Emails(email) VALUES (` + req.body.input.email + `)`
        database.query(query, (err, result) => {
            if (err) {
                console.error("Error executing query: " + err.stack)
                res.status(500).send({"status": false, "error": "Error sending data"})
                return
            }
            res.status(201).send("OK")
        })
    } else {
        res.status(400).send("Bad Request")
    }
})

module.exports = router