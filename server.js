//Load env variables
require("dotenv").config()

// import dependancy
const express = require("express");
const connect = require("./config/connection");
// const Note = require('./models/note');
const cors = require("cors");
const controller = require('./controller/noteController');

//create an express app
const app = express();

//configure express app
app.use(express.json());
app.use(cors()); 

//connect to db
connect();

//Routing
app.get("/note",controller.fetchNotes);

app.get("/note/:id",controller.fetchNotesById);

app.post("/note",controller.createNote);

app.put("/note/:id",controller.updateNote);

app.delete("/note/:id",controller.deleteNote);

//start our server
app.listen(process.env.port);