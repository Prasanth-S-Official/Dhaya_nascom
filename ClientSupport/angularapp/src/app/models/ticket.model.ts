export interface Ticket {
  ticketId?: number; // Optional for new tickets
  title: string; // Title of the ticket
  description: string; // Detailed description of the issue
  priority: string; // e.g., 'High', 'Medium', 'Low'
  status: string; // e.g., 'Open', 'In Progress', 'Resolved', 'Closed'
  createdDate: Date; // Date when the ticket was created
  resolutionDate?: Date; // Expected/actual resolution date
  issueCategory: string; // e.g., 'Technical', 'Billing', 'General'
  resolutionSummary?: string; // Optional summary of resolution
  userId: number; // ID of the user (client) who raised the ticket
  agentId?: number; // ID of the assigned support agent
  satisfied?: boolean; // Indicates if the client is satisfied with the resolution
}
