"use client"

import { Icon } from '@iconify/react'
import React, { useState, useMemo, useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import Modal from '../../../components/ui/Modal' // Add this import

const AddModal = ({ isModalOpen, setIsModalOpen, onUserAdded, editingUser, setEditingUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Populate form when editing user
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name || '');
      setEmail(editingUser.email || '');
      setPassword(''); // Don't populate password for security
      setConfirmPassword('');
    }
  }, [editingUser]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setEditingUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email) {
      setError("Please fill in all required fields");
      return;
    }

    // For new users, password is required. For editing, password is optional
    if (!editingUser && !password) {
      setError("Password is required for new users");
      return;
    }

    // If password is provided (new user or updating password), validate it
    if (password) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }
    }

    setError("");
    setLoading(true);

    try {
      const isEditing = !!editingUser;
      const url = isEditing ? `/api/admin/user/${editingUser.id}` : '/api/admin/user';
      const method = isEditing ? 'PUT' : 'POST';

      // Prepare request body
      const requestBody = {
        name: name,
        email: email,
        role: 'USER' // Set role as USER for regular users
      };

      // Only include password if it's provided
      if (password) {
        requestBody.password = password;
      }

      const result = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (result.ok) {
        const data = await result.json();
        console.log(isEditing ? 'User updated:' : 'User added:', data);
        resetForm();
        setIsModalOpen(false);
        if (onUserAdded) {
          onUserAdded();
        }
      } else {
        const errorData = await result.json();
        setError(errorData.error || `Failed to ${isEditing ? 'update' : 'add'} user`);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const modalTitle = editingUser ? "Edit User" : "Add User";

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        resetForm();
      }}
      width='max-w-4xl'
      title={modalTitle}
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Full Name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email Address *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Password {editingUser ? '(leave blank to keep current)' : '*'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={editingUser ? "Enter new password (optional)" : "Enter Password"}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={!editingUser}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password {editingUser && !password ? '' : '*'}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={!editingUser || password}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(false);
              resetForm();
            }}
            className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : `Save ${editingUser ? 'Changes' : 'User'}`}
          </button>
        </div>
      </form>
    </Modal>
  );
};

function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/user', {
        method: "GET"
      });
      const data = await response.json();
      if (response?.ok) {
        setUsers(data.users || []);
        setLoading(false)
      } else {
        setError(data.error || 'Failed to fetch users');
        setLoading(false);
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Delete user function
  const deleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/user/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsers();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Handle add new user
  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(user =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  const table = useReactTable({
    data: filteredData,
    columns: [
      {
        header: 'Info',
        accessorKey: 'info',
        cell: ({ row }) => (
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">{row.original.name}</p>
            <p className="text-sm text-gray-500">{row.original.email}</p>
          </div>
        ),
      },
      {
        header: 'Role',
        accessorKey: 'role',
        cell: ({ row }) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.role === 'ADMIN'
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {row.original.role || 'USER'}
          </span>
        ),
      },
      {
        header: 'Joined At',
        accessorKey: 'joinedAt',
        cell: ({ row }) => (
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">{formatDate(row.original.createdAt)}</p>
          </div>
        ),
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEditUser(row.original)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200" 
              title="Edit"
            >
              <Icon icon="tabler:edit" width={16} height={16} />
            </button>
            <button
              onClick={() => deleteUser(row.original.id)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200" 
              title="Delete"
            >
              <Icon icon="tabler:trash" width={16} height={16} />
            </button>
          </div>
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newState = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
    manualPagination: false,
  });

  const pageCount = table.getPageCount();
  const currentPage = pageIndex;
  const maxPagesToShow = 5;
  const halfRange = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(0, currentPage - halfRange);
  let endPage = Math.min(pageCount - 1, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(0, endPage - maxPagesToShow + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="px-6 py-8 ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <span className="text-primary-600">Dashboard</span>
          <Icon icon="ic:outline-greater-than" width={16} height={16} />
          <span className="text-gray-500">User Management</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleAddUser}
            className="px-6 py-2 rounded-md bg-primary-600 cursor-pointer hover:bg-primary-700 duration-300 transition-all flex items-center text-white whitespace-nowrap"
          >
            <Icon icon="iconoir:plus" width="20" height="20" className='inline-block mr-2' />
            Add New User
          </button>
          
          <div className="flex items-center w-full md:w-auto max-w-sm">
            <div className="relative flex-1">
              <Icon
                icon="iconamoon:search"
                width={20}
                height={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPageIndex(0);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-colors focus:outline-0"
                placeholder="Search users..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <p className="text-sm text-gray-600">
            {filteredData.length} {filteredData.length === 1 ? 'user' : 'users'} found
          </p>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Show</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPageIndex(0);
              }}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-0 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading users...</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200">
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {filteredData.length > 0 && (
          <div className="p-4 flex items-center justify-between border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {pageIndex * pageSize + 1} -{' '}
              {Math.min((pageIndex + 1) * pageSize, filteredData.length)}{' '}
              of {filteredData.length} results
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="First page"
              >
                <Icon icon="tabler:chevrons-left" width={20} height={20} />
              </button>

              <button
                onClick={() => setPageIndex(pageIndex - 1)}
                disabled={!table.getCanPreviousPage()}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Previous page"
              >
                <Icon icon="tabler:chevron-left" width={20} height={20} />
              </button>

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setPageIndex(page)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${pageIndex === page
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {page + 1}
                </button>
              ))}

              <button
                onClick={() => setPageIndex(pageIndex + 1)}
                disabled={!table.getCanNextPage()}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Next page"
              >
                <Icon icon="tabler:chevron-right" width={20} height={20} />
              </button>

              <button
                onClick={() => setPageIndex(pageCount - 1)}
                disabled={!table.getCanNextPage()}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Last page"
              >
                <Icon icon="tabler:chevrons-right" width={20} height={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      <AddModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onUserAdded={fetchUsers}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />
    </div>
  )
}

export default UserManagement