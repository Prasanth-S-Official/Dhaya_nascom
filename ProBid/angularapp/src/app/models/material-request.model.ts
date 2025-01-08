export interface MaterialRequest {
    materialRequestId?: number; // Optional for new requests
    userId: number; // ID of the user making the request
    materialId: number; // ID of the material being requested
    quantity: number; // Quantity requested
    urgencyLevel: string; // Urgency level (Low, Medium, High)
    requestDate: Date; // Date of the request
    preferredDeliveryDate: Date; // Preferred delivery date
    timeSlot: string; // Preferred time slot (Morning, Afternoon, Evening)
    status: string; // Status (Pending, Approved, Rejected)
    deliveryAddress: string; // Delivery address
    contactNumber: string; // Contact number
    comments?: string; // Optional comments
  }
  