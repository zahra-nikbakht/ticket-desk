import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerApi } from "../features/auth/api/auth.api";
import { getApiErrorMessage } from "../shared/api/error";
import { Button } from "../shared/components/Button";
import { Input } from "../shared/ui/Input";

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
    <div className="min-h-screen grid place-items-center p-6 bg-[rgb(var(--muted))]">
      <div className="w-full max-w-md ui-card p-6">
        <div className="text-2xl font-bold">Create account</div>
        <div className="mt-1 text-sm ui-muted">Register to submit and track tickets</div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Name" placeholder="Zeynab" error={errors.name?.message} {...register("name")} />
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
            Create account
          </Button>
        </form>

        <div className="text-sm mt-4 ui-muted">
          Already have an account?{" "}
          <Link className="underline text-gray-900" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
