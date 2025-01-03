export interface DriverRequest {
  driverRequestId?: number; // Optional for new requests
  userId: number; // ID of the user making the request
  driverId?: number; // ID of the assigned driver (nullable)
  requestDate: string; // ISO Date format (YYYY-MM-DD)
  status: string; // "Pending", "Approved", "Rejected", "Completed"
  tripDate: Date; // ISO Date format (YYYY-MM-DD)
  timeSlot: string; // e.g., "Morning", "Afternoon", "Evening"
  pickupLocation: string; // Pickup location
  dropLocation: string; // Drop location
  estimatedDuration: string; // e.g., "3 hours", "Full Day"
  paymentAmount?: number; // Payment amount (nullable)
  comments?: string; // Optional comments
  actualPickupTime?: string; // ISO Time format (HH:mm:ss), nullable
  actualDropTime?: string; // ISO Time format (HH:mm:ss), nullable
}
