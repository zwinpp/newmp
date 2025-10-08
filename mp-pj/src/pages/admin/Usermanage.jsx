import React, { useState, useMemo } from 'react';
import UserRowmanage from '../../components/UserRowmanage';
import Pagination from '../../components/PaginationAdmin';
import AddUserModal from '../../components/AddUserModal';
import { SearchIcon, XIcon, PlusIcon } from '@heroicons/react/solid';

const initialUsers = [
  { id: 1, role: 'Admin', employeeId: 'E001', department: 'IT', position: 'Manager', firstName: 'สมชาย', lastName: 'ใจดี', email: 'somchai@example.com', password: 'pass123' },
  { id: 2, role: 'User', employeeId: 'E002', department: 'HR', position: 'Staff', firstName: 'สมหญิง', lastName: 'รักสงบ', email: 'somying@example.com', password: 'pass456' },
  { id: 3, role: 'Approver', employeeId: 'E003', department: 'Finance', position: 'Supervisor', firstName: 'วิชัย', lastName: 'มั่นคง', email: 'wichai@example.com', password: 'pass789' },
  { id: 4, role: 'User', employeeId: 'E004', department: 'Marketing', position: 'Officer', firstName: 'สุดา', lastName: 'แจ่มใส', email: 'suda@example.com', password: 'pass321' },
  { id: 5, role: 'Admin', employeeId: 'E005', department: 'IT', position: 'Developer', firstName: 'ประยุทธ', lastName: 'เก่งกาจ', email: 'prayut@example.com', password: 'pass654' },
  { id: 6, role: 'User', employeeId: 'E006', department: 'Sales', position: 'Executive', firstName: 'อรุณี', lastName: 'สดใส', email: 'arunee@example.com', password: 'pass987' },
  { id: 7, role: 'Approver', employeeId: 'E007', department: 'Operations', position: 'Manager', firstName: 'ธนพล', lastName: 'รุ่งเรือง', email: 'thanapol@example.com', password: 'pass147' },
  { id: 8, role: 'User', employeeId: 'E008', department: 'Customer Service', position: 'Agent', firstName: 'พิมพ์ใจ', lastName: 'อ่อนหวาน', email: 'pimjai@example.com', password: 'pass258' },
  { id: 9, role: 'Admin', employeeId: 'E009', department: 'IT', position: 'System Admin', firstName: 'ชัยวัฒน์', lastName: 'เข้มแข็ง', email: 'chaiwat@example.com', password: 'pass369' },
  { id: 10, role: 'User', employeeId: 'E010', department: 'HR', position: 'Recruiter', firstName: 'นภา', lastName: 'ใจงาม', email: 'napa@example.com', password: 'pass741' },
  { id: 11, role: 'Approver', employeeId: 'E011', department: 'Finance', position: 'Accountant', firstName: 'สมพร', lastName: 'มีสุข', email: 'somporn@example.com', password: 'pass852' },
  { id: 12, role: 'User', employeeId: 'E012', department: 'Marketing', position: 'Designer', firstName: 'วรรณา', lastName: 'สวยงาม', email: 'wanna@example.com', password: 'pass963' },
];

const ITEMS_PER_PAGE = 10;

function UserManage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) {
      return users;
    }
    return users.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`;
      return fullName.includes(searchTerm);
    });
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  // คำนวณจำนวนที่แสดงในหน้าปัจจุบัน
  const currentItemCount = paginatedUsers.length;
  const totalItemCount = filteredUsers.length;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleEditUser = (userId) => {
    const user = users.find(u => u.id === userId);
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้: ${user.firstName} ${user.lastName}?`)) {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
      alert(`ลบผู้ใช้ ${user.firstName} ${user.lastName} สำเร็จ`);
      if (paginatedUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleSaveUser = (userData) => {
    if (editingUser) {
      setUsers(prevUsers => 
        prevUsers.map(u => u.id === editingUser.id ? { ...userData, id: editingUser.id } : u)
      );
      alert('แก้ไขข้อมูลผู้ใช้งานสำเร็จ!');
    } else {
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const userToAdd = {
        id: newId,
        ...userData
      };
      setUsers(prevUsers => [userToAdd, ...prevUsers]);
      alert('เพิ่มผู้ใช้งานสำเร็จ!');
      setCurrentPage(1);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <br />
        <h1 className="text-3xl font-bold text-gray-800 mb-6">จัดการผู้ใช้งาน</h1>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาจากชื่อ-นามสกุล"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-80 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full sm:w-auto justify-center"
          >
            <PlusIcon className="w-5 h-5" />
            เพิ่มผู้ใช้งาน
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-center">บทบาท</th>
                <th className="px-6 py-3 text-center">รหัสพนักงาน</th>
                <th className="px-6 py-3 text-center">แผนก</th>
                <th className="px-6 py-3 text-center">ตำแหน่ง</th>
                <th className="px-6 py-3 text-left">ชื่อ</th>
                <th className="px-6 py-3 text-left">นามสกุล</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-center">รหัสผ่าน</th>
                <th className="px-6 py-3 text-center">จัดการ</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map(user => (
                  <UserRowmanage
                    key={user.id}
                    user={user}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-10 text-gray-500">
                    ไม่พบข้อมูลผู้ใช้งาน
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* แสดง Total และ Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Total ด้านซ้าย - รูปแบบ "Total: 10 of 12" */}
          <div className="text-sm text-gray-600">
            Total: <span className="font-semibold">{currentItemCount}</span> of{' '}
            <span className="font-semibold">{totalItemCount}</span>
          </div>

          {/* Pagination ด้านขวา */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        editingUser={editingUser}
      />
    </div>
  );
}

export default UserManage;