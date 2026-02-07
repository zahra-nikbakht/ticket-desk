export type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export interface Ticket {
  id: string;
  userId?: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AdminTicket extends Ticket {
  user: {
    id: string;
    name: string;
    email: string;
  };
}
