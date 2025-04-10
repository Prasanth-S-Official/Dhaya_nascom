// authUtils.js

const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'asdfghjkl', {
    expiresIn: '1h', // Adjust the expiration time as needed
  });
};

const validateToken = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    jwt.verify(token, 'asdfghjkl');
    next()

  } catch (error) {
    console.log("error",error);
    res.status(400).json({ message:"Authentication failed" });
  }
};

module.exports = {
  generateToken,
  validateToken,
};
