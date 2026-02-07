import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTicket } from "../features/tickets/hooks/useTickets";
import { getApiErrorMessage } from "../shared/api/error";
import { Button } from "../shared/components/Button";
import { Input } from "../shared/ui/Input";
import { Textarea } from "../shared/ui/Textarea";

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
      <div className="ui-card p-6">
        <h1 className="ui-section-title">Create ticket</h1>
        <p className="mt-2 ui-muted text-sm">Describe your issue as clearly as possible.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            placeholder="Bug in dashboard"
            error={errors.title?.message}
            {...register("title")}
          />

          <Textarea
            label="Description"
            placeholder="When I click save, nothing happens..."
            error={errors.description?.message}
            {...register("description")}
          />

          {serverError && (
            <div className="text-sm text-red-700 border border-red-200 bg-red-50 rounded-lg p-3">
              {serverError}
            </div>
          )}

          <Button type="submit" loading={isSubmitting}>
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};
