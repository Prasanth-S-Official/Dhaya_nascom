const Workout = require('../models/workoutModel');

// Get all Workouts
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json({ data: workouts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Workout by ID
const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: `Cannot find any Workout with ID ${id}` });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new Workout
const addWorkout = async (req, res) => {
  try {
    const newWorkout = await Workout.create(req.body);
    res.status(200).json({ message: "Workout Added Successfully", data: newWorkout });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing Workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedWorkout) {
      return res.status(404).json({ message: `Cannot find any Workout with ID ${id}` });
    }
    res.status(200).json({ message: "Workout Updated Successfully", data: updatedWorkout });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: `Cannot find any Workout with ID ${id}` });
    }
    res.status(200).json({ message: "Workout Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  addWorkout,
  updateWorkout,
  deleteWorkout
};
