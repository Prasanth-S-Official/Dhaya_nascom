import { Bid } from "./bid.model";

describe('Bid Model', () => {

  fit('Frontend_Bid_model_should_create_an_instance_with_defined_properties', () => {
    // Create a sample Bid object
    const bid: Bid = {
      bidId: 101,
      projectId: 201,
      userId: 1,
      bidAmount: 1500,
      proposal: 'I have extensive experience with similar projects and can deliver high-quality results.',
      submissionDate: new Date('2024-01-10'),
      status: 'Pending',
      timeEstimation: new Date('2024-01-15'),
      resumeImage: 'base64EncodedResumeImage',
      communicationPreference: 'Email',
      rating: 4.5,
      withdrawReason: 'Found a conflicting commitment.'
    };

    expect(bid).toBeTruthy();
    expect(bid.bidId).toBe(101);
    expect(bid.projectId).toBe(201);
    expect(bid.userId).toBe(1);
    expect(bid.bidAmount).toBe(1500);
    expect(bid.proposal).toBe('I have extensive experience with similar projects and can deliver high-quality results.');
    expect(bid.submissionDate).toEqual(new Date('2024-01-10'));
    expect(bid.status).toBe('Pending');
    expect(bid.timeEstimation).toEqual(new Date('2024-01-15'));
    expect(bid.resumeImage).toBe('base64EncodedResumeImage');
    expect(bid.communicationPreference).toBe('Email');
    expect(bid.rating).toBe(4.5);
    expect(bid.withdrawReason).toBe('Found a conflicting commitment.');
  });

});
