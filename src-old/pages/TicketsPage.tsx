import { Link } from "react-router-dom";
import { useMyTickets } from "../features/tickets/hooks/useTickets";
import { StatusBadge } from "../shared/components/StatusBadge";
import { Button } from "../shared/components/button";

export const TicketsPage = () => {
  const { data, isLoading, isError, error } = useMyTickets();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-slate-800">My tickets</h1>

        <Button variant="primary">
          <Link to="/app/tickets/new">Create Ticket</Link>
        </Button>
      </div>

      {isLoading && <div className="mt-6">Loading...</div>}
      {isError && <div className="mt-6 text-red-600">Failed to load tickets: {(error as any)?.message}</div>}

      {data && (
        <div className="min-w-full overflow-x-auto mt-10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap rounded-l-lg bg-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 lg:px-5">
                  Title
                </th>
                <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 lg:px-5">
                  Status
                </th>
                <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 lg:px-5">
                  Date
                </th>
                <th className="whitespace-nowrap rounded-r-lg bg-slate-200 px-3 py-3 font-semibold uppercase text-slate-800 lg:px-5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((t) => (
                <tr key={t.id} className="border border-transparent border-b-slate-200 hover:bg-slate-50 ">
                  <td className="whitespace-nowrap rounded-l-lg px-4 py-3 sm:px-5">
                    <Link to={`/app/tickets/${t.id}`}>
                      {t.title}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                    {new Date(t.updatedAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="whitespace-nowrap rounded-r-lg px-4 py-3 sm:px-5">

                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td className="p-6 text-gray-600" colSpan={3}>
                    No tickets yet.
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
