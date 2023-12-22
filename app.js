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


const url="mongodb+srv://Yugma:LwFQ8DTq1Q1C8WDl@cluster0.msx2imj.mongodb.net/LinkedinDB"
// mongoose.connect(url).then((data)=>{
//   console.log('MongoDB Connected');
// });

async function connectToMongoDB() {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

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

const connectionSchema = new mongoose.Schema({
  ConnectionID: String,
  UserID1: String,
  UserID2: String,
  ConnectionDate: Date
});

const User = new mongoose.model("User",userSchema);
const Connection = mongoose.model("Connection",connectionSchema);

connectToMongoDB();

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
  apis: ["./*.js"],
};

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API operations related to users
 *   - name: Connections
 *     description: API operations related to connections
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
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
*     tags: [Users]
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

/**
* @swagger
* /users/{userid}:
*   patch:
*     summary: Update a user by ID
*     tags: [Users]
*     parameters:
*       - in: path
*         name: userid
*         required: true
*         description: ID of the user to update
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           example:
*             fieldName: "new value"
*     responses:
*       '200':
*         description: Successful update
*         content:
*           application/json:
*             example:
*               n: 1
*               nModified: 1
*               ok: 1
*       '404':
*         description: User not found
*         content:
*           application/json:
*             example:
*               message: User not found
*       '500':
*         description: Internal Server Error
*         content:
*           application/json:
*             example:
*               error: Internal Server Error
*/
.patch("/users/:userid", async (req,res) => {
try{
  const data = await User.updateOne(
      {userID:req.params.userid},
      {$set:req.body},
  );
  console.log(data);
  res.send(data);
}
catch(error) {
  console.error(error);
}
});

/**
 * @swagger
 * /connections:
 *   get:
 *     summary: Get all connections
 *     description: Retrieve a list of all connections.
 *     tags: [Connections]
 *     responses:
 *       200:
 *         description: Successful response with an array of connections.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 {
 *                   _id: "5f82d9a7128ec24d201594d0",
 *                   // Other connection properties
 *                 },
 *                 // Additional connections...
 *               ]
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Internal Server Error" }
 */
app.get('/connections', async (req, res) => {
  try {
    const connections = await Connection.find();
    res.send(connections);
  } catch (error) {
      console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

/**
 * @swagger
 * /connections:
 *   post:
 *     summary: Create a new connection
 *     description: Create a new connection with the provided data.
 *     tags: [Connections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your connection properties here
 *               property1:
 *                 type: string
 *               property2:
 *                 type: number
 *             example:
 *               property1: "value1"
 *               property2: 123
 *     responses:
 *       200:
 *         description: Successful response with the created connection.
 *         content:
 *           application/json:
 *             example:
 *               _id: "5f82d9a7128ec24d201594d0"
 *               // Other connection properties
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Internal Server Error" }
 */
.post('/connections', async (req, res) =>{
  try {
      const newConnection = new Connection(req.body);
      await newConnection.save();
      res.send(newConnection);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /connections/{id}:
 *   get:
 *     summary: Get a connection by ID
 *     description: Retrieve a connection by its unique identifier.
 *     tags: [Connections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the connection to retrieve.
 *         schema:
 *           type: string
 *         example: 5f82d9a7128ec24d201594d0
 *     responses:
 *       200:
 *         description: Successful response with the requested connection.
 *         content:
 *           application/json:
 *             example:
 *               _id: "5f82d9a7128ec24d201594d0"
 *               // Other connection properties
 *       404:
 *         description: Connection not found.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Connection not found" }
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Internal Server Error" }
 */
app.get('/connections/:id', async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id);
    if (!connection) {
      return res.status(404).json({ error: 'Connection not found' });
    }
    res.send(connection);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

/**
 * @swagger
 * /connections/{id}:
 *   put:
 *     summary: Update a connection by ID
 *     description: Update a connection with the provided data using its unique identifier.
 *     tags: [Connections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the connection to update.
 *         schema:
 *           type: string
 *         example: 5f82d9a7128ec24d201594d0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ConnectionID:
 *                 type: string
 *               ConnectionDate:
 *                 type: string
 *                 format: date  # You can adjust the format based on your requirements
 *               UserID1:
 *                 type: string
 *               UserID2:
 *                 type: string
 *             example:
 *               ConnectionID: "newID"
 *               ConnectionDate: "2023-01-01"
 *               UserID1: "user1"
 *               UserID2: "user2"
 *     responses:
 *       200:
 *         description: Successful response with the updated connection.
 *         content:
 *           application/json:
 *             example:
 *               n: 1  // Number of documents matched and modified (may vary based on your MongoDB version)
 *       404:
 *         description: Connection not found.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Connection not found" }
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Internal Server Error" }
 */
.put('/connections/:id', async (req, res) => {
  try {
      console.log("nice");
    const updatedConnection = await Connection.updateOne(
      {ConnectionID:req.params.id},
      {ConnectionID:req.body.ConnectionID,
          ConnectionDate:req.body.ConnectionDate,
          UserID1:req.body.UserID1,
          UserID2:req.body.UserID2
      },
      { overwrite:true }
    );
    if (!updatedConnection) {
      return res.status(404).json({ error: 'Connection not found' });
    }
    res.send(updatedConnection);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /connections/{id}:
 *   patch:
 *     summary: Update a connection partially by ID
 *     description: Update a connection partially with the provided data using its unique identifier.
 *     tags: [Connections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the connection to update.
 *         schema:
 *           type: string
 *         example: 5f82d9a7128ec24d201594d0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ConnectionID:
 *                 type: string
 *                 readOnly: true  # Assuming ConnectionID is read-only and cannot be updated
 *               ConnectionDate:
 *                 type: string
 *                 format: date  # You can adjust the format based on your requirements
 *               UserID1:
 *                 type: string
 *               UserID2:
 *                 type: string
 *             example:
 *               ConnectionDate: "2023-01-01"
 *               UserID1: "newUser1"
 *               UserID2: "newUser2"
 *     responses:
 *       200:
 *         description: Successful response with the updated connection.
 *         content:
 *           application/json:
 *             example:
 *               n: 1  // Number of documents matched and modified (may vary based on your MongoDB version)
 *       404:
 *         description: Connection not found.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Connection not found" }
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Internal Server Error" }
 */
app.patch('/connections/:id', async (req, res) => {
  try {
      console.log("Hello");
      const updatedConnection = await Connection.updateOne(
        {ConnectionID:req.params.id},
        {$set:req.body}
      );
      res.send(updatedConnection);
  }
  catch(error) {
      console.error(error);
  }
});

/**
 * @swagger
 * /connections/{id}:
 *   delete:
 *     summary: Delete a connection by ID
 *     description: Delete a connection with the provided ID.
 *     tags: [Connections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the connection to delete.
 *         schema:
 *           type: string
 *         example: 5f82d9a7128ec24d201594d0
 *     responses:
 *       200:
 *         description: Successful response indicating the deletion.
 *         content:
 *           application/json:
 *             example:
 *               n: 1  // Number of documents matched and deleted (may vary based on your MongoDB version)
 *       404:
 *         description: Connection not found.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Connection not found" }
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Internal Server Error" }
 */
app.delete('/connections/:id', async (req, res) => {
  try {
      console.log("Delete");
      Connection.deleteOne({ConnectionID:req.params.id}).then((data)=>{
          console.log(data);
      });
  }
  catch(error) {
      console.error(error);
  }
})


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