const path = require('path')
const express = require("express")
const app = express()

// Attempt to load the forms router (may depend on DB). If it fails, continue without it.
let formRouter
try {
    formRouter = require("./routers/forms")
} catch (err) {
    console.warn('Could not load forms router at startup:', err && err.message ? err.message : err)
}

// Try database connectivity check (non-blocking). Server will continue to start even if DB is unavailable.
try {
    const db = require('./database')
    db.testConnection()
        .then(() => console.log('MySQL connection successful'))
        .catch((err) => console.warn('MySQL connection failed at startup (continuing without DB):', err && err.message ? err.message : err))
} catch (err) {
    console.warn('Database module not available or failed to load:', err && err.message ? err.message : err)
}

// Set view engine as ejs for rendering dynamic webpages
app.set("view engine", "ejs")

// Site visits logger
app.use((req, res, next) => {
    console.log("Visit on " + req.originalUrl + " from ip address " + req.headers["x-forwarded-for"])
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
    res.render(__dirname + "/views/index.ejs", {formsuccess: req.query.success})
}
app.get("/", index)
app.get("/index", index)
app.get("/index.html", index)

function sponsorship(req, res) {
    res.render(__dirname + "/views/sponsorship.ejs", {formsuccess: req.query.success, formtype: req.query.type})
}
app.get("/sponsorship", sponsorship)
app.get("/sponsorship.html", sponsorship)

app.use("*.ejs", (req, res) => {
    console.log("Blocked access to ejs file " + req.url + " from ip address" + req.headers["x-forwarded-for"])
    res.status(404).sendFile(path.join(__dirname, '404.html'))
})

// Sets up folder to serve static files, allows urls to omit the html and htm extension
app.use(express.static('public', {extensions: ['html', 'htm']}))

// Obscures index.html as root
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// Forms handling (only attach if the router loaded successfully)
if (formRouter) {
    app.use("/forms", formRouter)
} else {
    console.warn('Forms routes are disabled because the router failed to load at startup.')
}

// Test
app.get("/test.express", (req, res) => {
    console.log("Visit");
    res.status(500).json( { message: "Error"} )
})

// When file not found
app.use((req, res, next) => {
    console.log("404 on " + req.url + " from ip address " + req.headers["x-forwarded-for"])
    res.status(404).sendFile(path.join(__dirname, '404.html'))
})

// Error handling
app.use((err, req, res, next) => {
    console.log("Error!")
    next(err) // add error handling page here
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000")
})

const shutdown = () => {
    console.log("Shutting down...");
    server.close(() => {
        console.log("Server closed. Cleanup complete.");
        process.exit(0);
    });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);