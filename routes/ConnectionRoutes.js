const express = require('express');
const router = express.Router();
const ConnectionController = require('../controllers/ConnectionController');
// const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const mongoose = require('mongoose');
// swaggerJsdoc = require("swagger-jsdoc"),
// swaggerUi = require("swagger-ui-express");
// const { Schema } = mongoose;
// const app = express();


router.get('/:id?', ConnectionController.getConnection);

router.post('/',ConnectionController.postConnection);

router.delete('/',ConnectionController.deleteConnection);
// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(express.static("public"));

// const url="mongodb+srv://Yugma:LwFQ8DTq1Q1C8WDl@cluster0.msx2imj.mongodb.net/LinkedinDB"
// // mongoose.connect(url).then((data)=>{
// //   console.log('MongoDB Connected');
// // });

// async function connectToMongoDB() {
//   try {
//     await mongoose.connect(url);
//     console.log("Connected to MongoDB Atlas");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };
// const connectionSchema = new mongoose.Schema({
//     ConnectionID: String,
//     UserID1: String,
//     UserID2: String,
//     ConnectionDate: Date
// });

// const Connection = mongoose.model("Connection",connectionSchema);

// async function saveConnection() {
  
//     try {
//     //     const testConnection = new Connection({
//     //         ConnectionID: "435",
//     //         UserID1: "1",
//     //         UserID2: "2",
//     //         ConnectionDate: new Date(2023, 5, 11, 5)
//     //       });
//     //     //   const y=await Connection.deleteMany({UserID1:"1"});
//     //     //   console.log(y);
//     //   await testConnection.save();
//     //   console.log("Connection saved");
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   // test_user.save()
//   // .then(() => {
//   //     console.log("User saved");
//   // })
//   // .catch((err) => {
//   //     console.log(err);
//   // });
//   // TODO
  
//   async function main() {
//     await connectToMongoDB();
//     await saveConnection();
//   }

//   app.get('/connections', async (req, res) => {
//     try {
//       const connections = await Connection.find();
//       res.send(connections);
//     } catch (error) {
//         console.log(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   })
//   .post('/connections', async (req, res) =>{
//     try {
//         const newConnection = new Connection(req.body);
//         await newConnection.save();
//         res.send(newConnection);
//       } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//   });

//   app.get('/connections/:id', async (req, res) => {
//     try {
//       const connection = await Connection.find({ConnectionID:req.params.id});
//       if (!connection) {
//         return res.status(404).json({ error: 'Connection not found' });
//       }
//       res.send(connection);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   })
// .put('/connections/:id', async (req, res) => {
//     try {
//         console.log("nice");
//       const updatedConnection = await Connection.updateOne(
//         {ConnectionID:req.params.id},
//         {ConnectionID:req.body.ConnectionID,
//             ConnectionDate:req.body.ConnectionDate,
//             UserID1:req.body.UserID1,
//             UserID2:req.body.UserID2
//         },
//         { overwrite:true }
//       );
//       if (!updatedConnection) {
//         return res.status(404).json({ error: 'Connection not found' });
//       }
//       res.send(updatedConnection);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
//   app.patch('/connections/:id', async (req, res) => {
//     try {
//         console.log("Hello");
//         const updatedConnection = await Connection.updateOne(
//           {ConnectionID:req.params.id},
//           {$set:req.body}
//         );
//         res.send(updatedConnection);
//     }
//     catch(error) {
//         console.error(error);
//     }
//   })
//   app.delete('/connections/:id', async (req, res) => {
//     try {
//         console.log("Delete");
//         const deletedConnection=Connection.deleteOne({ConnectionID:req.params.id}).then((data)=>{
//             console.log(data);
//         });
//         res.send("Successfully deleted");
//     }
//     catch(error) {
//         console.error(error);
//     }
//   })
  
//   main();
//   app.listen(3000, function() {
//     console.log("Server started on port 3000");
//   });


  module.exports = router;