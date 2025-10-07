import React, { useState, useEffect, useRef } from 'react'; 
import UserStatusDropdown from '../../components/UserStatusDropdown';
import UserListTable from '../../components/UserListTable';
import Pagination from '../../components/Pagination';

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

const Approve = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const ITEMS_PER_PAGE = 10;

  
  const [inputDocNumber, setInputDocNumber] = useState('');// State สำหรับเก็บค่าที่แสดงใน input field
  const [inputStatus, setInputStatus] = useState('');
  const [filterDocNumber, setFilterDocNumber] = useState('');// State สำหรับเก็บค่าที่ใช้กรองข้อมูลจริงๆ
  const [filterStatus, setFilterStatus] = useState('');

  const docNumberInputRef = useRef(null);

  // useEffect ใช้สำหรับจำลองการดึงข้อมูลเมื่อคอมโพเนนต์ถูกโหลดครั้งแรก
  useEffect(() => {
    // ในโปรเจกต์จริง ส่วนนี้จะเป็นการเรียก API ด้วย fetch() หรือ axios
    console.log("เริ่มดึงข้อมูลเอกสาร...");
    setTimeout(() => {
      setDocuments(mockApiData); 
      setIsLoading(false);      
      console.log("ดึงข้อมูลสำเร็จ!");
    }, 1000);
  }, []); // [] หมายถึงให้ useEffect ทำงานแค่ครั้งเดียวตอนเริ่มต้น

  const handleSearch = () => {
    setFilterDocNumber(inputDocNumber);
    setFilterStatus(inputStatus);
    setCurrentPage(1); // กลับไปหน้าแรกทุกครั้งที่ค้นหา

     if (docNumberInputRef.current) {
      docNumberInputRef.current.blur();
    }
  };
  
  // จัดการการกด Enter ในช่องค้นหา
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearFilters = () => {
    setInputDocNumber('');
    setInputStatus('');
    setFilterDocNumber('');
    setFilterStatus('');
    setCurrentPage(1);
  };

   const filteredDocuments = documents.filter(doc => {
    const statusMatch = filterStatus === '' || 
      doc.managerStatus === filterStatus || 
      doc.hrStatus === filterStatus || 
      doc.adminStatus === filterStatus;
    
    const searchMatch = filterDocNumber === '' || 
      doc.documentNumber.toLowerCase().includes(filterDocNumber.toLowerCase());
    return statusMatch && searchMatch;
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
  const handleApprove = (docId, approverType) => {
    console.log(`Approving document ${docId} for role ${approverType}`);
    // TODO: เรียก API เพื่อส่งข้อมูลการอนุมัติ
    
    // อัปเดต UI ทันทีเพื่อประสบการณ์ที่ดีของผู้ใช้
    setDocuments(prevDocs => 
      prevDocs.map(doc => 
        doc.id === docId 
          ? { ...doc, [approverType]: 'ผ่านการอนุมัติ' } 
          : doc
      )
    );
  };

  const handleReject = (docId, approverType) => {
    console.log(`Rejecting document ${docId} for role ${approverType}`);
    // TODO: เรียก API เพื่อส่งข้อมูลการไม่อนุมัติ

    // อัปเดต UI ทันที
    setDocuments(prevDocs => 
      prevDocs.map(doc => 
        doc.id === docId 
          ? { ...doc, [approverType]: 'ไม่อนุมัติ' }
          : doc
      )
    );
  };
  
const currentUserRole  = 'admin';
  return (
    <div className="p-8 bg-white min-h-screen rounded-md">
      <h2 className="text-2xl font-semibold text-gray-500 mb-8">รายการอนุมัติ</h2>
      <hr className="border-t border-gray-300 mb-8" />

      {/* --- 3. อัปเดตส่วน JSX ของฟอร์มค้นหา --- */}
      <div className="mb-6">
        <div className="flex items-end space-x-4">

          {/* กล่องค้นหาเลขที่เอกสาร */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-2">เลขที่เอกสาร</label>
            <input
              ref={docNumberInputRef}
              type="text"
              className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputDocNumber}
              onChange={(e) => setInputDocNumber(e.target.value)}
              onKeyDown={handleKeyDown} 
            />
          </div>

          {/* กล่องเลือกสถานะ */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-2">สถานะ</label>
            <UserStatusDropdown
              value={inputStatus}
              onChange={(value) => setInputStatus(value)}
            />
          </div>
          <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Search
          </button>
          <button onClick={handleClearFilters} className="bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded-md">
            Clear
          </button>
        </div>
      </div>
 
      { !isLoading && filteredDocuments.length === 0 ? (
        // กรณีที่: โหลดเสร็จแล้ว แต่ไม่พบข้อมูลจากการค้นหา
        <div className="text-center py-12 border-t border-gray-200 mt-4">
          <p className="text-gray-500 text-lg">ไม่พบเอกสารที่ค้นหา</p>
          <p className="text-gray-400 text-sm mt-2">กรุณาลองตรวจสอบเลขที่เอกสารหรือสถานะอีกครั้ง</p>
        </div>
      ) : (
        // กรณีที่: กำลังโหลด หรือ พบข้อมูล
        <>
          <UserListTable
            documents={currentDocuments}
            isLoading={isLoading}
            role={currentUserRole } // <-- ส่ง role ที่ถูกต้องเข้าไป
            isApprovalMode={true} 
            onApprove={handleApprove}
            onReject={handleReject}
        />
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

    </div>
  );
}


export default Approve;