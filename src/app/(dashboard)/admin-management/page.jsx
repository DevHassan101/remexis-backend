"use client"
import Modal from '../../../components/ui/Modal'
import { dashBoardArticles, usersData } from '../../../constants/data'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'


const AddModal = ({ isModalOpen, setIsModalOpen }) => {
    return (
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(!isModalOpen)}
            width='max-w-4xl'
            title={"Add New User"}
        >
            <form className="space-y-4 py-5">
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Enter Your Confirm Password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <input
                        type="text"
                        placeholder="Enter Your Role"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Joining Date</label>
                    <input
                        type="date"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                    >
                        Save Admin
                    </button>
                </div>
            </form>

        </Modal>
    )
}

function AdminManagement() {
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Filter articles based on search term
    const filteredArticles = dashBoardArticles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Handle search input change
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div className='px-6 py-8'>
            <h6 className='text-3xl font-bold mb-3'>
                Admin Management
            </h6>
            <div className='flex flex-1 justify-between items-center mb-5'>
                <div>
                    <div className='flex items-center gap-1.5 text-sm font-bold'>
                        <span className='text-primary-main'>Dashboard</span>
                        <span> <Icon icon="ic:outline-greater-than" /> </span>
                        <span className='text-gray-400'>Articles Management</span>
                    </div>
                </div>
                <div className='flex flex-1 gap-2 h-fit justify-end items-end'>
                    <button
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        className='px-6 py-2 rounded-md bg-primary-main cursor-pointer hover:bg-primary-700 duration-300 transition-all flex items-center text-white whitespace-nowrap'>
                        <Icon icon="iconoir:plus" width="20" height="20" className='inline-block' />
                        <span className='mt-0.5'>
                            Add New
                        </span>
                    </button>
                    <div className='flex items-center max-w-xs w-full border py-1 px-2 gap-1.5 rounded-md border-gray-400'>
                        <Icon icon="iconamoon:search" width="24" height="24" className='text-gray-400' />
                        <input
                            type="text"
                            className='w-full py-1 focus:outline-none'
                            placeholder='Search'
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
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Title</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Category</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article) => (
                                <tr key={article.id}>
                                    <td className="px-4 py-3 text-gray-900">{article.title}</td>
                                    <td className="px-4 py-3 text-gray-700">{article.category}</td>
                                    <td className="px-4 py-3 text-gray-700">{article.date}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex space-x-2">
                                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                                <Icon icon="tabler:edit" className="text-gray-600" width={16} height={16} />
                                            </button>
                                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                                <Icon icon="tabler:bookmark" className="text-gray-600" width={16} height={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-3 text-center text-gray-700">
                                    No articles found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <AddModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    )
}

export default AdminManagement