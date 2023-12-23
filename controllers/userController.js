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

async function getUserById(req, res) {
  try {
      const userid = req.params.userid;
      // console.log(userid);
      if (!req.params.userid) {
          return res.status(400).json({ error: 'UserID is required in parameters' });
      }
      
      const user = await User.findById( userid );

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createUser(req, res) {
  try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password) {
          return res.status(400).json({ error: 'Missing required fields' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          return res.status(400).json({ error: 'Invalid email format' });
      }

      const existingUser = await User.findOne({email});
      if (existingUser) {
          return res.status(400).json({ error: 'Email is already registered' });
      }
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

async function deleteUser(req, res) {
  try {
      const userID = req.params.userid;
      if (!userID) {
          return res.status(400).json({ error: 'UserID is required in parameters' });
      }

      const existingUser = await User.findOne({ userID: userID });
      if (!existingUser) {
          return res.status(404).json({ error: 'User not found' });
      }

      await User.deleteOne({ userID: userID });
      res.send({ success: true, message: 'User deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser};
