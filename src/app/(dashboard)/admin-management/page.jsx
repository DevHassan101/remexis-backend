"use client"
import Modal from '../../../components/ui/Modal'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'

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
            const url = isEditing ? `/api/admin/adminUser/${editingUser.id}` : '/api/admin/adminUser';
            const method = isEditing ? 'PUT' : 'POST';

            // Prepare request body
            const requestBody = {
                name: name,
                email: email,
                role: 'ADMIN'
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
                console.log(isEditing ? 'Admin updated:' : 'Admin added:', data);
                resetForm();
                setIsModalOpen(false);
                if (onUserAdded) {
                    onUserAdded();
                }
            } else {
                const errorData = await result.json();
                setError(errorData.error || `Failed to ${isEditing ? 'update' : 'add'} admin`);
            }
        } catch (error) {
            console.error(error);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const modalTitle = editingUser ? "Edit Admin" : "Add Admin";

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
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                        className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : `Save ${editingUser ? 'Changes' : 'Admin'}`}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

function AdminManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/admin/adminUser', {
                method: "GET"
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(data.users || []);
            } else {
                setError(data.error || 'Failed to fetch users');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle search input change
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
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

    // Delete user function
    const deleteUser = async (userId) => {
        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/adminUser/${userId}`, {
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

    // Format date helper function
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className='px-6 py-8'>
            <h6 className='text-3xl font-bold mb-3'>
                Admin Management
            </h6>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className='flex flex-1 justify-between items-center mb-5'>
                <div>
                    <div className='flex items-center gap-1.5 text-sm font-bold'>
                        <span className='text-primary-main'>Dashboard</span>
                        <span> <Icon icon="ic:outline-greater-than" /> </span>
                        <span className='text-gray-400'>Admin Management</span>
                    </div>
                </div>
                <div className='flex flex-1 gap-2 h-fit justify-end items-end'>
                    <button
                        onClick={handleAddUser}
                        className='px-6 py-2 rounded-md bg-primary-main cursor-pointer hover:bg-primary-700 duration-300 transition-all flex items-center text-white whitespace-nowrap'
                    >
                        <Icon icon="iconoir:plus" width="20" height="20" className='inline-block' />
                        <span className='mt-0.5'>
                            Add New Admin
                        </span>
                    </button>
                    <div className='flex items-center max-w-xs w-full border py-1 px-2 gap-1.5 rounded-md border-gray-400'>
                        <Icon icon="iconamoon:search" width="24" height="24" className='text-gray-400' />
                        <input
                            type="text"
                            className='w-full py-1 focus:outline-none'
                            placeholder='Search admins...'
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white p-4">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Full Name</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Email</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Role</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Date Created</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr >
                                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">Loading admins...</td>
                            </tr>
                        ) : (
                            filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-4 py-3 text-gray-900">{user.name || 'N/A'}</td>
                                        <td className="px-4 py-3 text-gray-700">{user.email || 'N/A'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'ADMIN'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-green-100 text-green-800'
                                                }`}>
                                                {user.role || 'USER'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{formatDate(user.createdAt)}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                                                    title="Edit Admin"
                                                >
                                                    <Icon icon="tabler:edit" className="text-gray-600" width={16} height={16} />
                                                </button>
                                                <button
                                                    onClick={() => deleteUser(user.id)}
                                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                                                    title="Delete Admin"
                                                >
                                                    <Icon icon="tabler:trash" width={16} height={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                        {searchTerm ? 'No admins found matching your search.' : 'No admins found.'}
                                    </td>
                                </tr>
                            )

                        )}

                    </tbody>
                </table>
            </div>

            <AddModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onUserAdded={fetchUsers}
                editingUser={editingUser}
                setEditingUser={setEditingUser}
            />
        </div>
    );
}

export default AdminManagement;