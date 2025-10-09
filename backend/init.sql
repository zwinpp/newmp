CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(10) DEFAULT 'Active'
);
CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(100) UNIQUE NOT NULL
);
CREATE TABLE positions (
    pos_id SERIAL PRIMARY KEY,
    pos_name VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(10) DEFAULT 'Active'
);

-- ---- START OF FIX ----
-- 4. ตารางพนักงาน (Employees) - เปลี่ยนคอลัมน์ password_hash
CREATE TABLE employees (
    employee_id VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL, -- เปลี่ยนจาก password_hash
    profile_image TEXT,
    pos_id INT REFERENCES positions(pos_id),
    dept_id INT REFERENCES departments(dept_id),
    role_id INT REFERENCES roles(role_id) NOT NULL,
    status VARCHAR(10) DEFAULT 'Active'
);
-- ---- END OF FIX ----

-- (ตาราง manpower_requests, approval_history เหมือนเดิม)
CREATE TABLE manpower_requests ( request_id SERIAL PRIMARY KEY, doc_number VARCHAR(50) UNIQUE NOT NULL, employee_id VARCHAR(50) REFERENCES employees(employee_id) NOT NULL, doc_date DATE NOT NULL DEFAULT CURRENT_DATE, requesting_dept_id INT REFERENCES departments(dept_id) NOT NULL, requesting_pos_id INT REFERENCES positions(pos_id) NOT NULL, employment_type VARCHAR(50) NOT NULL, contract_type VARCHAR(100) NOT NULL, reason TEXT, required_position_code VARCHAR(50) NOT NULL, required_position_name VARCHAR(100) NOT NULL, min_age INT, max_age INT, gender VARCHAR(20), nationality VARCHAR(50), experience VARCHAR(50), education_level VARCHAR(100), special_qualifications TEXT, current_status VARCHAR(50) DEFAULT 'รอ HR พิจารณา', target_hire_date DATE, approval_history_id INT, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE approval_history ( history_id SERIAL PRIMARY KEY, request_id INT REFERENCES manpower_requests(request_id) NOT NULL, approver_id VARCHAR(50) REFERENCES employees(employee_id) NOT NULL, decision VARCHAR(50) NOT NULL, notes TEXT, approval_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, step_name VARCHAR(100) NOT NULL, status VARCHAR(10) DEFAULT 'Active');

--- SEED DATA (ข้อมูลเริ่มต้น) ---

INSERT INTO roles (role_name) VALUES ('Admin'), ('Approve'), ('User');
INSERT INTO departments (dept_name) VALUES ('ฝ่ายบริหาร'), ('ฝ่ายทรัพยากรบุคคล'), ('ฝ่ายการตลาด'), ('ฝ่ายเทคโนโลยีสารสนเทศ');
INSERT INTO positions (pos_name) VALUES ('ผู้จัดการ'), ('เจ้าหน้าที่ HR'), ('นักการตลาด'), ('โปรแกรมเมอร์'), ('พนักงานทั่วไป');

-- ---- START OF FIX ----
-- เปลี่ยนข้อมูล Employees ให้ใช้รหัสผ่าน '1234' ตรงๆ
INSERT INTO employees (employee_id, first_name, last_name, email, password, pos_id, dept_id, role_id) VALUES
('E001', 'แอดมิน', 'ทดสอบ', 'admin@example.com', '1234', 1, 1, 1),
('E002', 'อนุมัติ', 'ทดสอบ', 'approve@example.com', '1234', 1, 1, 2),
('E003', 'ผู้ใช้งาน', 'ทดสอบ', 'user@example.com', '1234', 5, 4, 3);
