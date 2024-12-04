import { MaterialRequest } from "./material-request.model";

describe('MaterialRequest Model', () => {

  fit('Frontend_MaterialRequest_model_should_create_an_instance_with_defined_properties', () => {
    // Create a sample MaterialRequest object
    const materialRequest: MaterialRequest = {
      materialRequestId: 201,
      userId: 1,
      materialId: 101,
      quantity: 50,
      urgencyLevel: 'High',
      requestDate: new Date('2024-11-26'),
      preferredDeliveryDate: new Date('2024-11-30'),
      timeSlot: 'Morning',
      status: 'Pending',
      deliveryAddress: '123 Main Street, New York, NY',
      contactNumber: '1234567890',
      comments: 'Please deliver by the preferred date.'
    };

    expect(materialRequest).toBeTruthy();
    expect(materialRequest.materialRequestId).toBe(201);
    expect(materialRequest.userId).toBe(1);
    expect(materialRequest.materialId).toBe(101);
    expect(materialRequest.quantity).toBe(50);
    expect(materialRequest.urgencyLevel).toBe('High');
    expect(materialRequest.requestDate).toEqual(new Date('2024-11-26'));
    expect(materialRequest.preferredDeliveryDate).toEqual(new Date('2024-11-30'));
    expect(materialRequest.timeSlot).toBe('Morning');
    expect(materialRequest.status).toBe('Pending');
    expect(materialRequest.deliveryAddress).toBe('123 Main Street, New York, NY');
    expect(materialRequest.contactNumber).toBe('1234567890');
    expect(materialRequest.comments).toBe('Please deliver by the preferred date.');
  });

});
