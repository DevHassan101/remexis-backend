import Link from 'next/link';
import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen bg-primary-600 flex items-center justify-center ">
      <div className="bg-white px-8 py-16 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-2">Login to Account</h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Please enter your email and password to continue
        </p>

        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
              placeholder="esteban_schiller@gmail.com"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm text-gray-600">
                Forget Password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
              placeholder="•••••••"
            />
          </div>

          <div className="mb-6 flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Remember Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-md font-semibold transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link href="/dashboard/register" className="text-primary-500 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
