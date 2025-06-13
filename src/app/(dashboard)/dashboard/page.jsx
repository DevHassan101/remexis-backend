import { authOptions } from "../../../lib/auth";
import { Icon } from "@iconify/react";
import { getServerSession } from "next-auth";
import { React } from "react";
import { redirect } from "next/navigation"
import { prisma } from "../../../lib/prisma";
import withAuth from "next-auth/middleware";

const Dashboard = async () => {

  const session = await getServerSession(authOptions);
  console.warn(session);

  // if (!session) {
  //   redirect("/login")
  // }
  let totalUsers = 0;
  let totalAdmins = 0;
  let totalArticles = 0;
  let recentUsers = [];

  try {
    // Get total users count
    totalUsers = await prisma.user.count({
      where: {
        role: 'USER'
      }
    });

    // Get total admins count
    totalAdmins = await prisma.user.count({
      where: {
        role: 'ADMIN'
      }
    });

    // Get total articles count (if you have an Article model)
    totalArticles = await prisma.article.count();

    // Get recent users (last 5)
    recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Set default values if database fetch fails
    totalUsers = 0;
    totalAdmins = 0;
    totalArticles = 0;
    recentUsers = [];
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to get user initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to get avatar color
  const getAvatarColor = (index) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    return colors[index % colors.length];
  };


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
                  Total Users
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  {totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-6 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  Total Admins
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  {totalAdmins}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-6 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  Total Articles
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  {totalArticles}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-main rounded-lg p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-orange-100 uppercase tracking-wide">
                  Users/Admins
                </p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">{totalUsers}/{totalAdmins}</p>
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
                {recentUsers.length > 0 ? (
                  recentUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 ${getAvatarColor(index)} rounded-full flex items-center justify-center mr-3`}
                          >
                            <span className="text-white text-sm font-medium">
                              {getInitials(user.name)}
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
                        {
                          user.role == "ADMIN" ? (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {user.role}
                            </span>
                          ) : (

                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {user.role}
                            </span>
                          )
                        }
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                        {formatDate(user.createdAt)}
                      </td>
                    </tr>
                  ))) : (
                  <tr>
                    <td colSpan="5" className="px-4 sm:px-6 py-8 text-center text-gray-500">
                      No recent users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
