const path = require('path')
const express = require("express")
const app = express()

const formRouter = require("./routers/forms")

// Set view engine as ejs for rendering dynamic webpages
app.set("view engine", "ejs")

// Site visits logger
app.use((req, res, next) => {
    console.log("['x-real-ip']: " + req.headers["x-real-ip"])
    console.log("['x-forwarded-for']: " + req.headers["x-forwarded-for"])
    console.log("Visit on " + req.originalUrl + " from ip address " + req.socket.remoteAddress)
    next()
})

// Allows usage of encoded urls and json
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Pass query and originalUrl to use in EJS
app.use((req, res, next) => {
    res.locals.query = req.query
    res.locals.url = req.originalUrl
    next()
})

// Set up dynamic page for index
function index(req, res) {
    res.render(__dirname + "/public/index.ejs", {formsuccess: req.query.success})
}
app.get("/", index)
app.get("/index", index)
app.get("/index.html", index)

function sponsorship(req, res) {
    res.render(__dirname + "/public/sponsorship.ejs", {formsuccess: req.query.success, formtype: req.query.type})
}
app.get("/sponsorship", sponsorship)
app.get("/sponsorship.html", sponsorship)

app.use("*.ejs", (req, res) => {
    console.log("['x-real-ip']: " + req.headers["x-real-ip"])
    console.log("['x-forwarded-for']: " + req.headers["x-forwarded-for"])
    console.log("Blocked access to ejs file " + req.url + " from ip address" + req.socket.remoteAddress)
    res.status(404).sendFile(path.join(__dirname, '404.html'))
})

// Sets up folder to serve static files, allows urls to omit the html and htm extension
app.use(express.static('public', {extensions: ['html', 'htm']}))

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
    console.log("['x-real-ip']: " + req.headers["x-real-ip"])
    console.log("['x-forwarded-for']: " + req.headers["x-forwarded-for"])
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