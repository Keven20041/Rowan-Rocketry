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
    // TODO: Validate input
    if (req.params.type == "sponsorinfo") {
        console.log("Form Submit SponsorInfo")
        var query = `INSERT INTO SponsorInfos() VALUES (` +
        + database.escape(req.body["org-name"]) + `,`
        + database.escape(req.body["contact-name"]) + `,`
        + database.escape(req.body.address) + `,`
        + database.escape(req.body.phone) + `,`
        + database.escape(req.body.email) + `,`
        + database.escape(req.body.contribution) + `)`
        console.log("SQL Query: " + query)
        database.query(query, (err, result) => {
            if (err) {
                console.error("Error executing query: " + err.stack)
                res.redirect("/sponsorship.html/?type=info&success=true#sponsor-form")
                return
            }
            res.redirect("/sponsorship.html/?type=info&success=true#sponsor-form")
        })
    } else if (req.params.type == "sponsordonation") {
        console.log("Form Submit SponsorDonation")
        var query = `INSERT INTO SponsorDonations() VALUES (` +
        + database.escape(req.body["org-name"]) + `,`
        + database.escape(req.body["contact-name"]) + `,`
        + database.escape(req.body.phone) + `,`
        + database.escape(req.body.email) + `,`
        + database.escape(req.body.contribution) + `,`
        + database.escape(req.body.message) + `)`
        console.log("SQL Query: " + query)
        database.query(query, (err, result) => {
            if (err) {
                console.error("Error executing query: " + err.stack)
                res.redirect("/sponsorship.html/?type=donation&success=false#sponsor-form")
                return
            }
            res.redirect("/sponsorship.html/?type=donation&success=true#sponsor-form")
        })
    } else if (req.params.type == "email") {
        console.log("Form Submit Email")
        var query = `INSERT INTO Emails(email) VALUES (` + database.escape(req.body.email) + `)`
        console.log("SQL Query: " + query)
        database.query(query, (err, result) => {
            // TODO: Add a case for duplicate emails
            if (err) {
                console.error("Error executing query: " + err.stack)
                res.redirect("/?success=false#newsletter")
                return
            }
            res.redirect("/?success=true#newsletter")
        })
    } else {
        console.log("Form Submit Bad Request type: " + req.params.type)
        res.status(400).send("Bad Request")
    }
})

module.exports = router