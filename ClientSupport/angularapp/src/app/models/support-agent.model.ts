export interface SupportAgent {
    agentId?: number; // Optional for new agents
    name: string; // Agent's name
    email: string; // Agent's email
    phone: string; // Contact number
    expertise: string; // e.g., Networking, Software Support
    experience: string; // e.g., "3 years"
    status: string; // e.g., "Available", "Unavailable"
    addedDate?: Date; // Date when the agent was added (optional for creation)
    profile?: string; // Base64 string of profile image
    shiftTiming: string; // e.g., "9 AM - 6 PM"
    remarks?: string; // Additional notes or comments
  }
  