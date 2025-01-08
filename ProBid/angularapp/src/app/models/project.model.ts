export interface Project {
    projectId?: number; // Optional for new projects
    title: string; // Title of the project
    description: string; // Detailed description of the project requirements
    budget: number; // Estimated budget for the project
    deadline: string; // ISO Date string (YYYY-MM-DD) for project completion
    status?: string; // Current status (e.g., "Open", "Closed", "Completed")
    category: string; // Category of the project (e.g., "Web Development", "Graphic Design")
    skillsRequired: string; // Comma-separated list of skills (e.g., "Python, JavaScript")
    attachments?: string; // File URLs or paths for reference materials
    priority: string; // Indicates urgency (e.g., "High", "Medium", "Low")
    paymentTerms: string; // Payment conditions (e.g., "Milestone-based", "Hourly Rate", "Fixed Price")
    userId: number; // ID of the user (client) who created the project
  }
  