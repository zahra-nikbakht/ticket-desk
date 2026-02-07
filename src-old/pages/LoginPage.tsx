import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../features/auth/api/auth.api";
import { useAuth } from "../features/auth/context/AuthContext";
import { getApiErrorMessage } from "../shared/api/error";

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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md border rounded-2xl p-6 shadow-sm bg-white">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-sm text-gray-600 mt-1">Access your ticket dashboard</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2"
              type="email"
              placeholder="z@test.com"
              {...register("email")}
            />
            {errors.email && <div className="text-sm text-red-600 mt-1">{errors.email.message}</div>}
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2"
              type="password"
              placeholder="********"
              {...register("password")}
            />
            {errors.password && <div className="text-sm text-red-600 mt-1">{errors.password.message}</div>}
          </div>

          {serverError && (
            <div className="text-sm text-red-700 border border-red-200 bg-red-50 rounded-lg p-3">{serverError}</div>
          )}

          <button disabled={isSubmitting} className="w-full rounded-lg px-4 py-2 border" type="submit">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="text-sm mt-4">
          New here?{" "}
          <Link className="underline" to="/register">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
