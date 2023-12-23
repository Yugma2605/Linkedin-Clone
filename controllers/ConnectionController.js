const Connection = require('../models/Connection');

async function getConnection(req,res){
    const desiredConnectionID = req.params.id;
    if(desiredConnectionID==undefined){
      try {
          const connections = await Connection.find();
          res.json(connections);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
    }
    else{
      try {
        console.log(desiredConnectionID);
        const connection = await connection.findOne({ ConnectionID: desiredConnectionID });
        res.json(connection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }
}


async function postConnection(req,res){
    try {
        const {UserID1,UserID2}=req.body;
        if (!UserID1 || !UserID2) {
            return res.status(400).json({ message: 'UserID1 and UserID2 are required.' });
        }
        const newConnection = new Connection({UserID1,UserID2});

        const savedConnection = await newConnection.save();
        res.status(201).json(savedConnection);

      } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteConnection(req,res){
    try{
        const UserID1=req.params.UserID1;
        const UserID2=req.params.UserID2;
        if (!UserID1 || !UserID2) {
            return res.status(400).json({ message: 'UserID1 and UserID2 are required.' });
        }
        Connection.deleteOne({UserID1:UserID1, UserID2:UserID2}).then((data)=>{
            console.log(data);
        })
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getConnection, postConnection, deleteConnection };