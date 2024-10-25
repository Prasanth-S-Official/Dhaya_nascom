const userController = require('../controllers/userController');
const workoutController = require('../controllers/workoutController');
const workoutRequestController = require('../controllers/workoutRequestController');
const User = require('../models/userModel');
const { validateToken } = require('../authUtils');
const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');
const WorkoutRequest = require('../models/workoutRequestModel');

describe('User_Model_Test', () => {
  test('backend_usermodel_should_validate_a_user_with_all_required_fields', async () => {
    const validUserData = {
      userName: 'validUserName',
      email: 'validemail@gmail.com',
      mobile: '9876543212',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(validUserData);

    await expect(user.validate()).resolves.toBeUndefined();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_username', async () => {
    const invalidUserData = {
      email: 'demouser@gmail.com',
      mobile: '9876543212',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_email', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      mobile: '9876543212',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_mobile', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      email: 'demouser@gmail.com',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_password', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      email: 'demouser@gmail.com',
      mobile: '9876543212',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_role', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      email: 'demouser@gmail.com',
      mobile: '9876543212',
      password: 'validpassword',
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });
});

describe('Workout_Model_Test', () => {
  test('backend_workoutmodel_should_validate_a_workout_with_all_required_fields', async () => {
    const validWorkoutData = {
      workoutName: 'Full Body Workout',
      description: 'This is a full-body workout for beginners.',
      difficultyLevel: 3,
      targetArea: 'Full Body',
      daysPerWeek: 4,
      averageWorkoutDurationInMinutes: 45,
    };

    const workout = new Workout(validWorkoutData);
    await expect(workout.validate()).resolves.toBeUndefined();
  });

  // Test case for missing workoutName
  test('backend_workoutmodel_should_throw_an_error_if_workoutname_is_missing', async () => {
    const invalidWorkoutData = {
      description: 'This is a full-body workout for beginners.',
      difficultyLevel: 3,
      targetArea: 'Full Body',
      daysPerWeek: 4,
      averageWorkoutDurationInMinutes: 45,
    };

    const workout = new Workout(invalidWorkoutData);
    await expect(workout.validate()).rejects.toThrowError();
  });

  // Test case for missing description
  test('backend_workoutmodel_should_throw_an_error_if_description_is_missing', async () => {
    const invalidWorkoutData = {
      workoutName: 'Full Body Workout',
      difficultyLevel: 3,
      targetArea: 'Full Body',
      daysPerWeek: 4,
      averageWorkoutDurationInMinutes: 45,
    };

    const workout = new Workout(invalidWorkoutData);
    await expect(workout.validate()).rejects.toThrowError();
  });

  // Test case for missing difficultyLevel
  test('backend_workoutmodel_should_throw_an_error_if_difficultylevel_is_missing', async () => {
    const invalidWorkoutData = {
      workoutName: 'Full Body Workout',
      description: 'This is a full-body workout for beginners.',
      targetArea: 'Full Body',
      daysPerWeek: 4,
      averageWorkoutDurationInMinutes: 45,
    };

    const workout = new Workout(invalidWorkoutData);
    await expect(workout.validate()).rejects.toThrowError();
  });

  // Test case for invalid difficultyLevel
  test('backend_workoutmodel_should_throw_an_error_if_difficultylevel_is_not_a_number', async () => {
    const invalidWorkoutData = {
      workoutName: 'Full Body Workout',
      description: 'This is a full-body workout for beginners.',
      difficultyLevel: 'hard', // Invalid type
      targetArea: 'Full Body',
      daysPerWeek: 4,
      averageWorkoutDurationInMinutes: 45,
    };

    const workout = new Workout(invalidWorkoutData);
    await expect(workout.validate()).rejects.toThrowError();
  });

  // Test case for missing targetArea
  test('backend_workoutmodel_should_throw_an_error_if_targetarea_is_missing', async () => {
    const invalidWorkoutData = {
      workoutName: 'Full Body Workout',
      description: 'This is a full-body workout for beginners.',
      difficultyLevel: 3,
      daysPerWeek: 4,
      averageWorkoutDurationInMinutes: 45,
    };

    const workout = new Workout(invalidWorkoutData);
    await expect(workout.validate()).rejects.toThrowError();
  });

  // Test case for missing daysPerWeek
  test('backend_workoutmodel_should_throw_an_error_if_daysperweek_is_missing', async () => {
    const invalidWorkoutData = {
      workoutName: 'Full Body Workout',
      description: 'This is a full-body workout for beginners.',
      difficultyLevel: 3,
      targetArea: 'Full Body',
      averageWorkoutDurationInMinutes: 45,
    };

    const workout = new Workout(invalidWorkoutData);
    await expect(workout.validate()).rejects.toThrowError();
  });

  // Test case for missing averageWorkoutDurationInMinutes
  test('backend_workoutmodel_should_throw_an_error_if_averageworkoutdurationinminutes_is_missing', async () => {
    const invalidWorkoutData = {
      workoutName: 'Full Body Workout',
      description: 'This is a full-body workout for beginners.',
      difficultyLevel: 3,
      targetArea: 'Full Body',
      daysPerWeek: 4,
    };

    const workout = new Workout(invalidWorkoutData);
    await expect(workout.validate()).rejects.toThrowError();
  });
});

describe('WorkoutRequest_Model_Test', () => {

  // Test case for validating a WorkoutRequest with all required fields
  test('backend_workoutrequestmodel_should_validate_a_workoutrequest_with_all_required_fields', async () => {
    const validWorkoutRequestData = {
      userId: new mongoose.Types.ObjectId(),
      workoutId: new mongoose.Types.ObjectId(),
      age: 25,
      bmi: 23.5,
      gender: 'Male',
      dietaryPreferences: 'Vegetarian',
      medicalHistory: 'None',
      requestStatus: 'Pending',
    };

    const workoutRequest = new WorkoutRequest(validWorkoutRequestData);
    await expect(workoutRequest.validate()).resolves.toBeUndefined();
  });

  // Test case for missing userId
  test('backend_workoutrequestmodel_should_throw_an_error_if_userid_is_missing', async () => {
    const invalidWorkoutRequestData = {
      workoutId: new mongoose.Types.ObjectId(),
      age: 25,
      bmi: 23.5,
      gender: 'Male',
      dietaryPreferences: 'Vegetarian',
      medicalHistory: 'None',
      requestStatus: 'Pending',
    };

    const workoutRequest = new WorkoutRequest(invalidWorkoutRequestData);
    await expect(workoutRequest.validate()).rejects.toThrowError();
  });

  // Test case for missing workoutId
  test('backend_workoutrequestmodel_should_throw_an_error_if_workoutid_is_missing', async () => {
    const invalidWorkoutRequestData = {
      userId: new mongoose.Types.ObjectId(),
      age: 25,
      bmi: 23.5,
      gender: 'Male',
      dietaryPreferences: 'Vegetarian',
      medicalHistory: 'None',
      requestStatus: 'Pending',
    };

    const workoutRequest = new WorkoutRequest(invalidWorkoutRequestData);
    await expect(workoutRequest.validate()).rejects.toThrowError();
  });

  // Test case for missing age
  test('backend_workoutrequestmodel_should_throw_an_error_if_age_is_missing', async () => {
    const invalidWorkoutRequestData = {
      userId: new mongoose.Types.ObjectId(),
      workoutId: new mongoose.Types.ObjectId(),
      bmi: 23.5,
      gender: 'Male',
      dietaryPreferences: 'Vegetarian',
      medicalHistory: 'None',
      requestStatus: 'Pending',
    };

    const workoutRequest = new WorkoutRequest(invalidWorkoutRequestData);
    await expect(workoutRequest.validate()).rejects.toThrowError();
  });

  // Test case for age outside valid range
  test('backend_workoutrequestmodel_should_throw_an_error_if_age_is_outside_valid_range', async () => {
    const invalidWorkoutRequestData = {
      userId: new mongoose.Types.ObjectId(),
      workoutId: new mongoose.Types.ObjectId(),
      age: 130, // Invalid age
      bmi: 23.5,
      gender: 'Male',
      dietaryPreferences: 'Vegetarian',
      medicalHistory: 'None',
      requestStatus: 'Pending',
    };

    const workoutRequest = new WorkoutRequest(invalidWorkoutRequestData);
    await expect(workoutRequest.validate()).rejects.toThrowError();
  });

  // Test case for missing bmi
  test('backend_workoutrequestmodel_should_throw_an_error_if_bmi_is_missing', async () => {
    const invalidWorkoutRequestData = {
      userId: new mongoose.Types.ObjectId(),
      workoutId: new mongoose.Types.ObjectId(),
      age: 25,
      gender: 'Male',
      dietaryPreferences: 'Vegetarian',
      medicalHistory: 'None',
      requestStatus: 'Pending',
    };

    const workoutRequest = new WorkoutRequest(invalidWorkoutRequestData);
    await expect(workoutRequest.validate()).rejects.toThrowError();
  });

});


describe('workout_controller', () => {
  
  // Test case for adding a workout successfully
  test('backend_addWorkout_should_return_201_status_code_when_workout_added_successfully', async () => {
    const req = {
      body: {
        workoutName: 'Full Body Workout',
        description: 'A workout for the entire body.',
        difficultyLevel: 3,
        targetArea: 'Full Body',
        daysPerWeek: 5,
        averageWorkoutDurationInMinutes: 60
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Workout.create = jest.fn().mockResolvedValue(req.body);

    await workoutController.addWorkout(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  // Test case for add workout when error occurs
  test('backend_addWorkout_should_return_500_status_code_when_error_occurs', async () => {
    const req = {
      body: {
        workoutName: 'Full Body Workout',
        description: 'A workout for the entire body.',
        difficultyLevel: 3,
        targetArea: 'Full Body',
        daysPerWeek: 5,
        averageWorkoutDurationInMinutes: 60
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Workout.create = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await workoutController.addWorkout(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  // Test case for getting a workout by ID with valid data
  test('backend_getWorkoutById_should_return_200_status_code_with_workout_data', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockWorkout = { workoutName: 'Full Body Workout' };
    Workout.findById = jest.fn().mockResolvedValue(mockWorkout);

    await workoutController.getWorkoutById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith(mockWorkout);
  });

  // Test case for workout not found by ID
  test('backend_getWorkoutById_should_return_404_status_code_when_workout_not_found', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Workout.findById = jest.fn().mockResolvedValue(null);

    await workoutController.getWorkoutById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    // expect(res.json).toHaveBeenCalledWith({ message: `Cannot find any Workout with ID ${req.params.id}` });
  });

  // Test case for internal server error when getting workout by ID
  test('backend_getWorkoutById_should_return_500_status_code_when_error_occurs', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Workout.findById = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await workoutController.getWorkoutById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  // Test case for deleting a workout successfully
  test('backend_deleteWorkout_should_return_200_status_code_when_workout_deleted_successfully', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Workout.findByIdAndDelete = jest.fn().mockResolvedValue({});

    await workoutController.deleteWorkout(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  // Test case for workout not found when trying to delete
  test('backend_deleteWorkout_should_return_404_status_code_when_workout_not_found', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Workout.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    await workoutController.deleteWorkout(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    // expect(res.json).toHaveBeenCalledWith({ message: `Cannot find any Workout with ID ${req.params.id}` });
  });

  // Test case for internal server error when trying to delete a workout
  test('backend_deleteWorkout_should_return_500_status_code_when_error_occurs', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Workout.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await workoutController.deleteWorkout(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

});

describe('workoutRequest_controller', () => {

  // Test case for adding a workout request successfully
  test('backend_addWorkoutRequest_should_return_201_status_code_when_workout_request_added_successfully', async () => {
    const req = {
      body: {
        userId: new mongoose.Types.ObjectId(),
        workoutId: new mongoose.Types.ObjectId(),
        age: 25,
        bmi: 22.5,
        gender: 'Male',
        dietaryPreferences: 'Vegan',
        medicalHistory: 'None',
        requestStatus: 'Pending'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    WorkoutRequest.create = jest.fn().mockResolvedValue(req.body);

    await workoutRequestController.addWorkoutRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({
    //   message: "Workout Request Added Successfully",
    //   data: req.body
    // });
  });

  // Test case for add workout request when error occurs
  test('backend_addWorkoutRequest_should_return_500_status_code_when_error_occurs', async () => {
    const req = { body: {} }; // Empty body causing error
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    WorkoutRequest.create = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await workoutRequestController.addWorkoutRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    // expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });

  test('backend_getAllWorkoutRequests_should_return_200_status_code_with_workout_requests', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockWorkoutRequests = [
      { userId: new mongoose.Types.ObjectId(), workoutId: new mongoose.Types.ObjectId(), age: 25 },
      { userId: new mongoose.Types.ObjectId(), workoutId: new mongoose.Types.ObjectId(), age: 30 }
    ];

    // Mock find().populate() chain
    WorkoutRequest.find = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockWorkoutRequests)
      })
    });

    await workoutRequestController.getAllWorkoutRequests(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({ data: mockWorkoutRequests });
  });

  // Test case for internal server error in getAllWorkoutRequests
  test('backend_getAllWorkoutRequests_should_return_500_status_code_when_error_occurs', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Mock find().populate() chain to throw an error
    WorkoutRequest.find = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error('Internal Server Error'))
      })
    });

    await workoutRequestController.getAllWorkoutRequests(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    // expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });

  // Test case for updating a workout request successfully
  test('backend_updateWorkoutRequest_should_return_200_status_code_when_workout_request_updated_successfully', async () => {
    const req = { 
      params: { id: new mongoose.Types.ObjectId().toString() },
      body: {
        userId: new mongoose.Types.ObjectId(),
        workoutId: new mongoose.Types.ObjectId(),
        age: 26,
        bmi: 23.0,
        gender: 'Male',
        dietaryPreferences: 'Vegan',
        medicalHistory: 'None',
        requestStatus: 'Approved'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    WorkoutRequest.findByIdAndUpdate = jest.fn().mockResolvedValue(req.body);

    await workoutRequestController.updateWorkoutRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({
    //   message: "Workout Request Updated Successfully",
    //   data: req.body
    // });
  });

  // Test case for workout request not found when updating
  test('backend_updateWorkoutRequest_should_return_404_status_code_when_workout_request_not_found', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    WorkoutRequest.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    await workoutRequestController.updateWorkoutRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    // expect(res.json).toHaveBeenCalledWith({ message: `Cannot find Workout Request with ID ${req.params.id}` });
  });

  // Test case for internal server error when updating workout request
  test('backend_updateWorkoutRequest_should_return_500_status_code_when_error_occurs', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    WorkoutRequest.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await workoutRequestController.updateWorkoutRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  // Test case for deleting a workout request successfully
  test('backend_deleteWorkoutRequest_should_return_200_status_code_when_workout_request_deleted_successfully', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    WorkoutRequest.findByIdAndDelete = jest.fn().mockResolvedValue({});

    await workoutRequestController.deleteWorkoutRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({ message: "Workout Request Deleted Successfully" });
  });

  // Test case for workout request not found when deleting
  test('backend_deleteWorkoutRequest_should_return_404_status_code_when_workout_request_not_found', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    WorkoutRequest.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    await workoutRequestController.deleteWorkoutRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    // expect(res.json).toHaveBeenCalledWith({ message: `Cannot find Workout Request with ID ${req.params.id}` });
  });

  // Test case for internal server error when deleting workout request
  test('backend_deleteWorkoutRequest_should_return_500_status_code_when_error_occurs', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    WorkoutRequest.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await workoutRequestController.deleteWorkoutRequest(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

});

describe('getUserByEmailAndPassword_Test', () => {
  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_200_status_code_when_user_found', async () => {
    const req = { 
      body: {   
        email: 'test@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const user = {
      userName: 'TestUser',
      role: 'user',
      _id: new mongoose.Types.ObjectId()
    };
    User.findOne = jest.fn().mockResolvedValue(user);

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      userName: user.userName,
      role: user.role,
      token: expect.any(String),
      id: user._id
    });
  });
  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_404_status_code_when_user_not_found', async () => {
    const req = { 
      body: {   
        email: 'nonexistent@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne = jest.fn().mockResolvedValue(null);

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = { 
      body: {   
        email: 'test@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
describe('addUser_Test', () => {
  test('backend_add_user_in_usercontroller_should_return_200_status_code_when_user_added_successfully', async () => {
    const req = { 
      body: {   
        userName: 'NewUser',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'user',
        mobile:'9876543212'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.create = jest.fn().mockResolvedValue(req.body);

    await userController.addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_add_user_in_usercontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = { 
      body: {   
        userName: 'NewUser',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'user',
        mobile:'9876544321'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.create = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await userController.addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
describe('validateToken', () => {
 
    test('backend_validatetoken_function_in_authutils_should_respond_with_400_status_for_invalidtoken', () => {
      // Mock the req, res, and next objects
      const req = {
        header: jest.fn().mockReturnValue('invalidToken'),
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
  
      // Call the validateToken function
      validateToken(req, res, next);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
    });

    test('backend_validatetoken_function_in_authutils_should_respond_with_400_status_for_no_token', () => {
      // Mock the req, res, and next objects
      const req = {
        header: jest.fn().mockReturnValue(null),
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
  
      // Call the validateToken function
      validateToken(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
});