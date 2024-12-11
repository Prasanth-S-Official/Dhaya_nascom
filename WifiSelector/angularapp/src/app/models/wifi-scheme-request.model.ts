export interface WifiSchemeRequest {
    wifiSchemeRequestId?: number;   // Unique identifier for the request
    userId: number;                 // ID of the user making the request
    wifiSchemeId: number;           // ID of the WiFi scheme being requested
    requestDate: Date;            // Date of the request (use ISO format: YYYY-MM-DD)
    status: string;                 // E.g., Pending, Approved, Rejected
    comments: string;              // Optional: Additional comments or requests from the user
    proof: string;                  // Proof document (base64 encoded)

    // Address fields
    streetName: string;             // Street name for the service setup
    landmark: string;               // Nearby landmark for location identification
    city: string;                   // City for the WiFi setup
    state: string;                  // State for the WiFi setup
    zipCode: string;                // ZIP/Postal code for the location

    // Setup preferences
    preferredSetupDate: Date;     // Preferred date for WiFi setup (ISO format: YYYY-MM-DD)
    timeSlot: string;               // Preferred time slot for WiFi setup
}
