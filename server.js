const path = require('path')
const express = require("express")
const app = express()

const formRouter = require("./routers/forms")

// Site visits logger
app.use((req, res, next) => {
    console.log("Visit on " + req.originalUrl + " from ip address " + req.socket.remoteAddress)
    next()
})

// Sets up folder to serve static files, allows urls to omit the html and htm extension
app.use(express.static('public', {extensions: ['html', 'htm']}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Obscures index.html as root
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// Forms handling
app.use("/forms", formRouter)

// Test
app.get("/test.express", (req, res) => {
    console.log("Visit");
    res.status(500).json( { message: "Error"} )
})

// When file not found
app.use((req, res, next) => {
    console.log("404 on " + req.url + " from ip address " + req.socket.remoteAddress)
    res.status(404).sendFile(path.join(__dirname, '404.html'))
})

// Error handling
app.use((err, req, res, next) => {
    console.log("Error!")
    next(err) // add error handling page here
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})