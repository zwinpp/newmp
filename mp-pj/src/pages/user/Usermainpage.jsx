// src/pages/Usermainpage.jsx

import React, { useState, useEffect } from 'react';
import UserStatusDropdown from '../../components/UserStatusDropdown';
import UserListTable from '../../components/UserListTable'; // <-- Import คอมโพเนนต์ตารางใหม่
import Pagination from '../../components/Pagination';

// ข้อมูลจำลอง สมมติว่าดึงมาจาก API หรือฐานข้อมูล
const mockApiData = [
  { id: 1, documentNumber: 'PQ24110012', documentDate: '23/11/2024', department: 'เชื่อมเชฟ', managerStatus: 'ผ่านการอนุมัติ', hrStatus: 'ผ่านการอนุมัติ', adminStatus: 'ผ่านการอนุมัติ', dueDate: '29/12/2024' },
  { id: 2, documentNumber: 'PQ24110013', documentDate: '24/11/2024', department: 'การตลาด', managerStatus: 'ผ่านการอนุมัติ', hrStatus: 'รออนุมัติ', adminStatus: 'รออนุมัติ', dueDate: '30/12/2024' },
  { id: 3, documentNumber: 'PQ24110014', documentDate: '25/11/2024', department: 'บัญชี', managerStatus: 'ไม่อนุมัติ', hrStatus: '-', adminStatus: '-', dueDate: '01/01/2025' },
  { id: 4, documentNumber: 'PQ24110015', documentDate: '26/11/2024', department: 'บุคคล', managerStatus: 'ผ่านการอนุมัติ', hrStatus: 'ผ่านการอนุมัติ', adminStatus: 'ผ่านการอนุมัติ', dueDate: '02/01/2025' },
  { id: 5, documentNumber: 'PQ24110016', documentDate: '27/11/2024', department: 'ไอที', managerStatus: 'ผ่านการอนุมัติ', hrStatus: 'รออนุมัติ', adminStatus: 'รออนุมัติ', dueDate: '03/01/2025' },
  { id: 6, documentNumber: 'PQ24110017', documentDate: '28/11/2024', department: 'จัดซื้อ', managerStatus: 'ผ่านการอนุมัติ', hrStatus: 'ผ่านการอนุมัติ', adminStatus: 'ผ่านการอนุมัติ', dueDate: '04/01/2025' },
  { id: 7, documentNumber: 'PQ24110018', documentDate: '29/11/2024', department: 'ผลิต', managerStatus: 'ผ่านการอนุมัติ', hrStatus: 'ผ่านการอนุมัติ', adminStatus: 'รออนุมัติ', dueDate: '05/01/2025' },
  { id: 8, documentNumber: 'PQ24110019', documentDate: '30/11/2024', department: 'คลังสินค้า', managerStatus: 'ผ่านการอนุมัติ', hrStatus: 'ผ่านการอนุมัติ', adminStatus: 'ผ่านการอนุมัติ', dueDate: '06/01/2025' },
  { id: 9, documentNumber: 'PQ24110020', documentDate: '01/12/2024', department: 'ซ่อมบำรุง', managerStatus: 'ผ่านการอนุมัติ', hrStatus: 'ผ่านการอนุมัติ', adminStatus: 'ผ่านการอนุมัติ', dueDate: '07/01/2025' },
  { id: 10, documentNumber: 'PQ24110021', documentDate: '02/12/2024', department: 'การตลาด', managerStatus: 'รออนุมัติ', hrStatus: 'รออนุมัติ', adminStatus: 'รออนุมัติ', dueDate: '08/01/2025' },
  { id: 11, documentNumber: 'PQ24110022', documentDate: '03/12/2024', department: 'บุคคล', managerStatus: 'ผ่านการอนุมัติ', hrStatus: 'ผ่านการอนุมัติ', adminStatus: 'ผ่านการอนุมัติ', dueDate: '09/01/2025' },
  { id: 12, documentNumber: 'PQ24110023', documentDate: '04/12/2024', department: 'บัญชี', managerStatus: 'ผ่านการอนุมัติ', hrStatus: 'ผ่านการอนุมัติ', adminStatus: 'ผ่านการอนุมัติ', dueDate: '10/01/2025' },
];

const Usermainpage = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // useEffect ใช้สำหรับจำลองการดึงข้อมูลเมื่อคอมโพเนนต์ถูกโหลดครั้งแรก
  useEffect(() => {
    // ในโปรเจกต์จริง ส่วนนี้จะเป็นการเรียก API ด้วย fetch() หรือ axios
    // แต่ตอนนี้เราจะจำลองด้วย setTimeout
    console.log("เริ่มดึงข้อมูลเอกสาร...");
    setTimeout(() => {
      setDocuments(mockApiData); // นำข้อมูลจำลองมาใส่ใน state
      setIsLoading(false);      // ตั้งค่า loading เป็น false เมื่อข้อมูลมาแล้ว
      console.log("ดึงข้อมูลสำเร็จ!");
    }, 1000); 
  }, []); // [] หมายถึงให้ useEffect ทำงานแค่ครั้งเดียวตอนเริ่มต้น

    const handleStatusChange = (statusValue) => {
    setSelectedStatus(statusValue);
    setCurrentPage(1);
  };
  
  // ... โค้ดส่วน filter, pagination, delete เหมือนเดิมทั้งหมด ...
    const filteredDocuments = documents.filter(doc => {
      if (selectedStatus === '') {
        return true;
      }
      return doc.managerStatus === selectedStatus || 
            doc.hrStatus === selectedStatus || 
            doc.adminStatus === selectedStatus;
    });

    const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    const currentDocuments = filteredDocuments
    .slice(indexOfFirstItem, indexOfLastItem)
    .map((doc, index) => ({
      ...doc, 
      itemNumber: indexOfFirstItem + index + 1,
    }));

  // ฟังก์ชันสำหรับเปลี่ยนหน้า
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  // ฟังก์ชันจัดการการลบ
  const handleDelete = (documentId, documentNumber) => {
    if (window.confirm(`คุณต้องการลบเอกสารเลขที่ "${documentNumber}" ใช่หรือไม่?`)) {
      console.log(`กำลังส่งคำขอลบเอกสาร ID: ${documentId} ไปยังเซิร์ฟเวอร์...`);
      // ในโปรเจกต์จริง:
      // 1. เรียก API เพื่อลบข้อมูลที่เซิร์ฟเวอร์
      // 2. เมื่อสำเร็จ ให้อัปเดต state ในหน้าเว็บเพื่อลบแถวนั้นออกไป
      setDocuments(currentDocuments => 
        currentDocuments.filter(doc => doc.id !== documentId)
      );
      alert(`เอกสาร "${documentNumber}" ถูกลบเรียบร้อยแล้ว`);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen rounded-md">
      <h2 className="text-2xl font-semibold text-gray-500 mb-8">รายการ</h2>
      <hr className="border-t border-gray-300 mb-8" />
      <div className="mb-6">
        <div className="flex items-end space-x-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-2">ค้นหา</label>
            <UserStatusDropdown 
              value={selectedStatus}
              onChange={handleStatusChange}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Search
          </button>
        </div>
      </div>

      {/* เรียกใช้คอมโพเนนต์ตาราง และส่ง props ที่จำเป็นไปให้ */}
      <UserListTable
        documents={currentDocuments}
        isLoading={isLoading}
        onDelete={handleDelete}
      />
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
 
export default Usermainpage;