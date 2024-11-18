export interface BookRentalRequest {
    rentalId?: number;          // Rental request ID
    userId: number;             // ID of the user making the request
    bookId: number;             // ID of the book being rented
    requestDate: string;        // Date of the rental request (ISO format: YYYY-MM-DD)
    returnDate?: string;        // Expected return date (optional)
    status: string;             // Status of the request (e.g., Pending, Approved, Returned)
    comments?: string;          // Optional comments from the user
  }
  