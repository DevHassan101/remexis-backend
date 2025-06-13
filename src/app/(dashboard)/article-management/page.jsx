// "use client"
// import Modal from '../../../components/ui/Modal'
// import {  dashBoardArticles, usersData } from '../../../constants/data'
// import { Icon } from '@iconify/react'
// import React, { useRef, useState, useEffect } from 'react'

// const AddModal = ({ setIsModalOpen, isModalOpen, onArticleAdded }) => {
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState('');
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const fileInputRef = useRef(null);
//   const [loading, setLoading] = useState(false); // Fixed typo: loadin -> loading
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [publishDate, setPublishDate] = useState('');
//   const [banner, setBanner] = useState('');

//   const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
//   const maxSize = 1 * 1024 * 1024; // 1MB in bytes

//   const handleFileChange = (file) => {
//     if (!file) return;

//     // Validate file type
//     if (!allowedFormats.includes(file.type)) {
//       setError('Only JPG, JPEG, and PNG files are allowed.');
//       return;
//     }

//     // Validate file size
//     if (file.size > maxSize) {
//       setError('File size exceeds 1MB limit.');
//       return;
//     }

//     setError('');
//     // Simulate upload progress
//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += 10;
//       setUploadProgress(progress);
//       if (progress >= 100) {
//         clearInterval(interval);
//         setUploadProgress(0);
//         // Create object URL for preview
//         const imageUrl = URL.createObjectURL(file);
//         setImage(imageUrl);
//       }
//     }, 200);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files[0];
//     handleFileChange(file);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleInputChange = (e) => {
//     const file = e.target.files[0];
//     setBanner(file);
//     handleFileChange(file);
//   };

