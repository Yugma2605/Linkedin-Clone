//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://Yugma:LwFQ8DTq1Q1C8WDl@cluster0.msx2imj.mongodb.net/LinkedinDB");

const userSchema = new mongoose.Schema({
    userID: String,
    firstName: String,
    lastName: String,
    Email: String,
    Password: String,
    ProfilePicture: String,
    Bio: String,
    Company: String,
    Position: String,
    Location: String,
    Education: String,
    ConnectionStatus: String
});

const User = new mongoose.model("User",userSchema);

const test_user = new User(
    {
        userID: "1",
    firstName: "John",
    lastName: "Doe",
    Email: "john.doe@example.com",
    Password: "hashed_password",
    ProfilePicture: "path/to/profile_picture.jpg",
    Bio: "A brief bio about John...",
    Company: "XYZ Corp",
    Position: "Software Engineer",
    Location: "City, Country",
    Education: "University of XYZ, Computer Science, Software Engineering, 2020",
    ConnectionStatus: "Connected"
}
);

// test_user.save()
// .then(() => {
//     console.log("User saved");
// })
// .catch((err) => {
//     console.log(err);
// });
// TODO

app.get("/users",async function(req,res){
    try{
        const user_data = await User.find();
        res.send(user_data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});