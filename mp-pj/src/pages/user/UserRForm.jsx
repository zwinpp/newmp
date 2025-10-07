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
  const sections = ['แผนกธุรการ', 'แผนกบัญชี', 'แผนกจัดซื้อ'];
  const employmentTypes = ['รายเดือน', 'รายวัน', 'ชั่วคราว'];
  const contractTypes = ['สัญญาไม่มีกำหนดระยะเวลาเวลา', 'สัญญาจ้างแบบมีระยะเวลา'];
  const requestReasons = ['เพิ่มอัตรากำลังพล', 'แทนตำแหน่งที่ว่าง'];
  const genders = ['ชาย', 'หญิง', 'ไม่ระบุ'];
  const nationalities = ['ไทย', 'อเมริกัน', 'จีน', 'ญี่ปุ่น', 'เกาหลี', 'อื่นๆ'];
  const experiences = ['ไม่มีประสบการณ์', '1-2 ปี', '3-5 ปี', '5-10 ปี', 'มากกว่า 10 ปี'];
  const educationLevels = ['ม.3', 'ม.6', 'ปวช.', 'ปวส.', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก', 'ไม่จำกัดวุฒิ'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ฟังก์ชันจัดการการกรอกวันที่
  const handleDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // เอาเฉพาะตัวเลข

    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }

    setFormData(prev => ({ ...prev, documentDate: value }));
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
  };

  // ฟังก์ชันเคลียร์ข้อมูล
  const handleClear = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    setFormData({
      documentDate: formattedDate,
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
    showNotification('ล้างข้อมูลเรียบร้อย', 'success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation อายุ
    if (formData.ageFrom && formData.ageTo) {
      if (parseInt(formData.ageFrom) > parseInt(formData.ageTo)) {
        showNotification('อายุเริ่มต้นต้องน้อยกว่าหรือเท่ากับอายุสิ้นสุด', 'error');
        console.error('❌ Validation Error: อายุไม่ถูกต้อง');
        return;
      }
    }

    console.log('📤 กำลังส่งข้อมูล:', formData);

    try {
      const response = await fetch('http://localhost:3001/api/employment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      console.log('📥 Response จาก Server:', data);

      if (data.success) {
        console.log('✅ บันทึกข้อมูลสำเร็จ! ID:', data.id);
        showNotification('บันทึกข้อมูลสำเร็จ!', 'success');
        // Reset form after successful submission
        setTimeout(() => handleClear(), 1500);
      } else {
        console.error('❌ บันทึกไม่สำเร็จ:', data.message);
        showNotification('เกิดข้อผิดพลาด: ' + data.message, 'error');
      }
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ:', error);
      showNotification('เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
    }
  };

  return (
    <div className="min-h-screen p-5 bg-gray-50">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">ใบร้องขอกำลังคน</h2>

        <hr className="my-12 h-0.5 border-t-0 bg-neutral-200 opacity-100" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">วันที่เอกสาร</label>
              <input
                type="text"
                name="documentDate"
                value={formData.documentDate}
                onChange={handleDateChange}
                placeholder="DD/MM/YYYY"
                maxLength="10"
                required
                className="w-64 max-w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ฝ่าย</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white"
              >
                <option value="">-- เลือกฝ่าย --</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">แผนก</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white"
              >
                <option value="">-- เลือกแผนก --</option>
                {sections.map((section, index) => (
                  <option key={index} value={section}>{section}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ประเภทการจ้าง</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white"
              >
                <option value="">-- เลือกประเภทการจ้าง --</option>
                {employmentTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ประเภทสัญญาจ้าง</label>
              <select
                name="contractType"
                value={formData.contractType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white"
              >
                <option value="">-- เลือกประเภทสัญญา --</option>
                {contractTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">เหตุผลที่ร้องขอ</label>
              <select
                name="requestReason"
                value={formData.requestReason}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white"
              >
                <option value="">-- เลือกเหตุผล --</option>
                {requestReasons.map((reason, index) => (
                  <option key={index} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อผู้ร้องขอ</label>
              <input
                type="text"
                name="requesterName"
                value={formData.requesterName}
                onChange={handleChange}
                placeholder=""
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
            </div>
          </div>

          <hr className="my-12 h-0.5 border-t-0 bg-neutral-200 opacity-100" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">รหัสตำแหน่งงาน</label>
              <input
                type="text"
                name="positionId"
                value={formData.positionId}
                onChange={handleChange}
                placeholder=""
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ตำแหน่งที่ต้องการ</label>
              <input
                type="text"
                name="positionRequire"
                value={formData.positionRequire}
                onChange={handleChange}
                placeholder=""
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
            </div>
          </div>

          <hr className="my-12 h-0.5 border-t-0 bg-neutral-200 opacity-100" />

          {/* ส่วนคุณสมบัติผู้สมัคร */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">คุณสมบัติ</h3>
          </div>

          {/* อายุตั้งแต่ - ถึงอายุ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">อายุตั้งแต่ (ปี)</label>
              <input
                type="number"
                name="ageFrom"
                value={formData.ageFrom}
                onChange={handleChange}
                placeholder="18"
                min="15"
                max="100"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ถึงอายุ (ปี)</label>
              <input
                type="number"
                name="ageTo"
                value={formData.ageTo}
                onChange={handleChange}
                placeholder="60"
                min="15"
                max="100"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
            </div>
          </div>

          {/* เพศ และ สัญชาติ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">เพศ</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white"
              >
                <option value="">-- เลือกเพศ --</option>
                {genders.map((gender, index) => (
                  <option key={index} value={gender}>{gender}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">สัญชาติ</label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white"
              >
                <option value="">-- เลือกสัญชาติ --</option>
                {nationalities.map((nationality, index) => (
                  <option key={index} value={nationality}>{nationality}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ประสบการณ์ และ ระดับการศึกษา */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ประสบการณ์</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white"
              >
                <option value="">-- เลือกประสบการณ์ --</option>
                {experiences.map((exp, index) => (
                  <option key={index} value={exp}>{exp}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ระดับการศึกษา</label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white"
              >
                <option value="">-- เลือกระดับการศึกษา --</option>
                {educationLevels.map((level, index) => (
                  <option key={index} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* คุณสมบัติพิเศษ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">คุณสมบัติพิเศษ</label>
            <textarea
              name="specialQualifications"
              value={formData.specialQualifications}
              onChange={handleChange}
              placeholder=""
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
            />
          </div>

          <hr className="my-12 h-0.5 border-t-0 bg-neutral-200 opacity-100" />

          {/* ปุ่มบันทึกและเคลียร์ */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              บันทึกข้อมูล
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              claer
            </button>
          </div>

        </form>
      </div>

      {notification.show && (
        <div className={`fixed top-5 right-5 flex items-center gap-4 px-6 py-4 rounded-xl shadow-2xl animate-slide-in z-50 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          <span className="text-2xl">{notification.type === 'success' ? '✓' : '✕'}</span>
          <span className="font-semibold text-lg">{notification.message}</span>
        </div>
      )}
    </div>
  );
};

export default UserRForm;