import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerApi } from "../features/auth/api/auth.api";
import { getApiErrorMessage } from "../shared/api/error";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof schema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      await registerApi(values);
      navigate("/login", { replace: true });
    } catch (err) {
      setServerError(getApiErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md border rounded-2xl p-6 shadow-sm bg-white">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-sm text-gray-600 mt-1">Register to submit and track tickets</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-medium">Name</label>
            <input className="mt-1 w-full border rounded-lg px-3 py-2" placeholder="Zeynab" {...register("name")} />
            {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name.message}</div>}
          </div>

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
            {isSubmitting ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="text-sm mt-4">
          Already have an account?{" "}
          <Link className="underline" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
