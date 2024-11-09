import { PhysicalTrainingRequest } from "./physical-training-request.model";

describe('PhysicalTrainingRequest Model', () => {

  fit('Frontend_should_create_an_instance_PhysicalTrainingRequest_with_defined_properties', () => {
    // Create a sample PhysicalTrainingRequest object
    const trainingRequest: PhysicalTrainingRequest = {
      physicalTrainingRequestId: 2001,
      userId: 101,
      physicalTrainingId: 202,
      requestDate: '2024-11-05',
      status: 'Pending',
      healthConditions: 'No known health issues',
      fitnessGoals: 'Increase strength and endurance',
      comments: 'Looking forward to a challenging session'
    };

    expect(trainingRequest).toBeTruthy();
    expect(trainingRequest.physicalTrainingRequestId).toBeDefined();
    expect(trainingRequest.userId).toBeDefined();
    expect(trainingRequest.physicalTrainingId).toBeDefined();
    expect(trainingRequest.requestDate).toBeDefined();
    expect(trainingRequest.status).toBeDefined();
    expect(trainingRequest.healthConditions).toBeDefined();
    expect(trainingRequest.fitnessGoals).toBeDefined();
    expect(trainingRequest.comments).toBeDefined();
  });

  fit('Frontend_should_allow_creation_without_optional_properties', () => {
    // Create a PhysicalTrainingRequest object without optional properties
    const trainingRequest: PhysicalTrainingRequest = {
      userId: 101,
      physicalTrainingId: 202,
      requestDate: '2024-11-05',
      status: 'Pending',
      healthConditions: 'No known health issues',
      fitnessGoals: 'Increase strength and endurance'
    };

    expect(trainingRequest).toBeTruthy();
    expect(trainingRequest.comments).toBeUndefined();
  });

});
