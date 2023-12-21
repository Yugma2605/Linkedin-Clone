//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");
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

// const test_user = new User(
//     {
//         userID: "1",
//     firstName: "John",
//     lastName: "Doe",
//     Email: "john.doe@example.com",
//     Password: "hashed_password",
//     ProfilePicture: "path/to/profile_picture.jpg",
//     Bio: "A brief bio about John...",
//     Company: "XYZ Corp",
//     Position: "Software Engineer",
//     Location: "City, Country",
//     Education: "University of XYZ, Computer Science, Software Engineering, 2020",
//     ConnectionStatus: "Connected"
// }
// );

// test_user.save()
// .then(() => {
//     console.log("User saved");
// })
// .catch((err) => {
//     console.log(err);
// });
// TODO


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: John Doe
 *               - id: 2
 *                 name: Jane Doe
 */
app.get("/users",async function(req,res){
    try{
        const user_data = await User.find();
        res.send(user_data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
})

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: John Doe
 *             email: john@example.com
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: John Doe
 *               email: john@example.com
 */
.post("/users", async (req, res) => {
  try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

.patch("/users/:userid", async (req,res) => {
  try{
    const data = await User.updateOne(
        {userID:req.params.userid},
        {$set:req.body},
    );
    res.send(data);
}
catch(error) {
    console.error(error);
}
})


// app.post("/articles",async function(req,res){
//   const new_article = new article({
//       title: req.body.title,
//       content: req.body.content
//   });
//   new_article.save().then(result => {
//       res.send("Success");
//   });
// })

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});