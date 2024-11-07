const express = require('express')
const router = express.Router()

router.get("/get", (req, res) => {
    console.log("Form Get")
    res.send("Form Get")
})

router.post("/submit", (req, res) => {
    console.log("Form Submit")
    res.json({"Status": true})
})

module.exports = router