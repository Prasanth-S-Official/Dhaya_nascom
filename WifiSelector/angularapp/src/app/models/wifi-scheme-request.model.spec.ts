export interface WiFiSchemeRequest {
    wifiSchemeRequestId?: number;    // Unique identifier for the request
    userId: number;                  // ID of the user making the request
    wifiSchemeId: number;            // ID of the WiFi scheme being requested
    requestDate: string;             // Date of the request (use ISO format: YYYY-MM-DD)
    status: string;                  // E.g., Pending, Approved, Rejected
    comments?: string;               // Optional: Additional comments or requests from the user
}
