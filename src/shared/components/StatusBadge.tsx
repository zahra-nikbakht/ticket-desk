import { TicketStatus } from "../types/tickets";

const styles: Record<TicketStatus, string> = {
  OPEN: "bg-blue-50 text-blue-700 border-blue-200",
  IN_PROGRESS: "bg-yellow-50 text-yellow-700 border-yellow-200",
  CLOSED: "bg-green-50 text-green-700 border-green-200",
};

export const StatusBadge = ({ status }: { status: TicketStatus }) => {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs ${styles[status]}`}>
      {status}
    </span>
  );
};
