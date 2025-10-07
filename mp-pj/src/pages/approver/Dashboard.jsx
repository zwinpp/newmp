import React, { useState, useEffect } from 'react';

// Component สำหรับการ์ดแสดงสถิติ (ใช้ซ้ำได้)
const StatCard = ({ title, value, isLoading }) => {
  return (
    <div className="w-full bg-gray-200 p-6 rounded-lg text-center shadow-md">
      <p className="text-gray-700">{title}</p>
      {isLoading ? (
        // Skeleton Loader ขณะรอข้อมูล
        <div className="h-12 mt-2 bg-gray-300 rounded-md animate-pulse"></div>
      ) : (
        <p className="text-5xl font-bold mt-1 text-gray-800">{value}</p>
      )}
    </div>
  );
};

// Component หลักของ Dashboard
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect ใช้สำหรับดึงข้อมูลเมื่อ component ถูก render ครั้งแรก
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // --- ส่วนจำลองการดึงข้อมูลจาก API ---
      // ในโปรเจกต์จริง ให้แทนที่ส่วนนี้ด้วยการเรียก API ของคุณ (เช่น fetch, axios)
      await new Promise(resolve => setTimeout(resolve, 1500)); // จำลองดีเลย์ 1.5 วินาที
      
      const apiData = {
        totalRequests: 20,
        approvedRequests: 12,
        pendingRequests: 8,
      };
      // --- จบส่วนจำลอง ---

      setDashboardData(apiData);
      setIsLoading(false);
    };

    fetchData();
  }, []); // dependency array ว่างเปล่าเพื่อให้ useEffect ทำงานแค่ครั้งเดียว

  // คำนวณเปอร์เซ็นต์สำหรับ Pie Chart
  // "รับเข้า" (pending) จะเป็นส่วนสีส้ม
  const pendingPercentage = dashboardData
    ? (dashboardData.pendingRequests / dashboardData.totalRequests) * 100
    : 0;

  // Style สำหรับ Pie Chart แบบ Donut โดยใช้ conic-gradient
  const pieChartStyle = {
    background: `conic-gradient(
      #F97316 ${pendingPercentage}%, 
      #FFFFFF 0
    )`,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-md min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-500 mb-8">Dashboard</h1>
        <hr className="my-4 border-gray-300" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* คอลัมน์ซ้าย: Pie Chart */}
          <div className="lg:col-span-2">
            <div className="bg-gray-200 p-6 rounded-lg shadow-md h-full flex flex-col sm:flex-row items-center justify-center gap-8 min-h-[250px]">
              {isLoading ? (
                // Skeleton Loader สำหรับ Chart
                <div className=" w-30 h-30 bg-gray-300 rounded-full animate-pulse"></div>
              ) : (
                // Pie Chart
                <div className="relative w-48 h-48">
                  <div
                    className="w-full h-full rounded-full"
                    style={pieChartStyle}
                  ></div>
                  {/* ส่วนที่สร้างรูตรงกลาง (Donut) */}
                  <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gray-200 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              )}
              {/* คำอธิบาย Chart (Legend) */}
              <div className="flex flex-col gap-4 text-lg mt-4 sm:mt-0">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-orange-500 rounded-full"></span>
                  <span>รับเข้า</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-white rounded-full border-2 border-gray-300"></span>
                  <span>ออก</span>
                </div>
              </div>
            </div>
          </div>

          {/* คอลัมน์ขวา: สถิติตัวเลข */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <StatCard
              title="บันทึกคำร้องทั้งหมด"
              value={dashboardData?.totalRequests}
              isLoading={isLoading}
            />
            <StatCard
              title="บันทึกคำร้องที่อนุมัติแล้ว"
              value={dashboardData?.approvedRequests}
              isLoading={isLoading}
            />
            <StatCard
              title="บันทึกคำร้องที่ยังไม่อนุมัติ"
              value={dashboardData?.pendingRequests}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;