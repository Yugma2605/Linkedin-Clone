const User = require('../models/User');

async function getAllUsers(req, res) {
  try {
    const userData = await User.find();
    res.send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function createUser(req, res) {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateUser(req, res) {
  try {
    const data = await User.updateOne(
      { userID: req.params.userid },
      { $set: req.body }
    );
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteUser(req,res){
  try {
    await User.deleteOne({userID:req.params.userid}).then((data)=>{
        console.log(data);
    });
} catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
} 
}
module.exports = { getAllUsers, createUser, updateUser, deleteUser};
