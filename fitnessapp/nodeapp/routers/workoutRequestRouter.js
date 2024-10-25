const express = require('express');
const workoutRequestController = require('../controllers/workoutRequestController');
const router = express.Router();

// Workout Request Routes
router.get("/getAllWorkoutRequests", workoutRequestController.getAllWorkoutRequests);
router.get("/getWorkoutRequestById/:id", workoutRequestController.getWorkoutRequestById);
router.post("/addWorkoutRequest", workoutRequestController.addWorkoutRequest);
router.put("/updateWorkoutRequest/:id", workoutRequestController.updateWorkoutRequest);
router.delete("/deleteWorkoutRequest/:id", workoutRequestController.deleteWorkoutRequest);
router.get("/user/:userId", workoutRequestController.getWorkoutRequestsByUserId);
module.exports = router;
