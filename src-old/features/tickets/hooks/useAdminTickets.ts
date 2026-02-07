import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listAdminTickets, updateTicketStatus } from "../api/tickets.api";
import { TicketStatus } from "../../../shared/types/tickets";

export const adminTicketsKeys = {
  all: ["adminTickets"] as const,
};

export function useAdminTickets() {
  return useQuery({
    queryKey: adminTicketsKeys.all,
    queryFn: listAdminTickets,
  });
}

export function useUpdateTicketStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TicketStatus }) => updateTicketStatus(id, status),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: adminTicketsKeys.all });
    },
  });
}
