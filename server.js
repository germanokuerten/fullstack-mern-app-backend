// Dependencies
require("dotenv").config()

// Alternative desctructuring method (then get rid of process.env at other lines and get rid of PORT line)
// const { PORT = 3001, DATABASE_URL } = process.env

const PORT = process.env.PORT || 3001
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")


// Database connection
mongoose.connect(process.env.DATABASE_URL)

mongoose.connection
    .on("open", () => console.log("MongoDB Connected"))
    .on("closed", () => console.log("Connection Closed"))
    .on("error", (error) => console.log(error))

// Model
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
})

const People = mongoose.model("People", PeopleSchema)

// Middleware
app.use(cors())
app.use(morgan("dev"))
// You use to have to install body parser, before Express added json method.
app.use(express.json()) // Parse

// Routes
app.get("/", (req, res) => {
    res.send("App is active")
})

// IDUCS

// Index
app.get("/people", async (req, res) => {
    try { 
        // get all people from database
        res.json(await People.find({}))
    } catch (error) {
        // send error to user
        res.status(400).json(error)
    }
})

// Create
app.post("/people", async (req, res) => {
    // run try and then run catch
    try {
        res.json(await People.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Listener
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})