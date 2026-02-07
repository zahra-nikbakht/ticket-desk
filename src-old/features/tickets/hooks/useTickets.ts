import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTicket, getMyTicket, listMyTickets } from "../api/tickets.api";

export const ticketsKeys = {
  all: ["tickets"] as const,
  mine: () => [...ticketsKeys.all, "mine"] as const,
  detail: (id: string) => [...ticketsKeys.all, "detail", id] as const,
};

export function useMyTickets() {
  return useQuery({
    queryKey: ticketsKeys.mine(),
    queryFn: listMyTickets,
  });
}

export function useMyTicket(id: string) {
  return useQuery({
    queryKey: ticketsKeys.detail(id),
    queryFn: () => getMyTicket(id),
    enabled: Boolean(id),
  });
}

export function useCreateTicket() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTicket,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ticketsKeys.mine() });
    },
  });
}
