const express = require('express')
const router = express.Router()
const database = require('../database')

// TODO: Add a way to get form data from website
router.get("/get", (req, res) => {
    console.log("Form Get")
    res.send("Form Get")
})

router.post("/submit/:type", (req, res) => {
    // TODO: Reorganize code
    if (req.params.type == "sponsorinfo") {
        console.log("Form Submit SponsorInfo")
        var query = `INSERT INTO SponsorInfos() VALUES ('Placeholder', 'Test)`
        database.query(query, (err, result) => {
            if (err) {
                console.error("Error executing query: " + err.stack)
                res.status(500).send({"status": false, "error": "Error sending data"})
                return
            }
            res.status(201).send("OK")
        })
    } else if (req.params.type == "sponsordonation") {
        console.log("Form Submit SponsorDonation")
        var query = `INSERT INTO SponsorDonations() VALUES ('Placeholder', 'Test)`
        database.query(query, (err, result) => {
            if (err) {
                console.error("Error executing query: " + err.stack)
                res.status(500).send({"status": false, "error": "Error sending data"})
                return
            }
            res.status(201).send("OK")
        })
    } else if (req.params.type == "email") {
        console.log("Form Submit Email")
        var query = `INSERT INTO Emails(email) VALUES (` + database.escape(req.body.email) + `)`
        console.log(query)
        database.query(query, (err, result) => {
            // TODO: Add a case for duplicate emails
            if (err) {
                console.error("Error executing query: " + err.stack)
                res.redirect("/?success=false#newsletter")
                return
            }
            res.redirect("/?success=true#newsletter")
        })
        console.log("Email: " + req.body.email)
    } else {
        console.log("Form Submit Bad Request type: " + req.params.type)
        res.status(400).send("Bad Request")
    }
})

module.exports = router