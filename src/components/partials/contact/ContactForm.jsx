"use client";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would typically send the form data to your backend
    // For example:
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //
    //   if (response.ok) {
    //     // Handle success
    //   } else {
    //     // Handle error
    //   }
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }

    // Simulating form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      // Reset form after submission
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* Full Name Field */}
        <div>
          <label
            htmlFor="fullName"
            className="text-sm sm:text-base block font-medium text-[#7c7c96] mb-1.5 sm:mb-2.5"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="e.g. John"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 sm:p-5 bg-[#f4f4fe] rounded-md text-sm sm:text-base focus:outline-none"
            required
          />
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor="phone"
            className="text-sm sm:text-base block font-medium text-[#7c7c96] mb-1.5 sm:mb-2.5"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="e.g. +123 456"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 sm:p-5 bg-[#f4f4fe] rounded-md text-sm sm:text-base focus:outline-none"
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="text-sm sm:text-base block font-medium text-[#7c7c96] mb-1.5 sm:mb-2.5"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e.g. info@yoursite.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 sm:p-5 bg-[#f4f4fe] rounded-md text-sm sm:text-base focus:outline-none"
            required
          />
        </div>

        {/* Subject Field */}
        <div>
          <label
            htmlFor="subject"
            className="text-sm sm:text-base block font-medium text-[#7c7c96] mb-1.5 sm:mb-2.5"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="e.g. Question - Nadine Chen"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2.5 sm:p-5 bg-[#f4f4fe] rounded-md text-sm sm:text-base focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Message Field */}
      <div className="mb-6">
        <label
          htmlFor="message"
          className="text-sm sm:text-base block font-medium text-[#7c7c96] mb-1.5 sm:mb-2.5"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="3"
          placeholder="Write your message or question here..."
          value={formData.message}
          onChange={handleChange}
          className="w-full py-3 px-5 bg-[#f4f4fe] rounded-md text-sm sm:text-base focus:outline-none resize-none"
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-[#D16D31] text-sm sm:text-base md:text-lg font-medium text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-[#C05D21] transition-colors duration-300 focus:outline-none"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ContactForm;
