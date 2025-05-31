import { authOptions } from "../../../lib/auth";
import { usersData } from "../../../constants/data";
import { Icon } from "@iconify/react";
import { getServerSession } from "next-auth";
import React from "react";
// import { useState, useEffect } from "react";
import { redirect } from "next/navigation"
import { getSession } from "next-auth/react";

const Dashboard = async () => {
  // const { data: session, status } = getSession();
    // Redirect if already logged in
    // useEffect(() => {
    //   if (status === "authenticated") {
    //     router.push("/dashboard");
    //   }
    // }, [status, router]);
  
  const session = await getServerSession(authOptions);
  console.warn(session);

  if (!session) {
    redirect("/login")
  }
  return (
    <>
      {/* Header */}
      <header className=" px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <div className="flex justify-between items-center">
          <div>
            {/* <p>Session: {session}</p> */}
            <p className="text-sm text-gray-500">Hi {session.user.name},</p>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Welcome to Venus!
            </h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4"></div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg p-4 sm:p-6 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  Active Users
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  345
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-6 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  All Active Users
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  345
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-6 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  Average Performance Index
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  345
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-main rounded-lg p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-orange-100 uppercase tracking-wide">
                  Active Users
                </p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">24/30</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg  mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              AI Queries Trend
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="h-48 sm:h-64 relative">
              {/* Simple SVG Chart Placeholder */}
              <svg className="w-full h-full" viewBox="0 0 800 200">
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#fb923c" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#fb923c" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <path
                  d="M 50 150 Q 100 140 150 130 T 250 120 T 350 100 T 450 110 T 550 90 T 650 80 T 750 70"
                  stroke="#fb923c"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 50 150 Q 100 140 150 130 T 250 120 T 350 100 T 450 110 T 550 90 T 650 80 T 750 70 L 750 200 L 50 200 Z"
                  fill="url(#chartGradient)"
                />
                <circle cx="350" cy="100" r="4" fill="#fb923c" />
                <text
                  x="350"
                  y="90"
                  textAnchor="middle"
                  className="text-xs fill-primary-main font-medium"
                >
                  Peak
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg ">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Users
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {usersData.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 ${user.avatarColor} rounded-full flex items-center justify-center mr-3`}
                        >
                          <span className="text-white text-sm font-medium">
                            {user.initials}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                      {user.role}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      {user.date}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium ${user.statusColor} rounded-full`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Icon icon="proicons:pencil" width="20" height="20" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Icon icon="tabler:trash" width="20" height="20" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
