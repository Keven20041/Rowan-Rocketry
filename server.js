const express = require("express")
const app = express()

// Sets up folder to serve static files
app.use(express.static('public'));

// Obscures index.html as root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/test.express", (req, res) => {
    console.log("Visit")
    res.send("Hi")
})

app.listen(3000)