import React from 'react';

function Modal({ isOpen, onClose, title, children, className = '', width = 'max-w-md' }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-white/20 ">
            <div className={`bg-white w-full ${width} rounded-lg shadow-lg px-6 py-4 max-h-[95vh] overflow-y-auto  relative ${className} border border-gray-200`}>
                <div className='border-b border-gray-200 py-2 flex items-center justify-between'>
                    <h2 className="text-lg font-semibold mb-0">{title}</h2>
                    <button
                        onClick={onClose}
                        className=" text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div>{children}</div>
            </div>
        </div>
    );
}

export default Modal;
