import { PhysicalTraining } from "./physical-training.model";

describe('PhysicalTraining Model', () => {

  fit('Frontend_should_create_an_instance_PhysicalTraining_with_defined_properties', () => {
    // Create a sample PhysicalTraining object
    const training: PhysicalTraining = {
      physicalTrainingId: 101,
      trainingName: 'Strength Training',
      description: 'A session focused on building core strength.',
      trainerName: 'John Doe',
      location: 'Fitness Center A',
      isIndoor: true,
      fee: 150,
      focusArea: 'Core',
      physicalRequirements: 'Basic fitness level'
    };

    expect(training).toBeTruthy();
    expect(training.physicalTrainingId).toBeDefined();
    expect(training.trainingName).toBeDefined();
    expect(training.description).toBeDefined();
    expect(training.trainerName).toBeDefined();
    expect(training.location).toBeDefined();
    expect(training.isIndoor).toBeDefined();
    expect(training.fee).toBeDefined();
    expect(training.focusArea).toBeDefined();
    expect(training.physicalRequirements).toBeDefined();
  });

});
