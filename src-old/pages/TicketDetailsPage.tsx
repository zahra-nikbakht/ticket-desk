import { Link, useParams } from "react-router-dom";
import { useMyTicket } from "../features/tickets/hooks/useTickets";
import { StatusBadge } from "../shared/components/StatusBadge";

export const TicketDetailsPage = () => {
  const { id } = useParams();
  const ticketId = id || "";
  const { data, isLoading, isError, error } = useMyTicket(ticketId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-red-600">Failed to load ticket: {(error as any)?.message}</div>;
  if (!data) return <div>Ticket not found.</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge status={data.status} />
            <span className="text-xs text-gray-500">Updated: {new Date(data.updatedAt).toLocaleString()}</span>
          </div>
        </div>

        <Link className="border rounded-lg px-3 py-2 text-sm hover:bg-gray-50" to="/app/tickets">
          Back
        </Link>
      </div>

      <div className="mt-6 rounded-2xl border bg-white p-4">
        <div className="text-sm font-medium">Description</div>
        <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{data.description}</p>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        Created: {new Date(data.createdAt).toLocaleString()}
      </div>

      <div className="mt-6 text-sm text-gray-600">
        Comments are not implemented yet (no comment endpoint provided in the current backend spec).
      </div>
    </div>
  );
};
