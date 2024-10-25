const mongoose = require('mongoose');
const { Schema } = mongoose;

const workoutSchema = new Schema({
  workoutName: {
    type: String,
    required: [true, 'Workout Name is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  difficultyLevel: {
    type: Number,
    required: [true, 'Difficulty Level is required']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  targetArea: {
    type: String,
    required: [true, 'Target Area is required'] 
  },
  daysPerWeek: {
    type: Number,
    required: [true, 'Days per week is required']
  },
  averageWorkoutDurationInMinutes: {
    type: Number,
    required: [true, 'Average Workout Duration is required']
  }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