//   const removeImage = () => {
//     setImage(null);
//     setError('');
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const resetForm = () => {
//     setImage(null);
//     setError('');
//     setUploadProgress(0);
//     setTitle('');
//     setCategory('');
//     setDescription('');
//     setPublishDate('');
//     setBanner('');
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const storeArticle = async (e) => {
//     e.preventDefault();
//     setError("")
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("category", category);
//     formData.append("description", description);
//     formData.append("publishDate", publishDate);
//     formData.append("banner", banner);

//     try {
//       const result = await fetch('/api/admin/article', {
//         method: "POST",
//         body: formData
//       })

//       if (result.ok) {
//         const data = await result.json();
//         console.log('Article added:', data);
//         resetForm();
//         setIsModalOpen(false);
//         // Notify parent component to refresh articles
//         if (onArticleAdded) {
//           onArticleAdded();
//         }
//       } else {
//         setError("Failed to add article");
//       }
//     } catch (error) {
//       console.error(error); // Fixed: was 'issue'
//       setError("Something went wrong")
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Modal
//       isOpen={isModalOpen}
//       onClose={() => {
//         setIsModalOpen(false);
//         resetForm();
//       }}
//       title="Article Management"
//       width="max-w-5xl"
//     >
//       <form onSubmit={storeArticle}>
//         <div className="w-full bg-white p-6 space-y-6">
//           {/* Title Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter Your Title"
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Category Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value=''>Select Category</option>
//               <option value='technology'>Technology</option>
//               <option value='lifestyle'>Lifestyle</option>
//               <option value='education'>Education</option>
//               <option value='health'>Health</option>
//             </select>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               rows="4"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter Your Description"
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             ></textarea>
//           </div>

//           {/* Schedule Publish Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Publish Date</label>
//             <input
//               type="date"
//               value={publishDate}
//               onChange={(e) => setPublishDate(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Image Upload */}
//           <div
//             className={`border ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-400'} border-dashed rounded-md p-6 text-center relative transition-colors duration-200`}
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//           >
//             <input
//               type="file"
//               accept="image/jpeg,image/jpg,image/png"
//               className="hidden"
//               ref={fileInputRef}
//               onChange={handleInputChange}
//             />
//             {image ? (
//               <div className="relative">
//                 <img
//                   src={image}
//                   alt="Uploaded preview"
//                   className="max-h-64 mx-auto rounded-md object-contain"
//                 />
//                 <button
//                   type="button"
//                   onClick={removeImage}
//                   className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
//                   aria-label="Remove image"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <div className="flex justify-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-10 w-10 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 15a4 4 0 004 4h10a4 4 0 004-4m-4-4l-4-4m0 0l-4 4m4-4v12"
//                     />
//                   </svg>
//                 </div>
//                 <p className="text-sm mt-2">
//                   <span
//                     className="text-blue-600 cursor-pointer hover:underline"
//                     onClick={handleClick}
//                   >
//                     Click to upload
//                   </span>{' '}
//                   or drag and drop
//                   <br />
//                   <span className="text-xs text-gray-500">JPG, JPEG, PNG less than 1MB</span>
//                 </p>
//                 {uploadProgress > 0 && (
//                   <div className="mt-4">
//                     <div className="w-full bg-gray-200 rounded-full h-2.5">
//                       <div
//                         className="bg-blue-600 h-2.5 rounded-full transition-all duration-200"
//                         style={{ width: `${uploadProgress}%` }}
//                       ></div>
//                     </div>
//                     <p className="text-xs text-gray-600 mt-1">Uploading: {uploadProgress}%</p>
//                   </div>
//                 )}
//               </div>
//             )}
//             {error && (
//               <p className="text-red-500 text-xs mt-2">{error}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className='px-6 py-2 rounded-md bg-primary-main cursor-pointer hover:bg-primary-700 duration-300 transition-all flex items-center text-white whitespace-nowrap'
//           >
//             {loading ? 'Submitting...' : 'Add Article'}
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// function VisitorManagement() {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [articles, setArticles] = useState([]) // Moved articles state here
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   // Fetch articles function
//   const getArticles = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch('/api/admin/article', {
//         method: 'GET',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('API Response:', data); // Debug log

//         // Handle different response structures
//         if (Array.isArray(data)) {
//           setArticles(data);
//         } else if (data.articles && Array.isArray(data.articles)) {
//           setArticles(data.articles);
//         } else if (data.data && Array.isArray(data.data)) {
//           setArticles(data.data);
//         } else {
//           console.error('Unexpected API response structure:', data);
//           setArticles([]);
//           setError('Invalid response format');
//         }
//       } else {
//         setError('Failed to fetch articles');
//         setArticles([]); // Ensure articles is always an array
//       }
//     } catch (error) {
//       console.error('Error fetching articles:', error);
//       setError('Error fetching articles');
//       setArticles([]); // Ensure articles is always an array
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch articles on component mount
//   useEffect(() => {
//     getArticles();
//   }, []);

//   // Filter articles based on search term (with safety check)
//   const filteredArticles = Array.isArray(articles) ? articles.filter(article =>
//     article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     article.category?.toLowerCase().includes(searchTerm.toLowerCase())
//   ) : [];

//   // Handle search input change
//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value)
//   }

//   // Handle article added - refresh the list
//   const handleArticleAdded = () => {
//     getArticles();
//   }

//   return (
//     <div className='px-6 py-8'>
//       <h6 className='text-3xl font-bold mb-3'>
//         Article Management
//       </h6>
//       <div className='flex flex-1 justify-between items-center mb-5'>
//         <div>
//           <div className='flex items-center gap-1.5 text-sm font-bold'>
//             <span className='text-primary-main'>Dashboard</span>
//             <span> <Icon icon="ic:outline-greater-than" /> </span>
//             <span className='text-gray-400'>Articles Management</span>
//           </div>
//         </div>
//         <div className='flex flex-1 gap-2 h-fit justify-end items-end'>
//           <button
//             onClick={() => setIsModalOpen(!isModalOpen)}
//             className='px-6 py-2 rounded-md bg-primary-main cursor-pointer hover:bg-primary-700 duration-300 transition-all flex items-center text-white whitespace-nowrap'
//           >
//             <Icon icon="iconoir:plus" width="20" height="20" className='inline-block' />
//             <span className='mt-0.5'>
//               Add New
//             </span>
//           </button>
//           <div className='flex items-center max-w-xs w-full border py-1 px-2 gap-1.5 rounded-md border-gray-400'>
//             <Icon icon="iconamoon:search" width="24" height="24" className='text-gray-400' />
//             <input
//               type="text"
//               className='w-full py-1 focus:outline-none'
//               placeholder='Search'
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//           </div>
//         </div>
//       </div>

//       {error && (
//         <div className='mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
//           {error}
//         </div>
//       )}

//       <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white p-4">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left font-medium text-gray-700">Title</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-700">Category</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-700">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {loading ? (
//               <tr>
//                 <td colSpan="4" className="px-4 py-3 text-center text-gray-700">
//                   Loading articles...
//                 </td>
//               </tr>
//             ) : filteredArticles.length > 0 ? (
//               filteredArticles.map((article) => (
//                 <tr key={article.id}>
//                   <td className="px-4 py-3 text-gray-900">{article.title}</td>
//                   <td className="px-4 py-3 text-gray-700">{article.category}</td>
//                   <td className="px-4 py-3 text-gray-700">
//                     {article.publishDate || article.date}
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex space-x-2">
//                       <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
//                         <Icon icon="tabler:edit" className="text-gray-600" width={16} height={16} />
//                       </button>
//                       <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
//                         <Icon icon="tabler:bookmark" className="text-gray-600" width={16} height={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="px-4 py-3 text-center text-gray-700">
//                   No articles found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <AddModal
//         isModalOpen={isModalOpen}
//         setIsModalOpen={setIsModalOpen}
//         onArticleAdded={handleArticleAdded}
//       />
//     </div>
//   )
// }

// export default VisitorManagement

"use client";
import Modal from "../../../components/ui/Modal";
import { dashBoardArticles, usersData } from "../../../constants/data";
import { Icon } from "@iconify/react";
import React, { useRef, useState, useEffect } from "react";

const AddEditModal = ({
  setIsModalOpen,
  isModalOpen,
  onArticleAdded,
  editingArticle,
  setEditingArticle,
}) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [banner, setBanner] = useState("");

  const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
  const maxSize = 1 * 1024 * 1024; // 1MB in bytes

  // Initialize form with editing article data
  useEffect(() => {
    if (editingArticle) {
      setTitle(editingArticle.title || "");
      setCategory(editingArticle.category || "");
      setDescription(editingArticle.description || "");
      setPublishDate(
        editingArticle.publishDate
          ? editingArticle.publishDate.split("T")[0]
          : ""
      );
      if (editingArticle.banner) {
        setImage(editingArticle.banner);
      }
    }
  }, [editingArticle]);

  const handleFileChange = (file) => {
    if (!file) return;

    // Validate file type
    if (!allowedFormats.includes(file.type)) {
      setError("Only JPG, JPEG, and PNG files are allowed.");
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setError("File size exceeds 1MB limit.");
      return;
    }

    setError("");
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress(0);
        // Create object URL for preview
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
      }
    }, 200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    setBanner(file);
    handleFileChange(file);
  };

  const removeImage = () => {
    setImage(null);
    setBanner("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setImage(null);
    setError("");
    setUploadProgress(0);
    setTitle("");
    setCategory("");
    setDescription("");
    setPublishDate("");
    setBanner("");
    setEditingArticle(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const storeArticle = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("publishDate", publishDate);

    // Only append banner if it's a new file
    if (banner instanceof File) {
      formData.append("banner", banner);
    }

    try {
      const isEditing = !!editingArticle;
      const url = isEditing
        ? `/api/admin/article/${editingArticle.id}`
        : "/api/admin/article";
      const method = isEditing ? "PUT" : "POST";

      const result = await fetch(url, {
        method: method,
        body: formData,
      });

      if (result.ok) {
        const data = await result.json();
        console.log(isEditing ? "Article updated:" : "Article added:", data);
        resetForm();
        setIsModalOpen(false);
        // Notify parent component to refresh articles
        if (onArticleAdded) {
          onArticleAdded();
        }
      } else {
        const errorData = await result.json();
        setError(
          errorData.error || `Failed to ${isEditing ? "update" : "add"} article`
        );
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const modalTitle = editingArticle ? "Edit Article" : "Add Article";

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        resetForm();
      }}
      title="Article Management"
      width="max-w-5xl"
    >
      <form onSubmit={storeArticle}>
        <div className="w-full bg-white p-6 space-y-6">
          <h3 className="text-lg font-semibold">{modalTitle}</h3>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Your Title"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Your Description"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Schedule Publish Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Schedule Publish Date
            </label>
            <input
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div
            className={`border ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-400"
              } border-dashed rounded-md p-6 text-center relative transition-colors duration-200`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              className="hidden"
              ref={fileInputRef}
              onChange={handleInputChange}
            />
            {image ? (
              <div className="relative">
                <img
                  src={image}
                  alt="Uploaded preview"
                  className="max-h-64 mx-auto rounded-md object-contain"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  aria-label="Remove image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h10a4 4 0 004-4m-4-4l-4-4m0 0l-4 4m4-4v12"
                    />
                  </svg>
                </div>
                <p className="text-sm mt-2">
                  <span
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={handleClick}
                  >
                    Click to upload
                  </span>{" "}
                  or drag and drop
                  <br />
                  <span className="text-xs text-gray-500">
                    JPG, JPEG, PNG less than 1MB
                  </span>
                </p>
                {uploadProgress > 0 && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Uploading: {uploadProgress}%
                    </p>
                  </div>
                )}
              </div>
            )}
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-md bg-primary-main cursor-pointer hover:bg-primary-700 duration-300 transition-all flex items-center text-white whitespace-nowrap"
          >
            {loading
              ? editingArticle
                ? "Updating..."
                : "Submitting..."
              : editingArticle
                ? "Update Article"
                : "Add Article"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

function VisitorManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingArticle, setEditingArticle] = useState(null);

  // Fetch articles function
  const getArticles = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/article", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);

        // Handle different response structures
        if (Array.isArray(data)) {
          setArticles(data);
        } else if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else if (data.data && Array.isArray(data.data)) {
          setArticles(data.data);
        } else {
          console.error("Unexpected API response structure:", data);
          setArticles([]);
          setError("Invalid response format");
        }
      } else {
        setError("Failed to fetch articles");
        setArticles([]);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Error fetching articles");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete article function
  const deleteArticle = async (articleId) => {
    if (!confirm("Are you sure you want to delete this article?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/article/${articleId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh articles list
        getArticles();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting article");
    }
  };

  // Handle edit button click
  const handleEditClick = (article) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  // Handle add new button click
  const handleAddNewClick = () => {
    setEditingArticle(null);
    setIsModalOpen(true);
  };

  // Fetch articles on component mount
  useEffect(() => {
    getArticles();
  }, []);

  // Filter articles based on search term (with safety check)
  const filteredArticles = Array.isArray(articles)
    ? articles.filter(
      (article) =>
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle article added/updated - refresh the list
  const handleArticleAdded = () => {
    getArticles();
  };

  return (
    <div className="px-6 py-8">
      <h6 className="text-3xl font-bold mb-3">Article Management</h6>
      <div className="flex flex-1 justify-between items-center mb-5">
        <div>
          <div className="flex items-center gap-1.5 text-sm font-bold">
            <span className="text-primary-main">Dashboard</span>
            <span>
              {" "}
              <Icon icon="ic:outline-greater-than" />{" "}
            </span>
            <span className="text-gray-400">Articles Management</span>
          </div>
        </div>
        <div className="flex flex-1 gap-2 h-fit justify-end items-end">
          <button
            onClick={handleAddNewClick}
            className="px-6 py-2 rounded-md bg-primary-main cursor-pointer hover:bg-primary-700 duration-300 transition-all flex items-center text-white whitespace-nowrap"
          >
            <Icon
              icon="iconoir:plus"
              width="20"
              height="20"
              className="inline-block"
            />
            <span className="mt-0.5">Add New</span>
          </button>
          <div className="flex items-center max-w-xs w-full border py-1 px-2 gap-1.5 rounded-md border-gray-400">
            <Icon
              icon="iconamoon:search"
              width="24"
              height="24"
              className="text-gray-400"
            />
            <input
              type="text"
              className="w-full py-1 focus:outline-none"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white p-4">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Title
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-4 py-3 text-center text-gray-700">
                  Loading articles...
                </td>
              </tr>
            ) : filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <tr key={article.id}>
                  <td className="px-4 py-3 text-gray-900">{article.title}</td>
                  <td className="px-4 py-3 text-gray-700 capitalize">
                    {article.category}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(
                      article.publishDate || article.date
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(article)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        title="Edit Article"
                      >
                        <Icon
                          icon="tabler:edit"
                          width={16}
                          height={16}
                        />
                      </button>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        title="Delete Article"
                      >
                        <Icon
                          icon="tabler:trash"
                          // className="text-red-600"
                          width={16}
                          height={16}
                        />
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

      <AddEditModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onArticleAdded={handleArticleAdded}
        editingArticle={editingArticle}
        setEditingArticle={setEditingArticle}
      />
    </div>
  );
}

export default VisitorManagement;
