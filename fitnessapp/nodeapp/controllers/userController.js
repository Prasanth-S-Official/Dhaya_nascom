const { generateToken } = require('../authUtils');
const User = require('../models/userModel');

const jwt = require('jsonwebtoken');


const getUserByEmailAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(" req.body", req.body);
    // Find a user with the given username and password
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token =generateToken(user._id )
    let responseObj = {
      "userName": user.userName,
      "role": user.role,
      "token":token,
      "id":user._id

    }
    console.log("user isss", responseObj);
    res.status(200).json(responseObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addUser = async (req, res) => {
  try {

    console.log("req.body in signup", req.body);
    const user = await User.create(req.body);
    res.status(200).json({ "message": "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getUserByEmailAndPassword,
  addUser
};



