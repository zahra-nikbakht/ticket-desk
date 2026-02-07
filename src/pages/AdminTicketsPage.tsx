import { useState } from "react";
import { useAdminTickets, useUpdateTicketStatus } from "../features/tickets/hooks/useAdminTickets";
import { StatusBadge } from "../shared/components/StatusBadge";
import { TicketStatus } from "../shared/types/tickets";
import { getApiErrorMessage } from "../shared/api/error";
import { Table, Th, Td } from "../shared/ui/Table";

const statuses: TicketStatus[] = ["OPEN", "IN_PROGRESS", "CLOSED"];

export const AdminTicketsPage = () => {
  const { data, isLoading, isError, error } = useAdminTickets();
  const updateStatus = useUpdateTicketStatus();
  const [serverError, setServerError] = useState<string | null>(null);

  const onChange = async (id: string, status: TicketStatus) => {
    setServerError(null);
    try {
      await updateStatus.mutateAsync({ id, status });
    } catch (err) {
      setServerError(getApiErrorMessage(err));
    }
  };

  return (
    <div>
      <h1 className="ui-section-title">All tickets</h1>
      <p className="mt-2 ui-muted text-sm">Review tickets and update their status.</p>

      {serverError && (
        <div className="mt-4 text-sm text-red-700 border border-red-200 bg-red-50 rounded-lg p-3">{serverError}</div>
      )}

      {isLoading && <div className="mt-6 ui-muted">Loading...</div>}
      {isError && <div className="mt-6 text-red-600">Failed to load tickets: {(error as any)?.message}</div>}

      {data && (
        <div className="mt-6 ui-card overflow-hidden">
          <Table>
            <thead>
              <tr>
                <Th>Title</Th>
                <Th>User</Th>
                <Th>Status</Th>
                <Th>Update</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <Td>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs ui-muted line-clamp-1">{t.description}</div>
                  </Td>
                  <Td>
                    <div className="text-sm">{t.user.name}</div>
                    <div className="text-xs ui-muted">{t.user.email}</div>
                  </Td>
                  <Td>
                    <StatusBadge status={t.status} />
                  </Td>
                  <Td>
                    <select
                      className="ui-input !w-auto !py-1"
                      defaultValue={t.status}
                      onChange={(e) => onChange(t.id, e.target.value as TicketStatus)}
                      disabled={updateStatus.isPending}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <Td className="p-6 ui-muted" colSpan={4}>
                    No tickets found.
                  </Td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};
