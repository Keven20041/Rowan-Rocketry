const express = require("express")
const app = express()

app.get("/test.express", (req, res) => {
    console.log("Visit")
    res.send("Hi")
})

app.listen(3000)