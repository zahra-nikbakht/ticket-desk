import { Link, useParams } from "react-router-dom";
import { useMyTicket } from "../features/tickets/hooks/useTickets";
import { StatusBadge } from "../shared/components/StatusBadge";
import { Button } from "../shared/components/Button";

export const TicketDetailsPage = () => {
  const { id } = useParams();
  const ticketId = id || "";
  const { data, isLoading, isError, error } = useMyTicket(ticketId);

  if (isLoading) return <div className="ui-muted">Loading...</div>;
  if (isError) return <div className="text-red-600">Failed to load ticket: {(error as any)?.message}</div>;
  if (!data) return <div>Ticket not found.</div>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="ui-section-title">{data.title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge status={data.status} />
            <span className="text-xs ui-muted">Updated: {new Date(data.updatedAt).toLocaleString()}</span>
          </div>
        </div>

        <Link to="/app/tickets">
          <Button variant="secondary">Back</Button>
        </Link>
      </div>

      <div className="mt-6 ui-card p-4">
        <div className="text-sm font-medium">Description</div>
        <p className="mt-2 text-sm ui-muted whitespace-pre-wrap">{data.description}</p>
      </div>

      <div className="mt-6 text-xs ui-muted">Created: {new Date(data.createdAt).toLocaleString()}</div>

      <div className="mt-6 text-sm ui-muted">
        Comments are not implemented yet (no comment endpoint provided in the current backend spec).
      </div>
    </div>
  );
};
