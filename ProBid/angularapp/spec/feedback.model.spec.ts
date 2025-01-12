import { Feedback } from "./feedback.model";

describe('Feedback Model', () => {

  fit('Frontend_Feedback_model_should_create_an_instance_with_defined_properties', () => {
    // Create a sample Feedback object
    const feedback: Feedback = {
      feedbackId: 101,
      feedbackText: 'Great communication and timely updates.',
      date: new Date('2024-07-02'),
      userId: 1,
      projectId: 202,
      bidId: 303,
      category: 'Communication',
      rating: 5
    };

    expect(feedback).toBeTruthy();
    expect(feedback.feedbackId).toBe(101);
    expect(feedback.feedbackText).toBe('Great communication and timely updates.');
    expect(feedback.date).toEqual(new Date('2024-07-02'));
    expect(feedback.userId).toBe(1);
    expect(feedback.projectId).toBe(202);
    expect(feedback.bidId).toBe(303);
    expect(feedback.category).toBe('Communication');
    expect(feedback.rating).toBe(5);
  });


})