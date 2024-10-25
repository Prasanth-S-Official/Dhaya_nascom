const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login',userController.getUserByEmailAndPassword);
router.post('/signup', userController.addUser);

module.exports = router;
