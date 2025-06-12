"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { TextField } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { signIn, getSession, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

export default function Login() {
const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    // alert(status)
    console.warn(session);
    
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt with this creds:", { email, password });
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else if (result?.ok) {
        // The session will be updated automatically by NextAuth
        // and the useEffect will handle the redirect
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  // Don't render login form if already authenticated
  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-primary-main">
      {/* Left Side - Orange Background with placeholder for illustration */}
      <div className="relative flex-col items-center justify-center hidden bg-transparent md:flex md:w-[45%] 2xl:w-[40%]">
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Empty placeholder for your illustration image */}
          <Image
            width={891}
            height={709}
            className="md:w-[345px] md:h-[275px] lg:w-[460px] lg:h-[367px] xl:w-[576px] xl:h-[485px] 2xl:w-[610px] 2xl:h-[480px]"
            src={"/assets/images/login.png"}
            alt="login vector"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col items-center justify-center w-full px-4 py-8 md:w-[55%] 2xl:w-[60%] sm:px-6 lg:px-8 bg-[#ffffff] md:rounded-l-4xl">
        <div className="w-full max-w-md xl:max-w-lg 2xl:max-w-3xl">
          {/* Welcome header */}
          <div className="mb-6 text-center lg:mb-10 2xl:mb-14 sm:text-left">
            <h2 className="text-xl sm:text-3xl lg:text-4xl lg:leading-[40px] xl:text-[2.513rem] 2xl:text-[46px] font-bold text-[#525252]">
              Welcome To <span className="text-primary-main">REMEXIS</span>
            </h2>
          </div>

          {/* Login options */}
          <div className="flex flex-col items-center justify-between gap-4 pb-3 mb-5 lg:mb-8 lg:flex-row xl:gap-5 2xl:mb-16 2xl:gap-10">
            <button className="flex items-center justify-center w-full lg:w-1/2 xl:px-5 py-3 border border-[#e8e8e8] rounded-md shadow-sm gap-3 xl:gap-6">
              <Icon icon="flat-color-icons:google" />
              <span className="text-sm text-[#a1a1a1]">
                Continue with Google
              </span>
            </button>
            <button className="flex items-center justify-center w-full lg:w-1/2 xl:px-5 py-3 border border-[#e8e8e8] rounded-md shadow-sm gap-3 xl:gap-6">
              <Icon icon="logos:facebook" />
              <span className="text-sm text-[#a1a1a1]">
                Continue with Facebook
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center mb-4 lg:mb-6 2xl:mb-10">
            <div className="w-3 mt-1 border-t border-[#a1a1a1]"></div>
            <div className="px-4 text-xl 2xl:text-2xl text-[#a1a1a1]">OR</div>
            <div className="w-3 mt-1 border-t border-[#a1a1a1]"></div>
          </div>
          
          {error && (
            <div className="mb-4">
              <span className="text-red-500">{error}</span>
            </div>
          )}

          {/* Login form */}
          <form className="mt-4 mb-4 2xl:mb-12" onSubmit={handleSubmit}>
            <div className="w-full mb-6 2xl:mb-16">
              <TextField
                id="email-input"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                variant="standard"
                className="w-full"
                required
              />
            </div>

            <div className="w-full mb-10 2xl:mb-16">
              <TextField
                id="password-input"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                variant="standard"
                className="w-full"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex justify-center w-full px-4 py-2 text-white border border-transparent rounded-md shadow-sm bg-primary-main hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

          {/* Sign up link */}
          <div className="text-center sm:text-lg lg:text-xl 2xl:text-2xl sm:text-left">
            <p className="text-[#a1a1a1]">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary-main hover:text-primary-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}