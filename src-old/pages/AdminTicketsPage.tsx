import { useState } from "react";
import { useAdminTickets, useUpdateTicketStatus } from "../features/tickets/hooks/useAdminTickets";
import { StatusBadge } from "../shared/components/StatusBadge";
import { TicketStatus } from "../shared/types/tickets";
import { getApiErrorMessage } from "../shared/api/error";

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
      <h1 className="text-2xl font-bold">Admin · All tickets</h1>
      <p className="text-sm text-gray-600 mt-1">Review tickets and update their status.</p>

      {serverError && (
        <div className="mt-4 text-sm text-red-700 border border-red-200 bg-red-50 rounded-lg p-3">{serverError}</div>
      )}

      {isLoading && <div className="mt-6">Loading...</div>}
      {isError && <div className="mt-6 text-red-600">Failed to load tickets: {(error as any)?.message}</div>}

      {data && (
        <div className="mt-6 overflow-hidden rounded-2xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">User</th>
                <th className="p-3">Status</th>
                <th className="p-3">Update</th>
              </tr>
            </thead>
            <tbody>
              {data.map((t) => (
                <tr key={t.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{t.description}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm">{t.user.name}</div>
                    <div className="text-xs text-gray-500">{t.user.email}</div>
                  </td>
                  <td className="p-3">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="p-3">
                    <select
                      className="border rounded-lg px-2 py-1"
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
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td className="p-6 text-gray-600" colSpan={4}>
                    No tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
