import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTicket } from "../features/tickets/hooks/useTickets";
import { getApiErrorMessage } from "../shared/api/error";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export const NewTicketPage = () => {
  const navigate = useNavigate();
  const createTicket = useCreateTicket();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const ticket = await createTicket.mutateAsync(values);
      navigate(`/app/tickets/${ticket.id}`, { replace: true });
    } catch (err) {
      setServerError(getApiErrorMessage(err));
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">Create ticket</h1>
      <p className="text-sm text-gray-600 mt-1">Describe your issue as clearly as possible.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm font-medium">Title</label>
          <input className="mt-1 w-full border rounded-lg px-3 py-2" placeholder="Bug in dashboard" {...register("title")} />
          {errors.title && <div className="text-sm text-red-600 mt-1">{errors.title.message}</div>}
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="mt-1 w-full border rounded-lg px-3 py-2 min-h-[140px]"
            placeholder="When I click save, nothing happens..."
            {...register("description")}
          />
          {errors.description && <div className="text-sm text-red-600 mt-1">{errors.description.message}</div>}
        </div>

        {serverError && (
          <div className="text-sm text-red-700 border border-red-200 bg-red-50 rounded-lg p-3">{serverError}</div>
        )}

        <button disabled={isSubmitting} className="rounded-lg px-4 py-2 border hover:bg-gray-50" type="submit">
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};
