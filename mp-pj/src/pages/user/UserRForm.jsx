import React, { useState, useEffect } from 'react';

const UserRForm = () => {
  const [formData, setFormData] = useState({
    documentDate: '',
    department: '',
    section: '',
    employmentType: '',
    contractType: '',
    requestReason: '',
    requesterName: '',
    positionId: '',
    positionRequire: '',
    ageFrom: '',
    ageTo: '',
    gender: '',
    nationality: '',
    experience: '',
    educationLevel: '',
    specialQualifications: ''
  });

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    setFormData(prev => ({ ...prev, documentDate: formattedDate }));
  }, []);

  const departments = ['ฝ่ายบริหาร', 'ฝ่ายการเงิน', 'ฝ่ายบัญชี', 'ฝ่ายทรัพยากรบุคคล'];
  // ... (other arrays)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // ... (other handler functions)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.ageFrom && formData.ageTo && parseInt(formData.ageFrom) > parseInt(formData.ageTo)) {
      showNotification('อายุเริ่มต้นต้องน้อยกว่าหรือเท่ากับอายุสิ้นสุด', 'error');
      return;
    }

    console.log('📤 กำลังส่งข้อมูล:', formData);

    try {
      // --- แก้ไขบรรทัดนี้ ---
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` // Uncomment in the future
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        showNotification('บันทึกข้อมูลสำเร็จ!', 'success');
        setTimeout(() => handleClear(), 1500);
      } else {
        showNotification('เกิดข้อผิดพลาด: ' + (data.message || 'Unknown server error'), 'error');
      }
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ:', error);
      showNotification('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์', 'error');
    }
  };

  return (
    <div className="min-h-screen p-5 bg-gray-50">
      {/* ... (JSX content is unchanged) ... */}
    </div>
  );
};

export default UserRForm;