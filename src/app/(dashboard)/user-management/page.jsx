"use client"

import { Icon } from '@iconify/react'
import React, { useState, useMemo, useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
// import { users } from '../../../constants/data';

function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {

    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('api/admin/user', {
          method: "GET"
        });
        const data = await response.json();
        if (response?.ok) {
          setUsers(data.users);

          setLoading(false)
        } else {
          setError('Failed to fetch users');
          setLoading(false);
        }
      } catch (error) {
        setError(error.message || 'An error occurred');
        setLoading(false);
      }
    }
    fetchUsers()
  }, [])

  const filteredData = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.country.toLowerCase().includes(searchTerm.toLowerCase())
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
        header: 'Country',
        accessorKey: 'country',
      },
      {
        header: 'Joined At',
        accessorKey: 'joinedAt',
        cell: ({ row }) => (
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">{row.original.createdAt}</p>
          </div>
        ),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ getValue }) => {
          const value = getValue();
          const active = value === 'Active';
          return (
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
            >
              {value}
            </span>
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: () => (
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200" title="Edit">
              <Icon icon="tabler:edit" width={16} height={16} />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200" title="Delete">
              <Icon icon="tabler:trash" width={16} height={16} />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200" title="Info">
              <Icon icon="tabler:info-circle" width={16} height={16} />
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Users</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <span className="text-primary-600">Dashboard</span>
          <Icon icon="ic:outline-greater-than" width={16} height={16} />
          <span className="text-gray-500">User Management</span>
        </div>

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
              placeholder="Search..."
            />
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
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  )
}

export default UserManagement