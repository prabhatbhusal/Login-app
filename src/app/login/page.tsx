"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { RiGithubLine, RiGoogleLine } from "@remixicon/react";
import { signInWithGithub, signInWithGoogle } from "../action";
import { z } from "zod";
import { signIn } from "next-auth/react"; // Import signIn from next-auth/react
import { useRouter } from "next/navigation"; // For redirection
import { useState } from "react";

// Zod schema (same as before)
const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

type Inputs = z.infer<typeof formSchema>;

const Page = () => {
  const stylesinput = "border-1 rounded-md p-2 w-100 mb-2";
  const router = useRouter(); // For client-side navigation
  const [error, setError] = useState<string | null>(null); // For login errors

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Handle redirection manually
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      // Fetch session to get role (after successful sign-in)
      const response = await fetch("/api/auth/session");
      const session = await response.json();

      // Redirect based on role
      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="p-25 flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl font-extrabold">Welcome to Login Page</h1>
      <div className="flex flex-col gap-3">
        <Button onClick={() => signInWithGithub()}>
          Continue with Github
          <RiGithubLine />
        </Button>
        <Button onClick={() => signInWithGoogle()}>
          Continue with Google
          <RiGoogleLine />
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-100 h-70 rounded-sm p-2"
      >
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={stylesinput}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={stylesinput}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe"> Remember Me</label>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log-in"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;