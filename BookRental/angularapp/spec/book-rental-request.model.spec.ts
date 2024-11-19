import { BookRentalRequest } from "./book-rental-request.model";

describe('BookRentalRequest Model', () => {

  fit('Frontend_should_create_an_instance_BookRentalRequest_with_defined_properties', () => {
    // Create a sample BookRentalRequest object
    const rentalRequest: BookRentalRequest = {
      rentalId: 101,
      userId: 1,
      bookId: 2001,
      requestDate: '2024-11-17',
      returnDate: '2024-11-24',
      status: 'Pending',
      comments: 'Please process this request as soon as possible.'
    };

    expect(rentalRequest).toBeTruthy();
    expect(rentalRequest.rentalId).toBeDefined();
    expect(rentalRequest.userId).toBeDefined();
    expect(rentalRequest.bookId).toBeDefined();
    expect(rentalRequest.requestDate).toBeDefined();
    expect(rentalRequest.returnDate).toBeDefined();
    expect(rentalRequest.status).toBeDefined();
    expect(rentalRequest.comments).toBeDefined();

    // Additional checks for values
    expect(rentalRequest.rentalId).toBe(101);
    expect(rentalRequest.userId).toBe(1);
    expect(rentalRequest.bookId).toBe(2001);
    expect(rentalRequest.requestDate).toBe('2024-11-17');
    expect(rentalRequest.returnDate).toBe('2024-11-24');
    expect(rentalRequest.status).toBe('Pending');
    expect(rentalRequest.comments).toBe('Please process this request as soon as possible.');
  });



});
