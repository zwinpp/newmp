// src/components/Pagination.jsx

import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // สร้าง array ของหมายเลขหน้าเพื่อนำไป map
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // ฟังก์ชันป้องกันไม่ให้เปลี่ยนหน้าไปน้อยกว่า 1 หรือมากกว่าหน้าสุดท้าย
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // ไม่ต้องแสดงผลถ้ามีแค่หน้าเดียวหรือไม่มีเลย
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-8">
      {/* ปุ่ม Previous */}
      <div className="flex w-0 flex-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:text-gray-300 disabled:hover:border-transparent"
        >
          <ChevronLeftIcon className="mr-3 h-5 w-5" aria-hidden="true" />
          ก่อนหน้า
        </button>
      </div>

      {/* หมายเลขหน้า (สำหรับหน้าจอขนาดกลางขึ้นไป) */}
      <div className="hidden md:flex">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
              currentPage === number
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* ปุ่ม Next */}
      <div className="flex w-0 flex-1 justify-end">
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:text-gray-300 disabled:hover:border-transparent"
        >
          หน้าถัดไป
          <ChevronRightIcon className="ml-3 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;