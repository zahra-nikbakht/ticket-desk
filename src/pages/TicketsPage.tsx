import { Link } from "react-router-dom";
import { useMyTickets } from "../features/tickets/hooks/useTickets";
import { StatusBadge } from "../shared/components/StatusBadge";
import { Button } from "../shared/components/Button";
import { Table, Th, Td } from "../shared/ui/Table";

export const TicketsPage = () => {
  const { data, isLoading, isError, error } = useMyTickets();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="ui-section-title">My tickets</h1>
        <Link to="/app/tickets/new">
          <Button>Create ticket</Button>
        </Link>
      </div>

      {isLoading && <div className="mt-6 ui-muted">Loading...</div>}
      {isError && <div className="mt-6 text-red-600">Failed to load tickets: {(error as any)?.message}</div>}

      {data && (
        <div className="mt-6 ui-card overflow-hidden">
          <Table>
            <thead>
              <tr>
                <Th>Title</Th>
                <Th>Status</Th>
                <Th>Updated</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <Td>
                    <Link to={`/app/tickets/${t.id}`}>
                      {t.title}
                    </Link>
                    <div className="text-xs ui-muted line-clamp-1">{t.description}</div>
                  </Td>
                  <Td>
                    <StatusBadge status={t.status} />
                  </Td>
                  <Td>{new Date(t.updatedAt).toLocaleString()}</Td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <Td className="p-6 ui-muted" colSpan={3}>
                    No tickets yet.
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
