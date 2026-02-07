import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../features/auth/api/auth.api";
import { useAuth } from "../features/auth/context/AuthContext";
import { getApiErrorMessage } from "../shared/api/error";
import { Button } from "../shared/components/Button";
import { Input } from "../shared/ui/Input";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export const LoginPage = () => {
  const { user, loginSuccess } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (user) return <Navigate to="/app/tickets" replace />;

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const res = await login(values);
      loginSuccess(res.accessToken, res.user);
      if (res.user.role === "ADMIN") navigate("/admin/tickets", { replace: true });
      else navigate("/app/tickets", { replace: true });
    } catch (err) {
      setServerError(getApiErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-[rgb(var(--muted))]">
      <div className="w-full max-w-md ui-card p-6">
        <div className="text-2xl font-bold">Sign in</div>
        <div className="mt-1 text-sm ui-muted">Access your TicketDesk dashboard</div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            placeholder="z@test.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            error={errors.password?.message}
            {...register("password")}
          />

          {serverError && (
            <div className="text-sm text-red-700 border border-red-200 bg-red-50 rounded-lg p-3">{serverError}</div>
          )}

          <Button type="submit" loading={isSubmitting} className="w-full">
            Sign in
          </Button>
        </form>

        <div className="text-sm mt-4 ui-muted">
          New here?{" "}
          <Link className="underline text-gray-900" to="/register">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
