const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const workoutRequestSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  workoutId: {
    type: Types.ObjectId,
    ref: 'Workout', // Assuming you have a Workout model
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120
  },
  bmi: {
    type: Number,
    required: true,
    min: 10,
    max: 50
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  dietaryPreferences: {
    type: String,
    required: true
  },
  medicalHistory: {
    type: String,
    required: true
  },
  requestedDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  requestStatus: {
    type: String,
    required: true,
    enum: ['Pending', 'Approved', 'Rejected']
  }
}); // Adds createdAt and updatedAt fields automatically

const WorkoutRequest = mongoose.model('WorkoutRequest', workoutRequestSchema);

module.exports = WorkoutRequest;
