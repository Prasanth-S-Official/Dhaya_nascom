const express = require('express');
const workoutController = require('../controllers/workoutController');
const router = express.Router();

// Workout Routes
router.get("/getAllWorkouts", workoutController.getAllWorkouts);
router.get("/getWorkoutById/:id", workoutController.getWorkoutById);
router.post("/addWorkout", workoutController.addWorkout);
router.put("/updateWorkout/:id", workoutController.updateWorkout);
router.delete("/deleteWorkout/:id", workoutController.deleteWorkout);

module.exports = router;
