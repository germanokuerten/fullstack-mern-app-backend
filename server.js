// Dependencies

require("dotenv").config()

const PORT = process.env.PORT || 3001
const express = require("express")
const app = express()

// Routes

app.get("/", (req, res) => {
    res.send("App is active")
})

// Listener

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})