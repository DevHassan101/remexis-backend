"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TextField } from "@mui/material";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation"
import { signIn, getSession, useSession } from "next-auth/react"

export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession();

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
    // Handle login logic here
    console.log("Login attempt with:", { email, password });
    setError("")
    setLoading(true)

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          name: firstName + ' ' + lastName,
          email: email,
          password: password,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        // Auto sign in after successful signup
        const result = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        })

        if (result?.ok) {
          router.push("/dashboard")
        } else {
          router.push("/auth/signin")
        }
      } else {
        setError(data.error || "Something went wrong")
      }
    } catch (error) {
      console.error(error);

      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  };

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
            src={"/assets/images/signup.png"}
            alt="Signup vector"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col items-center justify-center w-full px-4 py-8 md:w-[55%] 2xl:w-[60%] sm:px-6 lg:px-8 bg-[#ffffff] md:rounded-l-4xl">
        <div className="w-full max-w-md xl:max-w-lg 2xl:max-w-3xl">
          {/* Welcome header */}
          <div className="mb-6 text-center lg:mb-8 2xl:mb-14 sm:text-left">
            <h2 className="text-xl sm:text-3xl lg:text-4xl lg:leading-[40px] xl:text-[2.513rem] 2xl:text-[46px] font-bold text-[#525252]">
              Create Account
            </h2>
          </div>

          {/* Login options */}
          <div className="flex flex-col items-center justify-between gap-4 pb-3 mb-5 lg:mb-6 lg:flex-row xl:gap-5 2xl:mb-16 2xl:gap-10">
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
          <div className="flex items-center justify-center mb-4 2xl:mb-10">
            <div className="w-3 mt-1 border-t border-[#a1a1a1]"></div>
            <div className="px-4 text-xl 2xl:text-2xl text-[#a1a1a1]">OR</div>
            <div className="w-3 mt-1 border-t border-[#a1a1a1]"></div>
          </div>
          {
            error ?
              <span className="text-red-500">
                {error}
              </span>
              : ''

          }
          {/* Login form */}
          <form className="mt-4 mb-4 2xl:mb-12" onSubmit={handleSubmit}>
            <div className="w-full mb-4 2xl:mb-16">
              <TextField
                id="standard-password-input"
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                variant="standard"
                className="w-full"
              />
            </div>

            <div className="w-full mb-4 2xl:mb-16">
              <TextField
                id="standard-password-input"
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                variant="standard"
                className="w-full"
              />
            </div>

            <div className="w-full mb-4 2xl:mb-16">
              <TextField
                id="standard-password-input"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="standard"
                className="w-full"
              />
            </div>

            <div className="w-full mb-10 2xl:mb-16">
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                variant="standard"
                className="w-full"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-white border border-transparent rounded-md shadow-sm bg-primary-main hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
              >
                {loading ? 'Creating Account...' : 'Create Account'}

              </button>
            </div>
          </form>

          {/* Sign up link */}
          <div className="text-center sm:text-lg lg:text-xl 2xl:text-2xl sm:text-left">
            <p className="text-[#a1a1a1]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary-main hover:text-primary-400"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
