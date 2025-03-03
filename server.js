//Load env variables
require("dotenv").config()

// import dependancy
const express = require("express");
const connect = require("./config/connection");
// const Note = require('./models/note');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const requireAuth = require("./middleware/requireAuth");
const controller = require("./controller/noteController");
const userController = require("./controller/userController");

//create an express app
const app = express();

//configure express app
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:true,
    credentials:true,
})
); 

//connect to db
connect();

//Routing
app.post("/login",userController.login);

app.post("/signup",userController.signup);

app.get("/logout",userController.logout);

app.get("/note",controller.fetchNotes);

app.get("/note/:id",controller.fetchNotesById);

app.post("/note",controller.createNote);

app.put("/note/:id",controller.updateNote);

app.delete("/note/:id",controller.deleteNote);

app.get("/checkAuth", requireAuth, userController.checkAuth);

//start our server
app.listen(process.env.port);