const path = require('path')
const express = require("express")
const app = express()

const formRouter = require("./routers/form")

// Sets up folder to serve static files, allows urls to omit the html and htm extension
app.use(express.static('public', {extensions: ['html', 'htm']}))

// Obscures index.html as root
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

app.use("/form", formRouter)

app.get("/test.express", (req, res) => {
    console.log("Visit");
    res.status(500).json({ message: "Error"} )
})

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'))
})

app.use((err, req, res, next) => {
    console.log("Error!")
    next(err) // add error handling page here
})

app.listen(3000)