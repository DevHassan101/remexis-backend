"use client";

import Sidebar from '../../../components/partials/ai-chat/SIdeBar';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import avatar from "../../../../public/assets/icons/man.png"
import { useTheme } from '../../../context/ThemeContext';


const PlusMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded-full hover:bg-gray-100 transition"
      >
        <Icon icon="ei:plus" width="28" height="28" />
      </button>

      {open && (
        <div className="absolute bottom-10 left-2 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Icon icon="fluent:image-24-regular" width="20" />
            <span className="text-sm">Image</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Icon icon="mdi:attachment" width="20" />
            <span className="text-sm">Files</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Icon icon="logos:google-drive" width="20" />
            <span className="text-sm">Add from Drive</span>
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
    <Icon icon={icon} width="20" className="text-gray-600" />
    <span>{label}</span>
  </div>
);

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Image
          alt="avatar-profile"
          src={avatar}
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      {open && (
        <div className="absolute top-9 right-0 mt-2 w-52 bg-white border border-gray-300 rounded-xl shadow-lg z-50 py-2">
          <span>
            <DropdownItem icon="mdi:account-outline" label="My Account" />
          </span>
          <DropdownItem icon="mdi:cog-outline" label="Setting" />
          <DropdownItem icon="mdi:help-circle-outline" label="Guide & FAQ" />
          <DropdownItem icon="mdi:logout" label="Logout" />
        </div>
      )}
    </div>
  );
};


function AiChat() {
 const { theme, toggleTheme } = useTheme();


  return (
    <>
      <div className={`transition-all duration-300 w-full`}>
        <div className="flex items-center justify-center h-full w-full flex-col">
          <h1 className="text-4xl mb-6 font-bold text-gray-800">How can i help you?</h1>

          <div className='max-w-3xl w-full mx-auto'>
            <div className='border  px-5 py-3 rounded-lg w-full border-gray-300'>
              <div className='flex flex-col gap-2'>
                <div className='flex items-start gap-2'>
                  <textarea
                    className="flex-1 focus:outline-none resize-none overflow-y-auto max-h-32 min-h-[3rem] w-full text-sm"
                    rows={0}
                    placeholder="Send a message"
                  />
                  <Icon
                    icon="tdesign:send-filled"
                    width="20"
                    height="20"
                    className='text-gray-500 cursor-pointer mt-2'
                  />
                </div>
                <div className='flex items-center mt-2 gap-2'>
                  <span>
                    <PlusMenu />
                  </span>

                  <button className='flex bg-gray-300 items-center gap-1 px-3 py-1 rounded-md'>
                    <Icon icon="material-symbols-light:delete-outline-rounded" width="20" height="20" className='text-red-500' />
                    Delete Last Generation
                  </button>

                  <button className='flex bg-gray-300 items-center gap-1.5 px-3 py-1 rounded-md'>
                    <Icon icon="f7:speaker-2" width="14" height="14" />
                    Listen
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 ">
              <div className="border rounded-lg border-gray-300 px-6 py-3 text-center ">
                <div className="flex justify-center mb-1.5 text-2xl text-gray-600">
                  <Icon icon="mdi:hospital-building" width="25" height="25" />
                </div>
                <h3 className="font-semibold text-base mb-2">Clinically Clear</h3>
                <p className="text-[13px] text-gray-600">
                  Get concise, jargon-free guidance distilled from peer-reviewed research.
                </p>
              </div>

              <div className="border rounded-lg border-gray-300 px-6 py-3 text-center ">
                <div className="flex justify-center mb-1.5 text-2xl text-gray-600">
                  <Icon icon="mdi:account-network" width="25" height="25" />
                </div>
                <h3 className="font-semibold text-base mb-2">Specialty-Tuned</h3>
                <p className="text-[13px] text-gray-600">
                  Responses adapt to your discipline—family medicine, pharmacy, nutrition, and more.
                </p>
              </div>

              <div className="border rounded-lg px-6 py-3 border-gray-300  text-center ">
                <div className="flex justify-center mb-1.5 text-2xl text-gray-600">
                  <Icon icon="mdi:timer-sand" width="25" height="25" />
                </div>
                <h3 className="font-semibold text-base mb-2">Faster Consults</h3>
                <p className="text-[13px] text-gray-600">
                  Reduce evidence search time to seconds, boosting workflow efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='absolute  px-3 py-2 bg-white shadow-lg top-8 right-10 rounded-4xl  flex items-center gap-2'>
        <div className='bg-blue-50 rounded-4xl px-4 flex items-center gap-2'>
          <Icon icon="tdesign:search" width="20" height="20" className='text-gray-600' />
          <input type="text" className=' focus:outline-0 py-1.5 text-sm ' placeholder='Search' />
        </div>
        <span><Icon icon="line-md:bell-loop" width="20" height="20" className='text-gray-400' /></span>
        <button onClick={toggleTheme}><Icon icon="si:moon-fill" width="16" height="16" className='text-gray-400' /></button>
        <span><Icon icon="material-symbols-light:info-outline-rounded" width="22" height="22" className='text-gray-600' /></span>

        <ProfileDropdown />

      </div>
    </>
  );
}

export default AiChat;
