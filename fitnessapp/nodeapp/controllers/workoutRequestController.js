const WorkoutRequest = require('../models/workoutRequestModel');

// Get all Workout Requests
const getAllWorkoutRequests = async (req, res) => {
  try {
    const workoutRequests = await WorkoutRequest.find().populate('userId').populate('workoutId');
    res.status(200).json({ data: workoutRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Workout Request by ID
const getWorkoutRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const workoutRequest = await WorkoutRequest.findById(id).populate('userId').populate('workoutId');
    if (!workoutRequest) {
      return res.status(404).json({ message: `Cannot find Workout Request with ID ${id}` });
    }
    res.status(200).json(workoutRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new Workout Request
const addWorkoutRequest = async (req, res) => {
  try {
    const newWorkoutRequest = await WorkoutRequest.create(req.body);
    res.status(200).json({ message: "Workout Request Added Successfully", data: newWorkoutRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing Workout Request
const updateWorkoutRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWorkoutRequest = await WorkoutRequest.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedWorkoutRequest) {
      return res.status(404).json({ message: `Cannot find Workout Request with ID ${id}` });
    }
    res.status(200).json({ message: "Workout Request Updated Successfully", data: updatedWorkoutRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Workout Request
const deleteWorkoutRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWorkoutRequest = await WorkoutRequest.findByIdAndDelete(id);
    if (!deletedWorkoutRequest) {
      return res.status(404).json({ message: `Cannot find Workout Request with ID ${id}` });
    }
    res.status(200).json({ message: "Workout Request Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWorkoutRequestsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const workoutRequests = await WorkoutRequest.find({ userId: userId })
      .populate('userId')
      .populate('workoutId'); // Populate user and workout details
    
    // If no workout requests found, return an empty array with status 200
    if (!workoutRequests || workoutRequests.length === 0) {
      return res.status(200).json({ data: [] });  // 200 OK with an empty array
    }

    res.status(200).json({ data: workoutRequests });  // 200 OK with data
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle server errors
  }
};


module.exports = {
  getAllWorkoutRequests,
  getWorkoutRequestById,
  addWorkoutRequest,
  updateWorkoutRequest,
  deleteWorkoutRequest,
  getWorkoutRequestsByUserId
};
