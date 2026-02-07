import { http } from "../../../shared/api/http";
import { Ticket, TicketStatus, AdminTicket } from "../../../shared/types/tickets";

export type CreateTicketPayload = { title: string; description: string };

export const createTicket = async (payload: CreateTicketPayload) => {
  const { data } = await http.post<{ ok: boolean; ticket: Ticket }>("/tickets", payload);
  return data.ticket;
};

export const listMyTickets = async () => {
  const { data } = await http.get<{ ok: boolean; tickets: Ticket[] }>("/tickets");
  return data.tickets;
};

export const getMyTicket = async (id: string) => {
  const { data } = await http.get<{ ok: boolean; ticket: Ticket }>(`/tickets/${id}`);
  return data.ticket;
};

export const listAdminTickets = async () => {
  const { data } = await http.get<{ ok: boolean; tickets: AdminTicket[] }>("/admin/tickets");
  return data.tickets;
};

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  const { data } = await http.patch<{ ok: boolean; ticket: { id: string; status: TicketStatus; updatedAt: string } }>(
    `/admin/tickets/${id}/status`,
    { status }
  );
  return data.ticket;
};
