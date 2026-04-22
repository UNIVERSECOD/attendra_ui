import { useEffect, useMemo, useState } from "react";

const DEVICE_PER_PAGE = 4;
const EMPLOYEE_PER_PAGE = 12;
const staggerDelays = ["0.05s", "0.12s", "0.19s", "0.26s"];
const employeeStepTitles = [
  "General Identity",
  "Work Information",
  "Card, Fingerprint & Photo",
  "Compensation",
];

const fieldInputClass =
  "w-full rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm font-medium text-navy outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20";

const sidebarItems = [
  { label: "Dashboard", key: "dashboard", icon: "grid" },
  { label: "Employees", key: "employees", icon: "users" },
  { label: "Attendance", key: "attendance", icon: "calendar" },
  { label: "Devices", key: "devices", icon: "device" },
  { label: "Access Logs", key: "access", icon: "door" },
  { label: "Settings", key: "settings", icon: "settings" },
];

const protocolOptions = [
  { value: "", label: "Select Protocol" },
  { value: "hikvision", label: "Hikvision (HTTP)" },
  { value: "rtsp", label: "RTSP Stream" },
  { value: "onvif", label: "ONVIF" },
  { value: "rest", label: "REST API" },
];

const employeeDepartments = [
  "All Departments",
  "Human Resources",
  "Operations",
  "Finance",
  "IT",
  "Customer Success",
  "Security",
  "Marketing",
  "Sales",
];

const employeeStatuses = ["All Statuses", "Active", "Inactive", "On Leave"];
const employeeShiftOptions = ["All Shifts", "Standard Shift", "Flexible Shift", "Night Shift"];
const employeeGroupOptions = [
  "All Groups",
  "HQ Admin Group",
  "Operations Group",
  "Finance Group",
  "Infrastructure Group",
  "Support Group",
  "Security Group",
  "Marketing Group",
  "Sales Group",
];

const deviceBlankForm = {
  protocol: "",
  device_name: "",
  device_ip: "",
  device_port: "",
  device_username: "",
  device_password: "",
};

const employeeBlankForm = {
  internalId: "",
  firstName: "",
  lastName: "",
  fatherName: "",
  fin: "",
  serialNumber: "",
  dateOfBirth: "",
  position: "",
  department: "",
  contractNumber: "",
  employmentStartDate: "",
  contractEndDate: "",
  annualLeaveDuration: "",
  annualLeaveBalance: "",
  employmentStatus: "Active",
  shiftType: "Standard Shift",
  group: "",
  accessGroup: "",
  cardAssignment: "",
  fingerprintAssignment: "",
  salary: "",
  hourlyRate: "",
  allowance: "",
  notes: "",
  emergencyContact: "",
  phone: "",
  email: "",
  address: "",
  branchLocation: "",
  photoName: "",
  photoDataUrl: "",
};

const employeeAccessLevels = [
  "Open Access",
  "Department Access",
  "Restricted Access",
  "Admin Access",
];

const employeeDepartmentOptions = employeeDepartments.slice(1);
const employeeGroupSelectOptions = employeeGroupOptions.slice(1);

const initialDevices = [
  { id: 1, name: "Main Entrance Controller", model: "DS-K1T671TM-3XF", serial: "DS-K1T671202012345", ip: "192.168.1.64", online: true, door: "Closed", mac: "98:DF:82:8D:96:21", firmware: "V2.2.64", fwDate: "build 200903", type: "ACS", deviceId: "255" },
  { id: 2, name: "Lobby Access Panel", model: "DS-K1T342MWX", serial: "DS-K1T342202109876", ip: "192.168.1.65", online: true, door: "Open", mac: "98:DF:82:8D:97:4A", firmware: "V3.1.12", fwDate: "build 210415", type: "ACS", deviceId: "256" },
  { id: 3, name: "Parking Gate Reader", model: "DS-K1T804AEF", serial: "DS-K1T804202054321", ip: "192.168.1.66", online: false, door: null, mac: "98:DF:82:8D:98:B3", firmware: "V1.4.80", fwDate: "build 190720", type: "ACS", deviceId: "257" },
  { id: 4, name: "Server Room Terminal", model: "DS-K1T671TM-3XF", serial: "DS-K1T671202067890", ip: "192.168.1.67", online: true, door: "Closed", mac: "98:DF:82:8D:99:C2", firmware: "V2.2.64", fwDate: "build 200903", type: "ACS", deviceId: "258" },
  { id: 5, name: "2F Conference Room", model: "DS-K1T342MWX", serial: "DS-K1T342202111223", ip: "192.168.1.68", online: false, door: null, mac: "98:DF:82:8D:9A:D1", firmware: "V3.1.12", fwDate: "build 210415", type: "ACS", deviceId: "259" },
  { id: 6, name: "Back Door Controller", model: "DS-K1T804AEF", serial: "DS-K1T804202033445", ip: "192.168.1.69", online: false, door: null, mac: "98:DF:82:8D:9B:E0", firmware: "V1.4.80", fwDate: "build 190720", type: "ACS", deviceId: "260" },
  { id: 7, name: "Warehouse Entry", model: "DS-K1T671TM-3XF", serial: "DS-K1T671202078901", ip: "192.168.1.70", online: false, door: null, mac: "98:DF:82:8D:9C:F9", firmware: "V2.2.64", fwDate: "build 200903", type: "ACS", deviceId: "261" },
  { id: 8, name: "Executive Floor Panel", model: "DS-K1T342MWX", serial: "DS-K1T342202099887", ip: "192.168.1.71", online: false, door: null, mac: "98:DF:82:8D:9D:08", firmware: "V3.1.12", fwDate: "build 210415", type: "ACS", deviceId: "262" },
];

const initialEmployees = [
  createEmployeeRecord({
    id: 1,
    internalId: "EMP-1001",
    firstName: "Nigar",
    lastName: "Mammadova",
    fatherName: "Rauf",
    fin: "7Q8LE2D",
    serialNumber: "AA1234567",
    dateOfBirth: "1991-05-16",
    position: "HR Manager",
    department: "Human Resources",
    contractNumber: "CNT-22014",
    employmentStartDate: "2022-03-14",
    contractEndDate: "2027-03-14",
    annualLeaveDuration: "30 days",
    annualLeaveBalance: "18 days",
    employmentStatus: "Active",
    shiftType: "Standard Shift",
    group: "HQ Admin Group",
    accessGroup: "HQ Admin Group",
    faceRecognitionStatus: "Enrolled",
    cardAssignment: "Assigned",
    fingerprintAssignment: "Assigned",
    salary: "4200 AZN",
    bonus: "700 AZN",
    allowance: "Medical package",
    notes: "Leads HR policy and onboarding.",
    emergencyContact: "Rauf Mammadov / +994 50 444 00 15",
    phone: "+994 50 444 10 01",
    email: "nigar.mammadova@attendra.az",
    address: "Baku, Yasamal district",
    branchLocation: "HQ Office",
  }),
  createEmployeeRecord({
    id: 2,
    internalId: "EMP-1002",
    firstName: "Elvin",
    lastName: "Aliyev",
    fatherName: "Tahir",
    fin: "5R2MK8P",
    serialNumber: "AA1234568",
    dateOfBirth: "1989-01-22",
    position: "Operations Supervisor",
    department: "Operations",
    contractNumber: "CNT-21087",
    employmentStartDate: "2021-09-02",
    contractEndDate: "2026-09-02",
    annualLeaveDuration: "30 days",
    annualLeaveBalance: "12 days",
    employmentStatus: "Active",
    shiftType: "Flexible Shift",
    group: "Operations Group",
    accessGroup: "Operations Group",
    faceRecognitionStatus: "Enrolled",
    cardAssignment: "Assigned",
    fingerprintAssignment: "Assigned",
    salary: "3600 AZN",
    bonus: "400 AZN",
    allowance: "Transport allowance",
    notes: "Owns floor access operations.",
    emergencyContact: "Aysel Aliyeva / +994 55 222 18 70",
    phone: "+994 55 222 18 74",
    email: "elvin.aliyev@attendra.az",
    address: "Baku, Narimanov district",
    branchLocation: "Operations Center",
  }),
  createEmployeeRecord({
    id: 3,
    internalId: "EMP-1003",
    firstName: "Aysel",
    lastName: "Karimli",
    fatherName: "Namiq",
    fin: "8Y3NL6F",
    serialNumber: "AA1234569",
    dateOfBirth: "1994-08-08",
    position: "Senior Accountant",
    department: "Finance",
    contractNumber: "CNT-23011",
    employmentStartDate: "2023-01-08",
    contractEndDate: "2028-01-08",
    annualLeaveDuration: "30 days",
    annualLeaveBalance: "24 days",
    employmentStatus: "On Leave",
    shiftType: "Standard Shift",
    group: "Finance Group",
    accessGroup: "Finance Group",
    faceRecognitionStatus: "Not Enrolled",
    cardAssignment: "Assigned",
    fingerprintAssignment: "Not Assigned",
    salary: "3100 AZN",
    bonus: "250 AZN",
    allowance: "Meal allowance",
    notes: "On maternity leave until September.",
    emergencyContact: "Farid Karimli / +994 51 300 92 00",
    phone: "+994 51 300 92 11",
    email: "aysel.karimli@attendra.az",
    address: "Baku, Khatai district",
    branchLocation: "Finance Office",
  }),
  createEmployeeRecord({
    id: 4,
    internalId: "EMP-1004",
    firstName: "Murad",
    lastName: "Hasanov",
    fatherName: "Rashad",
    fin: "4T1PA9C",
    serialNumber: "AA1234570",
    dateOfBirth: "1988-11-13",
    position: "Systems Engineer",
    department: "IT",
    contractNumber: "CNT-20043",
    employmentStartDate: "2020-06-19",
    contractEndDate: "2025-06-19",
    annualLeaveDuration: "30 days",
    annualLeaveBalance: "9 days",
    employmentStatus: "Active",
    shiftType: "Night Shift",
    group: "Infrastructure Group",
    accessGroup: "Infrastructure Group",
    faceRecognitionStatus: "Enrolled",
    cardAssignment: "Not Assigned",
    fingerprintAssignment: "Assigned",
    salary: "4400 AZN",
    bonus: "600 AZN",
    allowance: "Night shift allowance",
    notes: "Supports after-hours infrastructure.",
    emergencyContact: "Lale Hasanova / +994 70 555 44 22",
    phone: "+994 70 555 44 21",
    email: "murad.hasanov@attendra.az",
    address: "Baku, Sabail district",
    branchLocation: "Data Center",
  }),
  createEmployeeRecord({
    id: 5,
    internalId: "EMP-1005",
    firstName: "Laman",
    lastName: "Suleymanli",
    fatherName: "Aydin",
    fin: "2U7DX4M",
    serialNumber: "AA1234571",
    dateOfBirth: "1993-02-10",
    position: "Team Lead",
    department: "Customer Success",
    contractNumber: "CNT-22191",
    employmentStartDate: "2022-11-25",
    contractEndDate: "2027-11-25",
    annualLeaveDuration: "30 days",
    annualLeaveBalance: "14 days",
    employmentStatus: "Inactive",
    shiftType: "Flexible Shift",
    group: "Support Group",
    accessGroup: "Support Group",
    faceRecognitionStatus: "Not Enrolled",
    cardAssignment: "Not Assigned",
    fingerprintAssignment: "Not Assigned",
    salary: "2800 AZN",
    bonus: "300 AZN",
    allowance: "Remote support stipend",
    notes: "Currently inactive due to extended transfer process.",
    emergencyContact: "Vugar Suleymanli / +994 77 111 20 10",
    phone: "+994 77 111 20 34",
    email: "laman.suleymanli@attendra.az",
    address: "Sumqayit city",
    branchLocation: "Support Hub",
  }),
  createEmployeeRecord({
    id: 6,
    internalId: "EMP-1006",
    firstName: "Tural",
    lastName: "Guliyev",
    fatherName: "Kamran",
    fin: "6C9WA1R",
    serialNumber: "AA1234572",
    dateOfBirth: "1986-07-01",
    position: "Security Officer",
    department: "Security",
    contractNumber: "CNT-19012",
    employmentStartDate: "2019-12-03",
    contractEndDate: "2026-12-03",
    annualLeaveDuration: "36 days",
    annualLeaveBalance: "21 days",
    employmentStatus: "Active",
    shiftType: "Night Shift",
    group: "Security Group",
    accessGroup: "Security Group",
    faceRecognitionStatus: "Enrolled",
    cardAssignment: "Assigned",
    fingerprintAssignment: "Assigned",
    salary: "2500 AZN",
    bonus: "200 AZN",
    allowance: "Night duty meals",
    notes: "Primary guard for HQ building.",
    emergencyContact: "Leyla Guliyeva / +994 50 881 73 39",
    phone: "+994 50 881 73 40",
    email: "tural.guliyev@attendra.az",
    address: "Baku, Binagadi district",
    branchLocation: "HQ Office",
  }),
  createEmployeeRecord({
    id: 7,
    internalId: "EMP-1007",
    firstName: "Sabina",
    lastName: "Rahimova",
    fatherName: "Ilham",
    fin: "1K4VF7Q",
    serialNumber: "AA1234573",
    dateOfBirth: "1995-09-30",
    position: "Brand Strategist",
    department: "Marketing",
    contractNumber: "CNT-24009",
    employmentStartDate: "2024-02-12",
    contractEndDate: "2026-02-12",
    annualLeaveDuration: "24 days",
    annualLeaveBalance: "22 days",
    employmentStatus: "On Leave",
    shiftType: "Standard Shift",
    group: "Marketing Group",
    accessGroup: "Marketing Group",
    faceRecognitionStatus: "Enrolled",
    cardAssignment: "Not Assigned",
    fingerprintAssignment: "Assigned",
    salary: "2700 AZN",
    bonus: "350 AZN",
    allowance: "Project allowance",
    notes: "Temporary leave during campaign handover.",
    emergencyContact: "Nijat Rahimov / +994 55 345 66 70",
    phone: "+994 55 345 66 77",
    email: "sabina.rahimova@attendra.az",
    address: "Baku, Nasimi district",
    branchLocation: "Creative Studio",
  }),
  createEmployeeRecord({
    id: 8,
    internalId: "EMP-1008",
    firstName: "Farid",
    lastName: "Jafarov",
    fatherName: "Mushfig",
    fin: "9H5SD3L",
    serialNumber: "AA1234574",
    dateOfBirth: "1992-12-17",
    position: "Account Executive",
    department: "Sales",
    contractNumber: "CNT-21051",
    employmentStartDate: "2021-04-29",
    contractEndDate: "2026-04-29",
    annualLeaveDuration: "30 days",
    annualLeaveBalance: "16 days",
    employmentStatus: "Active",
    shiftType: "Flexible Shift",
    group: "Sales Group",
    accessGroup: "Sales Group",
    faceRecognitionStatus: "Not Enrolled",
    cardAssignment: "Assigned",
    fingerprintAssignment: "Not Assigned",
    salary: "3200 AZN",
    bonus: "900 AZN",
    allowance: "Fuel allowance",
    notes: "Travels frequently for enterprise meetings.",
    emergencyContact: "Sona Jafarova / +994 70 900 81 10",
    phone: "+994 70 900 81 22",
    email: "farid.jafarov@attendra.az",
    address: "Baku, Nizami district",
    branchLocation: "Sales Center",
  }),
  createEmployeeRecord({
    id: 9,
    internalId: "EMP-1009",
    firstName: "Gunel",
    lastName: "Asadova",
    fatherName: "Rasim",
    fin: "3F5LK8N",
    serialNumber: "AA1234575",
    dateOfBirth: "1990-04-05",
    position: "Recruiter",
    department: "Human Resources",
    contractNumber: "CNT-22041",
    employmentStartDate: "2022-08-01",
    contractEndDate: "2027-08-01",
    annualLeaveDuration: "30 days",
    annualLeaveBalance: "11 days",
    employmentStatus: "Active",
    shiftType: "Standard Shift",
    group: "HQ Admin Group",
    accessGroup: "HQ Admin Group",
    faceRecognitionStatus: "Enrolled",
    cardAssignment: "Assigned",
    fingerprintAssignment: "Assigned",
    salary: "2500 AZN",
    bonus: "200 AZN",
    allowance: "Wellness package",
    notes: "Handles hiring operations.",
    emergencyContact: "Rauf Asadov / +994 50 333 21 88",
    phone: "+994 50 333 21 89",
    email: "gunel.asadova@attendra.az",
    address: "Baku, Yasamal district",
    branchLocation: "HQ Office",
  }),
  createEmployeeRecord({
    id: 10,
    internalId: "EMP-1010",
    firstName: "Kamran",
    lastName: "Mehdiyev",
    fatherName: "Tural",
    fin: "6Z2QN5W",
    serialNumber: "AA1234576",
    dateOfBirth: "1987-10-18",
    position: "Network Administrator",
    department: "IT",
    contractNumber: "CNT-20088",
    employmentStartDate: "2020-11-16",
    contractEndDate: "2025-11-16",
    annualLeaveDuration: "30 days",
    annualLeaveBalance: "13 days",
    employmentStatus: "Active",
    shiftType: "Night Shift",
    group: "Infrastructure Group",
    accessGroup: "Infrastructure Group",
    faceRecognitionStatus: "Enrolled",
    cardAssignment: "Assigned",
    fingerprintAssignment: "Assigned",
    salary: "3900 AZN",
    bonus: "500 AZN",
    allowance: "On-call allowance",
    notes: "Maintains network uptime SLAs.",
    emergencyContact: "Aynur Mehdiyeva / +994 55 666 10 12",
    phone: "+994 55 666 10 11",
    email: "kamran.mehdiyev@attendra.az",
    address: "Baku, Sabunchu district",
    branchLocation: "Data Center",
  }),
  createEmployeeRecord({
    id: 11,
    internalId: "EMP-1011",
    firstName: "Zahra",
    lastName: "Abbasova",
    fatherName: "Eldar",
    fin: "2N6TD4K",
    serialNumber: "AA1234577",
    dateOfBirth: "1996-03-11",
    position: "Support Specialist",
    department: "Customer Success",
    contractNumber: "CNT-23072",
    employmentStartDate: "2023-07-05",
    contractEndDate: "2026-07-05",
    annualLeaveDuration: "24 days",
    annualLeaveBalance: "19 days",
    employmentStatus: "Active",
    shiftType: "Flexible Shift",
    group: "Support Group",
    accessGroup: "Support Group",
    faceRecognitionStatus: "Not Enrolled",
    cardAssignment: "Assigned",
    fingerprintAssignment: "Assigned",
    salary: "2100 AZN",
    bonus: "150 AZN",
    allowance: "Internet stipend",
    notes: "Supports enterprise onboarding tickets.",
    emergencyContact: "Ramin Abbasov / +994 51 555 70 10",
    phone: "+994 51 555 70 11",
    email: "zahra.abbasova@attendra.az",
    address: "Baku, Surakhani district",
    branchLocation: "Support Hub",
  }),
  createEmployeeRecord({
    id: 12,
    internalId: "EMP-1012",
    firstName: "Orkhan",
    lastName: "Huseynov",
    fatherName: "Elnur",
    fin: "8P1DS7R",
    serialNumber: "AA1234578",
    dateOfBirth: "1985-06-27",
    position: "Facility Lead",
    department: "Operations",
    contractNumber: "CNT-19064",
    employmentStartDate: "2019-08-21",
    contractEndDate: "2026-08-21",
    annualLeaveDuration: "36 days",
    annualLeaveBalance: "8 days",
    employmentStatus: "Active",
    shiftType: "Standard Shift",
    group: "Operations Group",
    accessGroup: "Operations Group",
    faceRecognitionStatus: "Enrolled",
    cardAssignment: "Assigned",
    fingerprintAssignment: "Assigned",
    salary: "3400 AZN",
    bonus: "380 AZN",
    allowance: "Facility transport",
    notes: "Owns maintenance vendor coordination.",
    emergencyContact: "Sevda Huseynova / +994 70 222 88 20",
    phone: "+994 70 222 88 21",
    email: "orkhan.huseynov@attendra.az",
    address: "Baku, Garadagh district",
    branchLocation: "Operations Center",
  }),
];

function App() {
  const [activePage, setActivePage] = useState("devices");

  const [devices, setDevices] = useState(initialDevices);
  const [devicePage, setDevicePage] = useState(1);
  const [drawerDeviceId, setDrawerDeviceId] = useState(null);
  const [deviceFormOpen, setDeviceFormOpen] = useState(false);
  const [editingDeviceId, setEditingDeviceId] = useState(null);
  const [deleteDeviceId, setDeleteDeviceId] = useState(null);
  const [syncOpen, setSyncOpen] = useState(false);
  const [deviceRefreshing, setDeviceRefreshing] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [fetchingId, setFetchingId] = useState(null);
  const [fetchedId, setFetchedId] = useState(null);
  const [doorBusy, setDoorBusy] = useState({ id: null, action: null });
  const [deviceFormValues, setDeviceFormValues] = useState(deviceBlankForm);

  const [employees, setEmployees] = useState(initialEmployees);
  const [employeePage, setEmployeePage] = useState(1);
  const [employeeView, setEmployeeView] = useState("list");
  const [employeeRefreshing, setEmployeeRefreshing] = useState(false);
  const [employeeDetailId, setEmployeeDetailId] = useState(null);
  const [employeeDetailEditMode, setEmployeeDetailEditMode] = useState(false);
  const [employeeDetailFormValues, setEmployeeDetailFormValues] = useState(employeeBlankForm);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [employeeWizardStep, setEmployeeWizardStep] = useState(1);
  const [employeeVisitedSteps, setEmployeeVisitedSteps] = useState([]);
  const [employeeFormValues, setEmployeeFormValues] = useState(employeeBlankForm);
  const [employeeFilters, setEmployeeFilters] = useState({
    search: "",
    department: "All Departments",
    employmentStatus: "All Statuses",
    shiftType: "All Shifts",
  });
  const [employeeSortField, setEmployeeSortField] = useState("fullName");
  const [employeeSortDirection, setEmployeeSortDirection] = useState("asc");

  const selectedDevice = devices.find((device) => device.id === drawerDeviceId) ?? null;
  const selectedEmployee = employees.find((employee) => employee.id === employeeDetailId) ?? null;
  const editingEmployee = employees.find((employee) => employee.id === editingEmployeeId) ?? null;

  const filteredEmployees = useMemo(() => {
    const search = employeeFilters.search.trim().toLowerCase();
    const matchedEmployees = employees.filter((employee) => {
      const fullName = employee.fullName.toLowerCase();
      const matchesSearch =
        !search ||
        fullName.includes(search) ||
        employee.internalId.toLowerCase().includes(search) ||
        employee.department.toLowerCase().includes(search) ||
        employee.position.toLowerCase().includes(search) ||
        employee.fin.toLowerCase().includes(search);

      const matchesDepartment =
        employeeFilters.department === "All Departments" ||
        employee.department === employeeFilters.department;
      const matchesStatus =
        employeeFilters.employmentStatus === "All Statuses" ||
        employee.employmentStatus === employeeFilters.employmentStatus;
      const matchesShift =
        employeeFilters.shiftType === "All Shifts" ||
        employee.shiftType === employeeFilters.shiftType;

      return matchesSearch && matchesDepartment && matchesStatus && matchesShift;
    });

    return [...matchedEmployees].sort((left, right) => {
      const leftValue = getEmployeeSortValue(left, employeeSortField);
      const rightValue = getEmployeeSortValue(right, employeeSortField);

      let compareResult = 0;
      if (typeof leftValue === "number" && typeof rightValue === "number") {
        compareResult = leftValue - rightValue;
      } else {
        compareResult = String(leftValue).localeCompare(String(rightValue), undefined, {
          numeric: true,
          sensitivity: "base",
        });
      }

      return employeeSortDirection === "asc" ? compareResult : compareResult * -1;
    });
  }, [employeeFilters, employeeSortDirection, employeeSortField, employees]);

  const employeeStats = useMemo(
    () => ({
      total: employees.length,
      active: employees.filter((employee) => employee.employmentStatus === "Active").length,
      onLeave: employees.filter((employee) => employee.employmentStatus === "On Leave").length,
    }),
    [employees],
  );

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / EMPLOYEE_PER_PAGE));
    if (employeePage > totalPages) {
      setEmployeePage(totalPages);
    }
  }, [employeePage, filteredEmployees.length]);

  const openDeviceAddForm = () => {
    setEditingDeviceId(null);
    setDeviceFormValues(deviceBlankForm);
    setDeviceFormOpen(true);
  };

  const openDeviceEditForm = (id) => {
    const device = devices.find((item) => item.id === id);
    if (!device) return;
    setEditingDeviceId(id);
    setDeviceFormValues({
      protocol: "",
      device_name: device.name,
      device_ip: device.ip,
      device_port: "8000",
      device_username: "admin",
      device_password: "",
    });
    setDeviceFormOpen(true);
  };

  const handleDeviceRefresh = () => {
    setDeviceRefreshing(true);
    window.setTimeout(() => setDeviceRefreshing(false), 1200);
  };

  const handleEmployeeRefresh = () => {
    setEmployeeRefreshing(true);
    window.setTimeout(() => setEmployeeRefreshing(false), 1200);
  };

  const handleFetch = (id) => {
    const device = devices.find((item) => item.id === id);
    if (!device || !device.online) return;
    setFetchedId(null);
    setFetchingId(id);
    window.setTimeout(() => {
      setFetchingId(null);
      setFetchedId(id);
      window.setTimeout(() => setFetchedId(null), 2000);
    }, 1500);
  };

  const handleDoorControl = (id, action) => {
    const device = devices.find((item) => item.id === id);
    if (!device || !device.online) return;
    setDoorBusy({ id, action });
    window.setTimeout(() => {
      setDevices((current) =>
        current.map((item) =>
          item.id === id ? { ...item, door: action === "open" ? "Open" : "Closed" } : item,
        ),
      );
      setDoorBusy({ id: null, action: null });
    }, 1200);
  };

  const handleDeviceFormSubmit = (event) => {
    event.preventDefault();
    if (!deviceFormValues.protocol || !deviceFormValues.device_name || !deviceFormValues.device_ip) {
      window.alert("Please fill in all required fields");
      return;
    }

    if (editingDeviceId) {
      setDevices((current) =>
        current.map((item) =>
          item.id === editingDeviceId
            ? { ...item, name: deviceFormValues.device_name, ip: deviceFormValues.device_ip }
            : item,
        ),
      );
    } else {
      const nextId = Math.max(...devices.map((device) => device.id)) + 1;
      setDevices((current) => [
        ...current,
        {
          id: nextId,
          name: deviceFormValues.device_name,
          ip: deviceFormValues.device_ip,
          model: "DS-K1T671TM-3XF",
          serial: "DS-K1T671202012345",
          online: true,
          door: "Closed",
          mac: "98:DF:82:8D:96:21",
          firmware: "V2.2.64",
          fwDate: "build 200903",
          type: "ACS",
          deviceId: "999",
        },
      ]);
    }

    setDevicePage(1);
    setDeviceFormOpen(false);
  };

  const confirmDeviceDelete = () => {
    if (!deleteDeviceId) return;
    setDevices((current) => current.filter((item) => item.id !== deleteDeviceId));
    setDevicePage(1);
    if (drawerDeviceId === deleteDeviceId) setDrawerDeviceId(null);
    setDeleteDeviceId(null);
  };

  const confirmSync = () => {
    setSyncing(true);
    setSyncOpen(false);
    window.setTimeout(() => setSyncing(false), 2000);
  };

  const openEmployeeCreate = () => {
    setEditingEmployeeId(null);
    setEmployeeWizardStep(1);
    setEmployeeVisitedSteps([]);
    setEmployeeFormValues(employeeBlankForm);
    setEmployeeView("wizard");
  };

  const openEmployeeDetail = (id) => {
    const employee = employees.find((item) => item.id === id);
    if (!employee) return;
    setEmployeeDetailId(id);
    setEmployeeDetailEditMode(false);
    setEmployeeDetailFormValues(employeeToFormValues(employee));
  };

  const openEmployeeEdit = (id) => {
    const employee = employees.find((item) => item.id === id);
    if (!employee) return;
    setEditingEmployeeId(id);
    setEmployeeWizardStep(1);
    setEmployeeVisitedSteps([]);
    setEmployeeFormValues(employeeToFormValues(employee));
    setEmployeeView("wizard");
  };

  const closeEmployeeWizard = () => {
    setEmployeeView("list");
    setEditingEmployeeId(null);
    setEmployeeWizardStep(1);
    setEmployeeVisitedSteps([]);
    setEmployeeFormValues(employeeBlankForm);
  };

  const handleEmployeeWizardSubmit = (event) => {
    event.preventDefault();

    const requiredFields = [
      "internalId",
      "firstName",
      "lastName",
      "email",
      "fatherName",
      "fin",
      "serialNumber",
      "dateOfBirth",
      "position",
      "department",
      "contractNumber",
      "employmentStartDate",
      "contractEndDate",
      "annualLeaveDuration",
      "employmentStatus",
      "shiftType",
      "group",
      "salary",
      "hourlyRate",
    ];

    if (requiredFields.some((field) => !String(employeeFormValues[field]).trim())) {
      window.alert("Please complete all required employee fields before saving.");
      return;
    }

    const record = createEmployeeRecord({
      id: editingEmployeeId || Math.max(...employees.map((employee) => employee.id)) + 1,
      ...employeeFormValues,
    });

    if (editingEmployeeId) {
      setEmployees((current) =>
        current.map((employee) => (employee.id === editingEmployeeId ? record : employee)),
      );
    } else {
      setEmployees((current) => [record, ...current]);
    }

    setEmployeePage(1);
    closeEmployeeWizard();
  };

  const confirmEmployeeDelete = () => {
    if (!deleteEmployeeId) return;
    setEmployees((current) => current.filter((employee) => employee.id !== deleteEmployeeId));
    if (employeeDetailId === deleteEmployeeId) setEmployeeDetailId(null);
    setDeleteEmployeeId(null);
    setEmployeePage(1);
  };

  const saveEmployeeDetailInline = () => {
    const requiredFields = [
      "internalId",
      "firstName",
      "lastName",
      "email",
      "fatherName",
      "fin",
      "serialNumber",
      "position",
      "department",
      "employmentStatus",
      "shiftType",
      "group",
    ];

    if (requiredFields.some((field) => !String(employeeDetailFormValues[field]).trim())) {
      window.alert("Please complete the required employee fields before saving.");
      return;
    }

    const updatedRecord = createEmployeeRecord({
      id: employeeDetailId,
      ...employeeDetailFormValues,
    });

    setEmployees((current) =>
      current.map((employee) => (employee.id === employeeDetailId ? updatedRecord : employee)),
    );
    setEmployeeDetailFormValues(employeeToFormValues(updatedRecord));
    setEmployeeDetailEditMode(false);
  };

  return (
    <div className="min-h-screen bg-surface text-navy">
      <div id="app" className="min-h-screen w-full overflow-auto">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        <main className="ml-[260px] min-h-screen p-8 pb-4">
          {activePage === "devices" ? (
            <DevicesPage
              devices={devices}
              currentPage={devicePage}
              setCurrentPage={setDevicePage}
              onRefresh={handleDeviceRefresh}
              refreshing={deviceRefreshing}
              syncing={syncing}
              onSyncOpen={() => setSyncOpen(true)}
              onAddDevice={openDeviceAddForm}
              onDoorControl={handleDoorControl}
              doorBusy={doorBusy}
              onFetch={handleFetch}
              fetchingId={fetchingId}
              fetchedId={fetchedId}
              onOpenDetail={setDrawerDeviceId}
              onEditDevice={openDeviceEditForm}
              onDeleteDevice={setDeleteDeviceId}
            />
          ) : activePage === "employees" ? (
            <EmployeesPage
              employees={employees}
              filteredEmployees={filteredEmployees}
              filters={employeeFilters}
              setFilters={setEmployeeFilters}
              currentPage={employeePage}
              setCurrentPage={setEmployeePage}
              stats={employeeStats}
              sortField={employeeSortField}
              sortDirection={employeeSortDirection}
              onSort={(field) => {
                if (field === employeeSortField) {
                  setEmployeeSortDirection((current) => (current === "asc" ? "desc" : "asc"));
                } else {
                  setEmployeeSortField(field);
                  setEmployeeSortDirection("asc");
                }
              }}
              view={employeeView}
              wizardStep={employeeWizardStep}
              setWizardStep={setEmployeeWizardStep}
              visitedSteps={employeeVisitedSteps}
              setVisitedSteps={setEmployeeVisitedSteps}
              onBackToList={closeEmployeeWizard}
              onRefresh={handleEmployeeRefresh}
              refreshing={employeeRefreshing}
              onAddEmployee={openEmployeeCreate}
              onOpenDetail={openEmployeeDetail}
              onEditEmployee={openEmployeeEdit}
              onDeleteEmployee={setDeleteEmployeeId}
              editingEmployee={editingEmployee}
              formValues={employeeFormValues}
              setFormValues={setEmployeeFormValues}
              onFormSubmit={handleEmployeeWizardSubmit}
            />
          ) : (
            <PlaceholderPage
              title={sidebarItems.find((item) => item.key === activePage)?.label || "Page"}
            />
          )}
        </main>

        <Drawer device={selectedDevice} onClose={() => setDrawerDeviceId(null)} />

        <DeviceFormModal
          isOpen={deviceFormOpen}
          editing={Boolean(editingDeviceId)}
          values={deviceFormValues}
          onChange={setDeviceFormValues}
          onClose={() => setDeviceFormOpen(false)}
          onSubmit={handleDeviceFormSubmit}
        />

        <ConfirmModal
          isOpen={Boolean(deleteDeviceId)}
          tone="danger"
          title="Delete Device?"
          description="Are you sure you want to delete this device? This action cannot be undone."
          confirmText="Delete"
          onClose={() => setDeleteDeviceId(null)}
          onConfirm={confirmDeviceDelete}
          icon={<AlertCircleIcon className="h-6 w-6 text-red-500" />}
        />

        <ConfirmModal
          isOpen={syncOpen}
          tone="warning"
          title="Sync All Devices?"
          description="Send synchronization requests to all registered devices and update their latest information."
          confirmText="Sync Now"
          onClose={() => setSyncOpen(false)}
          onConfirm={confirmSync}
          icon={<ZapIcon className="h-6 w-6 text-yellow" />}
        />

        <EmployeeDetailModal
          employee={selectedEmployee}
          editMode={employeeDetailEditMode}
          setEditMode={setEmployeeDetailEditMode}
          values={employeeDetailFormValues}
          onChange={setEmployeeDetailFormValues}
          onSave={saveEmployeeDetailInline}
          onDelete={() => setDeleteEmployeeId(employeeDetailId)}
          onClose={() => {
            setEmployeeDetailId(null);
            setEmployeeDetailEditMode(false);
          }}
        />

        <ConfirmModal
          isOpen={Boolean(deleteEmployeeId)}
          tone="danger"
          title="Delete Employee?"
          description="Are you sure you want to delete this employee?"
          confirmText="Delete"
          onClose={() => setDeleteEmployeeId(null)}
          onConfirm={confirmEmployeeDelete}
          icon={<AlertCircleIcon className="h-6 w-6 text-red-500" />}
        />
      </div>
    </div>
  );
}

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="fixed left-0 top-0 z-30 flex h-full w-[260px] flex-col bg-navy">
      <div className="flex items-center gap-3 px-6 pb-5 pt-7">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple">
          <ShieldCheckIcon className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">HRAccess</span>
      </div>

      <nav className="mt-2 flex-1 px-3">
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
              item.key === activePage
                ? "bg-purple/20 font-semibold text-white"
                : "text-white/50 hover:bg-white/5 hover:text-white/80"
            }`}
          >
            <SidebarIcon
              type={item.icon}
              className={`h-[18px] w-[18px] ${item.key === activePage ? "text-purple" : ""}`}
            />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-4 pb-6">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow text-sm font-bold text-navy">
            JD
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">John Doe</div>
            <div className="text-xs text-white/40">IT Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function DevicesPage(props) {
  const {
    devices,
    currentPage,
    setCurrentPage,
    onRefresh,
    refreshing,
    syncing,
    onSyncOpen,
    onAddDevice,
    onDoorControl,
    doorBusy,
    onFetch,
    fetchingId,
    fetchedId,
    onOpenDetail,
    onEditDevice,
    onDeleteDevice,
  } = props;

  const totalPages = Math.ceil(devices.length / DEVICE_PER_PAGE);
  const onlineCount = devices.filter((device) => device.online).length;
  const pageStart = (currentPage - 1) * DEVICE_PER_PAGE;
  const visibleDevices = devices.slice(pageStart, pageStart + DEVICE_PER_PAGE);
  const rangeStart = pageStart + 1;
  const rangeEnd = Math.min(currentPage * DEVICE_PER_PAGE, devices.length);

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-navy">
            All Devices
          </h1>
          <p className="mt-1.5 text-sm font-medium text-navy/50">
            {devices.length} devices total -{" "}
            <span className="font-semibold text-emerald-500">{onlineCount} online</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-xl border-2 border-navy/10 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-purple/30 hover:text-purple"
          >
            <RefreshIcon className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>

          <button
            onClick={onSyncOpen}
            className="flex items-center gap-2 rounded-xl border-2 border-navy/10 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-yellow/30 hover:text-yellow"
          >
            <ZapIcon className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
            Sync All
          </button>

          <button
            onClick={onAddDevice}
            className="flex items-center gap-2 rounded-xl bg-purple px-5 py-2.5 text-sm font-semibold text-white shadow-purple transition hover:bg-purple/90"
          >
            <PlusIcon className="h-4 w-4" />
            Add Device
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {visibleDevices.map((device, index) => (
          <div
            key={device.id}
            className="card-row rounded-2xl border border-navy/[0.04] bg-white p-6 shadow-sm"
            style={{ animation: "fadeUp 0.35s ease both", animationDelay: staggerDelays[index] }}
          >
            <div className="flex items-start gap-6">
              <div className="w-[260px] shrink-0">
                <div className="mb-3 flex items-center gap-2.5">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      device.online ? "bg-purple/10" : "bg-surface"
                    }`}
                  >
                    <DeviceIcon
                      className={`h-5 w-5 ${device.online ? "text-purple" : "text-navy/30"}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold leading-snug text-navy">
                      {device.name}
                    </h3>
                    <p className="text-xs font-medium text-navy/40">{device.model}</p>
                  </div>
                </div>

                <div className="ml-[52px] flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-[46px] text-navy/40">S/N</span>
                    <span className="font-mono text-[11px] text-navy/70">{device.serial}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-[46px] text-navy/40">IP</span>
                    <span className="font-mono text-[11px] text-navy/70">{device.ip}</span>
                  </div>
                </div>
              </div>

              <div className="flex min-w-0 flex-1 items-start gap-0">
                <InfoBlock label="Status">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${
                        device.online ? "animate-pulseSoft bg-emerald-400" : "bg-red-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-semibold ${
                        device.online ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {device.online ? "Online" : "Offline"}
                    </span>
                  </div>
                </InfoBlock>

                <InfoBlock label="Door">
                  {device.online ? (
                    <div className="flex items-center gap-2">
                      {device.door === "Open" ? (
                        <DoorOpenIcon className="h-4 w-4 text-yellow" />
                      ) : (
                        <LockIcon className="h-4 w-4 text-navy/50" />
                      )}
                      <span className="text-sm font-semibold text-navy">{device.door}</span>
                    </div>
                  ) : (
                    <span className="text-xs italic text-navy/35">Device is offline</span>
                  )}
                </InfoBlock>

                <InfoBlock label="Controls">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onDoorControl(device.id, "open")}
                      disabled={!device.online || doorBusy.id === device.id}
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition ${
                        device.online
                          ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          : "cursor-not-allowed bg-surface text-navy/20"
                      }`}
                    >
                      {doorBusy.id === device.id && doorBusy.action === "open" ? (
                        <SpinnerIcon className="h-3 w-3 animate-spin" />
                      ) : (
                        <UnlockIcon className="h-3 w-3" />
                      )}
                      Open
                    </button>

                    <button
                      onClick={() => onDoorControl(device.id, "close")}
                      disabled={!device.online || doorBusy.id === device.id}
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition ${
                        device.online
                          ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                          : "cursor-not-allowed bg-surface text-navy/20"
                      }`}
                    >
                      {doorBusy.id === device.id && doorBusy.action === "close" ? (
                        <SpinnerIcon className="h-3 w-3 animate-spin" />
                      ) : (
                        <LockIcon className="h-3 w-3" />
                      )}
                      Close
                    </button>
                  </div>
                </InfoBlock>

                <InfoBlock label="Data">
                  <button
                    onClick={() => onFetch(device.id)}
                    disabled={!device.online || fetchingId === device.id}
                    className={`fetch-btn inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                      !device.online
                        ? "cursor-not-allowed bg-surface text-navy/30"
                        : fetchedId === device.id
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-purple/10 text-purple hover:bg-purple/20"
                    }`}
                  >
                    {fetchingId === device.id ? (
                      <SpinnerIcon className="h-3.5 w-3.5 animate-spin" />
                    ) : fetchedId === device.id ? (
                      <CheckIcon className="h-3.5 w-3.5" />
                    ) : (
                      <DownloadCloudIcon className="h-3.5 w-3.5" />
                    )}
                    {fetchingId === device.id
                      ? "Fetching..."
                      : fetchedId === device.id
                        ? "Done"
                        : "Fetch Data"}
                  </button>
                </InfoBlock>
              </div>

              <div className="ml-2 flex shrink-0 items-center gap-1">
                <button
                  onClick={() => onOpenDetail(device.id)}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-purple transition hover:bg-purple/10"
                >
                  Detail
                </button>
                <button
                  onClick={() => onEditDevice(device.id)}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-navy/50 transition hover:bg-surface hover:text-navy"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteDevice(device.id)}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-50 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        summary={`Showing ${rangeStart}-${rangeEnd} of ${devices.length} devices`}
      />
    </div>
  );
}

function EmployeesPage(props) {
  const {
    filteredEmployees,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    stats,
    sortField,
    sortDirection,
    onSort,
    view,
    wizardStep,
    setWizardStep,
    visitedSteps,
    setVisitedSteps,
    onBackToList,
    onRefresh,
    refreshing,
    onAddEmployee,
    onOpenDetail,
    onEditEmployee,
    onDeleteEmployee,
    editingEmployee,
    formValues,
    setFormValues,
    onFormSubmit,
  } = props;

  if (view === "wizard") {
    return (
      <EmployeeWizardPage
        editing={Boolean(editingEmployee)}
        values={formValues}
        onChange={setFormValues}
        step={wizardStep}
        setStep={setWizardStep}
        visitedSteps={visitedSteps}
        setVisitedSteps={setVisitedSteps}
        onBack={onBackToList}
        onSubmit={onFormSubmit}
      />
    );
  }

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / EMPLOYEE_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * EMPLOYEE_PER_PAGE;
  const visibleEmployees = filteredEmployees.slice(pageStart, pageStart + EMPLOYEE_PER_PAGE);
  const rangeStart = filteredEmployees.length === 0 ? 0 : pageStart + 1;
  const rangeEnd =
    filteredEmployees.length === 0 ? 0 : Math.min(safePage * EMPLOYEE_PER_PAGE, filteredEmployees.length);

  return (
    <div className="mx-auto max-w-[1480px]">
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-navy">
            All Employees
          </h1>
          <p className="mt-1.5 text-sm font-medium text-navy/50">
            {stats.total} employees total -{" "}
            <span className="font-semibold text-emerald-500">{stats.active} active</span> -{" "}
            <span className="font-semibold text-yellow-600">{stats.onLeave} on leave</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-xl border-2 border-navy/10 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-purple/30 hover:text-purple"
          >
            <RefreshIcon className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={onAddEmployee}
            className="flex items-center gap-2 rounded-xl bg-purple px-5 py-2.5 text-sm font-semibold text-white shadow-purple transition hover:bg-purple/90"
          >
            <PlusIcon className="h-4 w-4" />
            Add Employee
          </button>
        </div>
      </div>

      <div className="mb-4 rounded-2xl border border-navy/[0.05] bg-white p-4 shadow-sm">
        <div className="grid grid-cols-4 gap-3">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
            <input
              value={filters.search}
              onChange={(event) => {
                setFilters((current) => ({ ...current, search: event.target.value }));
                setCurrentPage(1);
              }}
              placeholder="Search employees"
              className="w-full rounded-xl border border-navy/10 bg-surface py-3 pl-11 pr-4 text-sm font-medium text-navy outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
            />
          </div>

          <FilterSelect
            value={filters.department}
            onChange={(value) => {
              setFilters((current) => ({ ...current, department: value }));
              setCurrentPage(1);
            }}
            options={employeeDepartments}
          />
          <FilterSelect
            value={filters.employmentStatus}
            onChange={(value) => {
              setFilters((current) => ({ ...current, employmentStatus: value }));
              setCurrentPage(1);
            }}
            options={employeeStatuses}
          />
          <FilterSelect
            value={filters.shiftType}
            onChange={(value) => {
              setFilters((current) => ({ ...current, shiftType: value }));
              setCurrentPage(1);
            }}
            options={employeeShiftOptions}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-navy/[0.05] bg-white shadow-sm">
        <div className="overflow-x-auto overflow-y-hidden">
          <div className="min-w-[2130px]">
            <div className="grid grid-cols-[120px_90px_120px_180px_150px_150px_170px_110px_130px_150px_150px_170px_120px_120px_130px] items-center gap-3 border-b border-navy/[0.05] bg-surface/70 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-navy/40">
              <span>Actions</span>
              <span>Photo</span>
              <SortableHeader label="Employee ID" field="internalId" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHeader label="Full Name" field="fullName" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHeader label="Father's Name" field="fatherName" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHeader label="Department" field="department" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHeader label="Position" field="position" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHeader label="FIN" field="fin" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHeader label="Serial Number" field="serialNumber" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHeader label="Start Date" field="employmentStartDate" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHeader label="Contract End" field="contractEndDate" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHeader label="Leave Balance / Duration" field="annualLeaveBalance" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHeader label="Salary" field="salary" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHeader label="Status" field="employmentStatus" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
              <SortableHeader label="Shift Type" field="shiftType" sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
            </div>

            {visibleEmployees.map((employee) => (
              <div
                key={employee.id}
                className="grid grid-cols-[120px_90px_120px_180px_150px_150px_170px_110px_130px_150px_150px_170px_120px_120px_130px] items-center gap-3 border-b border-navy/[0.05] px-5 py-4 text-sm text-navy last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenDetail(employee.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple/20 bg-purple/10 text-purple transition hover:bg-purple hover:text-white"
                    aria-label="View employee"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEditEmployee(employee.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-navy/10 bg-white text-navy transition hover:border-purple/20 hover:text-purple"
                    aria-label="Edit employee"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteEmployee(employee.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                    aria-label="Delete employee"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  {employee.photoDataUrl ? (
                    <img src={employee.photoDataUrl} alt={employee.fullName} className="h-12 w-12 rounded-2xl object-cover" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple/10 text-sm font-bold text-purple">
                      {employee.avatar}
                    </div>
                  )}
                </div>
                <span className="font-semibold">{employee.internalId}</span>
                <div>
                  <div className="font-semibold">{employee.fullName}</div>
                  <div className="mt-1 text-xs text-navy/45">{employee.email}</div>
                </div>
                <span>{employee.fatherName}</span>
                <span>{employee.department}</span>
                <span>{employee.position}</span>
                <span>{employee.fin}</span>
                <span>{employee.serialNumber}</span>
                <span>{employee.employmentStartDate}</span>
                <span>{employee.contractEndDate}</span>
                <span>{employee.annualLeaveBalance} / {employee.annualLeaveDuration}</span>
                <span className="font-semibold">{employee.salary}</span>
                <span className={`font-semibold ${employee.employmentStatus === "Active" ? "text-emerald-600" : employee.employmentStatus === "On Leave" ? "text-yellow-600" : "text-red-500"}`}>
                  {employee.employmentStatus}
                </span>
                <span>{employee.shiftType}</span>
              </div>
            ))}

            {visibleEmployees.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm font-medium text-navy/45">
                No employees matched the current filters.
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        summary={`Showing ${rangeStart}-${rangeEnd} of ${filteredEmployees.length} employees`}
      />
    </div>
  );
}

function EmployeeWizardPage({
  editing,
  values,
  onChange,
  step,
  setStep,
  visitedSteps = [],
  setVisitedSteps = () => {},
  onBack,
  onSubmit,
}) {
  const setField = (field, value) => onChange((current) => ({ ...current, [field]: value }));

  const markVisited = (stepNumber) => {
    setVisitedSteps((current) => (current.includes(stepNumber) ? current : [...current, stepNumber]));
  };

  const goToStep = (nextStep) => {
    markVisited(step);
    setStep(nextStep);
  };

  const handleNext = () => goToStep(Math.min(employeeStepTitles.length, step + 1));
  const handlePrevious = () => goToStep(Math.max(1, step - 1));

  const handlePhotoFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange((current) => ({
        ...current,
        photoName: file.name,
        photoDataUrl: String(reader.result || ""),
      }));
    };
    reader.readAsDataURL(file);
  };

  const stepCompletion = employeeStepTitles.map((_, index) =>
    isEmployeeStepComplete(values, index + 1),
  );

  return (
    <div className="mx-auto max-w-[1080px]">
      <button
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-2 rounded-xl border border-navy/10 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-purple/20 hover:text-purple"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Go Back
      </button>

      <div className="rounded-[28px] border border-navy/[0.05] bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-navy">
            {editing ? "Edit Employee" : "Add Employee"}
          </h1>
          <p className="mt-1.5 text-sm font-medium text-navy/45">
            Progressively complete the employee record in structured stages for cleaner HR operations.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-4 gap-3">
          {employeeStepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === step;
            const isVisited = visitedSteps.includes(stepNumber);
            const isComplete = stepCompletion[index];
            return (
              <button
                key={title}
                type="button"
                onClick={() => {
                  if (stepNumber !== step) goToStep(stepNumber);
                }}
                className={`rounded-2xl border px-4 py-4 transition ${
                  isActive
                    ? "border-purple bg-purple/10"
                    : isVisited && isComplete
                      ? "border-emerald-200 bg-emerald-50"
                      : isVisited && !isComplete
                        ? "border-red-200 bg-red-50"
                      : "border-navy/10 bg-surface/70"
                }`}
              >
                <div
                  className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    isVisited
                      ? isComplete
                        ? "bg-emerald-500 text-white"
                        : "bg-red-500 text-white"
                      : isActive
                        ? "bg-purple text-white"
                        : "bg-white text-navy/50"
                  }`}
                >
                  {isVisited ? (isComplete ? "V" : "X") : stepNumber}
                </div>
                <div className="text-sm font-semibold text-navy">{title}</div>
              </button>
            );
          })}
        </div>

        <form onSubmit={onSubmit}>
          <div className="rounded-2xl border border-navy/[0.05] bg-surface/40 p-6">
            {step === 1 ? (
              <div>
                <SectionHeading title="Personal Information" description="Capture company identity and state-issued identification details." />
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Internal Employee ID"><input value={values.internalId} onChange={(e) => setField("internalId", e.target.value)} placeholder="EMP-1044" className={fieldInputClass} /></Field>
                  <Field label="FIN"><input value={values.fin} onChange={(e) => setField("fin", e.target.value)} placeholder="7Q8LE2D" className={fieldInputClass} /></Field>
                  <Field label="First Name"><input value={values.firstName} onChange={(e) => setField("firstName", e.target.value)} placeholder="First name" className={fieldInputClass} /></Field>
                  <Field label="Last Name"><input value={values.lastName} onChange={(e) => setField("lastName", e.target.value)} placeholder="Last name" className={fieldInputClass} /></Field>
                  <Field label="Email"><input value={values.email} onChange={(e) => setField("email", e.target.value)} placeholder="name@attendra.az" className={fieldInputClass} /></Field>
                  <Field label="Father's Name"><input value={values.fatherName} onChange={(e) => setField("fatherName", e.target.value)} placeholder="Father's name" className={fieldInputClass} /></Field>
                  <Field label="Serial Number"><input value={values.serialNumber} onChange={(e) => setField("serialNumber", e.target.value)} placeholder="AA1234567" className={fieldInputClass} /></Field>
                  <Field label="Date of Birth"><input type="date" value={values.dateOfBirth} onChange={(e) => setField("dateOfBirth", e.target.value)} className={fieldInputClass} /></Field>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <SectionHeading title="Employment Information" description="Define organizational placement, contract dates, and leave structure." />
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Position"><input value={values.position} onChange={(e) => setField("position", e.target.value)} placeholder="Position" className={fieldInputClass} /></Field>
                  <Field label="Department">
                    <select value={values.department} onChange={(e) => setField("department", e.target.value)} className={fieldInputClass}>
                      <option value="">Select Department</option>
                      {employeeDepartmentOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </Field>
                  <Field label="Contract Number"><input value={values.contractNumber} onChange={(e) => setField("contractNumber", e.target.value)} placeholder="CNT-24040" className={fieldInputClass} /></Field>
                  <Field label="Branch / Office Location"><input value={values.branchLocation} onChange={(e) => setField("branchLocation", e.target.value)} placeholder="HQ Office" className={fieldInputClass} /></Field>
                  <Field label="Employment Start Date"><input type="date" value={values.employmentStartDate} onChange={(e) => setField("employmentStartDate", e.target.value)} className={fieldInputClass} /></Field>
                  <Field label="Contract End Date"><input type="date" value={values.contractEndDate} onChange={(e) => setField("contractEndDate", e.target.value)} className={fieldInputClass} /></Field>
                  <Field label="Annual Leave Duration"><input value={values.annualLeaveDuration} onChange={(e) => setField("annualLeaveDuration", e.target.value)} placeholder="30 days" className={fieldInputClass} /></Field>
                  <Field label="Annual Leave Balance"><input value={values.annualLeaveBalance} onChange={(e) => setField("annualLeaveBalance", e.target.value)} placeholder="12 days" className={fieldInputClass} /></Field>
                  <Field label="Employment Status">
                    <select value={values.employmentStatus} onChange={(e) => setField("employmentStatus", e.target.value)} className={fieldInputClass}>
                      {employeeStatuses.slice(1).map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </Field>
                  <Field label="Shift Type">
                    <select value={values.shiftType} onChange={(e) => setField("shiftType", e.target.value)} className={fieldInputClass}>
                      {employeeShiftOptions.slice(1).map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </Field>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <SectionHeading title="Card, Fingerprint & Photo" description="Kart, barmaq izi, access level ve employee fotosu eyni addimda tamamlanir." />
                <div className="grid grid-cols-[1.2fr_0.8fr] gap-6">
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-navy/10 bg-white p-5">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-navy">Access Credentials</div>
                          <div className="mt-1 text-xs text-navy/45">Kart, barmaq izi ve access level burada idare olunur.</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => setField("cardAssignment", values.cardAssignment || "Assigned")} className="inline-flex items-center gap-2 rounded-xl bg-purple px-4 py-2 text-xs font-semibold text-white shadow-purple transition hover:bg-purple/90">
                            <PlusIcon className="h-3.5 w-3.5" />
                            Add Card
                          </button>
                          <button type="button" onClick={() => setField("fingerprintAssignment", values.fingerprintAssignment || "Assigned")} className="inline-flex items-center gap-2 rounded-xl border border-navy/10 bg-surface px-4 py-2 text-xs font-semibold text-navy transition hover:border-purple/20 hover:text-purple">
                            <FingerprintIcon className="h-3.5 w-3.5" />
                            Add Fingerprint
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <Field label="Card Assignment"><input value={values.cardAssignment} onChange={(e) => setField("cardAssignment", e.target.value)} placeholder="Assigned / Not Assigned / Card ID" className={fieldInputClass} /></Field>
                        <Field label="Fingerprint Assignment"><input value={values.fingerprintAssignment} onChange={(e) => setField("fingerprintAssignment", e.target.value)} placeholder="Assigned / Not Assigned" className={fieldInputClass} /></Field>
                        <Field label="Access Level">
                          <select value={values.accessGroup} onChange={(e) => setField("accessGroup", e.target.value)} className={fieldInputClass}>
                            <option value="">Select Access Level</option>
                            {employeeAccessLevels.map((option) => <option key={option} value={option}>{option}</option>)}
                          </select>
                        </Field>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                      <Field label="Employment Status">
                        <select value={values.employmentStatus} onChange={(e) => setField("employmentStatus", e.target.value)} className={fieldInputClass}>
                          {employeeStatuses.slice(1).map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                      </Field>
                      <Field label="Shift Type">
                        <select value={values.shiftType} onChange={(e) => setField("shiftType", e.target.value)} className={fieldInputClass}>
                          {employeeShiftOptions.slice(1).map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                      </Field>
                      <Field label="Group">
                        <select value={values.group} onChange={(e) => setField("group", e.target.value)} className={fieldInputClass}>
                          <option value="">Select Group</option>
                          {employeeGroupSelectOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                      </Field>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-navy/10 bg-white p-5">
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-navy">Photo Upload</div>
                      <div className="mt-1 text-xs text-navy/45">Employee sekli bu addimda access melumatlari ile birlikde elave olunur.</div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[28px] border border-dashed border-purple/25 bg-surface/40">
                        {values.photoDataUrl ? (
                          <img src={values.photoDataUrl} alt="Employee preview" className="h-full w-full object-cover" />
                        ) : (
                          <div className="text-center">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple/10 text-purple">
                              <CameraIcon className="h-8 w-8" />
                            </div>
                            <div className="text-sm font-semibold text-navy">No photo selected</div>
                            <div className="mt-1 text-xs text-navy/45">Large square preview appears here</div>
                          </div>
                        )}
                      </div>

                      <div className="text-center text-xs font-medium text-navy/45">
                        {values.photoName || "Photo preview area"}
                      </div>

                      <div className="space-y-3">
                        <label className="block cursor-pointer rounded-2xl border border-purple/20 bg-purple/10 p-4 transition hover:bg-purple/15">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple text-white">
                              <CameraIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-navy">Capture from Device</div>
                              <div className="mt-1 text-xs text-navy/45">Use device camera when available.</div>
                            </div>
                          </div>
                          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(event) => handlePhotoFile(event.target.files?.[0])} />
                        </label>

                        <label className="block cursor-pointer rounded-2xl border border-navy/10 bg-white p-4 transition hover:border-purple/20">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-navy">
                              <UploadIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-navy">Upload from Computer</div>
                              <div className="mt-1 text-xs text-navy/45">Select JPG or PNG from local storage.</div>
                            </div>
                          </div>
                          <input type="file" accept="image/*" className="hidden" onChange={(event) => handlePhotoFile(event.target.files?.[0])} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div>
                <SectionHeading title="Compensation" description="Store pay, allowances, contact information, and optional HR notes." />
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Salary"><input value={values.salary} onChange={(e) => setField("salary", e.target.value)} placeholder="3200 AZN" className={fieldInputClass} /></Field>
                  <Field label="Hourly Rate"><input value={values.hourlyRate} onChange={(e) => setField("hourlyRate", e.target.value)} placeholder="20 AZN / hour" className={fieldInputClass} /></Field>
                  <Field label="Optional Allowance"><input value={values.allowance} onChange={(e) => setField("allowance", e.target.value)} placeholder="Transport allowance" className={fieldInputClass} /></Field>
                  <Field label="Emergency Contact"><input value={values.emergencyContact} onChange={(e) => setField("emergencyContact", e.target.value)} placeholder="Name / Phone" className={fieldInputClass} /></Field>
                  <Field label="Phone Number"><input value={values.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="+994 50 000 00 00" className={fieldInputClass} /></Field>
                  <Field label="Address"><input value={values.address} onChange={(e) => setField("address", e.target.value)} placeholder="Employee address" className={fieldInputClass} /></Field>
                  <Field label="Optional Notes"><textarea value={values.notes} onChange={(e) => setField("notes", e.target.value)} placeholder="Any HR notes" className={`${fieldInputClass} min-h-[110px] resize-none`} /></Field>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-navy/[0.06] pt-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBack}
                className="rounded-xl border-2 border-navy/10 px-5 py-3 text-sm font-semibold text-navy transition hover:border-navy/20 hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePrevious}
                disabled={step === 1}
                className={`rounded-xl border-2 px-5 py-3 text-sm font-semibold transition ${
                  step === 1
                    ? "cursor-not-allowed border-navy/10 text-navy/20"
                    : "border-navy/10 text-navy hover:border-navy/20 hover:bg-surface"
                }`}
              >
                Back
              </button>
            </div>

            <div className="flex items-center gap-3">
              {step < employeeStepTitles.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-xl bg-purple px-5 py-3 text-sm font-semibold text-white shadow-purple transition hover:bg-purple/90"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-xl bg-purple px-5 py-3 text-sm font-semibold text-white shadow-purple transition hover:bg-purple/90"
                >
                  {editing ? "Save Employee" : "Submit Employee"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function EmployeeDetailModal({
  employee,
  editMode,
  setEditMode,
  values,
  onChange,
  onSave,
  onDelete,
  onClose,
}) {
  if (!employee) return null;

  return (
    <>
      <div className="drawer-overlay fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-50 max-h-[92vh] w-[1080px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-[32px] bg-[#f7f7f8] p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[28px] font-bold tracking-tight text-navy">
              {editMode ? "Edit Employee Profile" : "Employee Profile"}
            </h2>
            <p className="mt-1 text-sm font-medium text-navy/45">
              Complete HR record, biometric details, and compensation overview in one place.
            </p>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-white">
            <CloseIcon className="h-5 w-5 text-navy/50" />
          </button>
        </div>

        <div className="grid grid-cols-[1.1fr_1fr] gap-5">
          <div className="rounded-[28px] bg-white p-6 shadow-sm">
            <div className="overflow-hidden rounded-[24px] bg-surface">
              {employee.photoDataUrl ? (
                <img src={employee.photoDataUrl} alt={employee.fullName} className="h-[360px] w-full object-cover" />
              ) : (
                <div className="flex h-[360px] items-center justify-center bg-purple/10 text-7xl font-bold text-purple">
                  {employee.avatar}
                </div>
              )}
            </div>

            <div className="mt-5">
              {editMode ? (
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name"><input value={values.firstName} onChange={(e) => onChange((current) => ({ ...current, firstName: e.target.value }))} className={fieldInputClass} /></Field>
                  <Field label="Last Name"><input value={values.lastName} onChange={(e) => onChange((current) => ({ ...current, lastName: e.target.value }))} className={fieldInputClass} /></Field>
                  <Field label="Father's Name"><input value={values.fatherName} onChange={(e) => onChange((current) => ({ ...current, fatherName: e.target.value }))} className={fieldInputClass} /></Field>
                  <Field label="Employee ID"><input value={values.internalId} onChange={(e) => onChange((current) => ({ ...current, internalId: e.target.value }))} className={fieldInputClass} /></Field>
                  <Field label="Phone"><input value={values.phone} onChange={(e) => onChange((current) => ({ ...current, phone: e.target.value }))} className={fieldInputClass} /></Field>
                  <Field label="Email"><input value={values.email} onChange={(e) => onChange((current) => ({ ...current, email: e.target.value }))} className={fieldInputClass} /></Field>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-4 border-b border-navy/[0.06] py-3">
                    <span className="text-sm font-semibold text-navy">My profile</span>
                    <span className="text-xs font-medium text-navy/35">{employee.branchLocation || "HQ Office"}</span>
                  </div>
                  <KeyValueRow label="Full Name" value={employee.fullName} />
                  <KeyValueRow label="Father's Name" value={employee.fatherName} />
                  <KeyValueRow label="Phone" value={employee.phone || "-"} />
                  <KeyValueRow label="Email" value={employee.email || "-"} />
                  <KeyValueRow label="FIN / Serial" value={`${employee.fin} / ${employee.serialNumber}`} />
                </>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-surface px-4 py-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-navy/35">Status</div>
                <div className="mt-1 flex items-center gap-2">
                  <StatusChip status={editMode ? values.employmentStatus : employee.employmentStatus} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                {editMode ? (
                  <>
                    <button onClick={() => { setEditMode(false); onChange(employeeToFormValues(employee)); }} className="rounded-xl border border-navy/10 px-4 py-2 text-xs font-semibold text-navy transition hover:bg-surface">
                      Cancel
                    </button>
                    <button onClick={onSave} className="rounded-xl bg-purple px-5 py-2 text-xs font-semibold text-white shadow-purple transition hover:bg-purple/90">
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditMode(true)} aria-label="Edit employee" className="flex h-10 w-10 items-center justify-center rounded-xl border border-navy/10 bg-white text-navy transition hover:border-purple/20 hover:text-purple">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button onClick={onDelete} aria-label="Delete employee" className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <DetailInfoCard title="Employment Information">
              {editMode ? (
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Department">
                    <select value={values.department} onChange={(e) => onChange((current) => ({ ...current, department: e.target.value }))} className={fieldInputClass}>
                      <option value="">Select Department</option>
                      {employeeDepartmentOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </Field>
                  <Field label="Position"><input value={values.position} onChange={(e) => onChange((current) => ({ ...current, position: e.target.value }))} className={fieldInputClass} /></Field>
                  <Field label="Employment Status">
                    <select value={values.employmentStatus} onChange={(e) => onChange((current) => ({ ...current, employmentStatus: e.target.value }))} className={fieldInputClass}>
                      {employeeStatuses.slice(1).map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </Field>
                  <Field label="Shift Type">
                    <select value={values.shiftType} onChange={(e) => onChange((current) => ({ ...current, shiftType: e.target.value }))} className={fieldInputClass}>
                      {employeeShiftOptions.slice(1).map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </Field>
                  <Field label="Contract Number"><input value={values.contractNumber} onChange={(e) => onChange((current) => ({ ...current, contractNumber: e.target.value }))} className={fieldInputClass} /></Field>
                </div>
              ) : (
                <>
                  <KeyValueRow label="Department" value={employee.department} />
                  <KeyValueRow label="Position" value={employee.position} />
                  <KeyValueRow label="Employment Status" value={employee.employmentStatus} />
                  <KeyValueRow label="Shift Type" value={employee.shiftType} />
                  <KeyValueRow label="Contract Number" value={employee.contractNumber} />
                  <KeyValueRow label="Employment Start Date" value={employee.employmentStartDate} />
                  <KeyValueRow label="Contract End Date" value={employee.contractEndDate} />
                </>
              )}
            </DetailInfoCard>

            <DetailInfoCard title="Access & Security">
              {editMode ? (
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Card Assignment"><input value={values.cardAssignment} onChange={(e) => onChange((current) => ({ ...current, cardAssignment: e.target.value }))} className={fieldInputClass} /></Field>
                  <Field label="Fingerprint Assignment"><input value={values.fingerprintAssignment} onChange={(e) => onChange((current) => ({ ...current, fingerprintAssignment: e.target.value }))} className={fieldInputClass} /></Field>
                  <Field label="Access Level">
                    <select value={values.accessGroup} onChange={(e) => onChange((current) => ({ ...current, accessGroup: e.target.value }))} className={fieldInputClass}>
                      <option value="">Select Access Level</option>
                      {employeeAccessLevels.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </Field>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <IconStatusCard
                      active={employee.cardAssignment === "Assigned"}
                      icon={<CardIcon className="h-5 w-5" />}
                    />
                    <IconStatusCard
                      active={employee.fingerprintAssignment === "Assigned"}
                      icon={<FingerprintIcon className="h-5 w-5" />}
                    />
                  </div>
                  <KeyValueRow label="Access Level" value={employee.accessGroup} />
                </div>
              )}
            </DetailInfoCard>

            <DetailInfoCard title="Compensation & Additional Details">
              {editMode ? (
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Salary"><input value={values.salary} onChange={(e) => onChange((current) => ({ ...current, salary: e.target.value }))} className={fieldInputClass} /></Field>
                  <Field label="Hourly Rate"><input value={values.hourlyRate} onChange={(e) => onChange((current) => ({ ...current, hourlyRate: e.target.value }))} className={fieldInputClass} /></Field>
                  <Field label="Emergency Contact"><input value={values.emergencyContact} onChange={(e) => onChange((current) => ({ ...current, emergencyContact: e.target.value }))} className={fieldInputClass} /></Field>
                  <Field label="Branch / Office Location"><input value={values.branchLocation} onChange={(e) => onChange((current) => ({ ...current, branchLocation: e.target.value }))} className={fieldInputClass} /></Field>
                  <div className="col-span-2">
                    <Field label="Address"><input value={values.address} onChange={(e) => onChange((current) => ({ ...current, address: e.target.value }))} className={fieldInputClass} /></Field>
                  </div>
                  <div className="col-span-2">
                    <Field label="Notes"><textarea value={values.notes} onChange={(e) => onChange((current) => ({ ...current, notes: e.target.value }))} className={`${fieldInputClass} min-h-[96px] resize-none`} /></Field>
                  </div>
                </div>
              ) : (
                <>
                  <KeyValueRow label="Salary" value={employee.salary} />
                  <KeyValueRow label="Hourly Rate" value={employee.hourlyRate || "-"} />
                  <KeyValueRow label="Allowance" value={employee.allowance || "-"} />
                  <KeyValueRow label="Emergency Contact" value={employee.emergencyContact || "-"} />
                  <KeyValueRow label="Branch / Office Location" value={employee.branchLocation || "-"} />
                  <KeyValueRow label="Address" value={employee.address || "-"} />
                  <KeyValueRow label="Notes" value={employee.notes || "-"} />
                </>
              )}
            </DetailInfoCard>
          </div>
        </div>
      </div>
    </>
  );
}

function DeviceFormModal({ isOpen, editing, values, onChange, onClose, onSubmit }) {
  if (!isOpen) return null;
  const setField = (field, value) => onChange((current) => ({ ...current, [field]: value }));

  return (
    <>
      <div className="drawer-overlay fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 h-full w-[520px] animate-slideIn overflow-auto bg-white shadow-2xl">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-navy">
                {editing ? "Edit Device" : "Add Device"}
              </h2>
              <p className="mt-1 text-xs text-navy/40">
                {editing
                  ? "Update device connection settings"
                  : "Configure device connection settings"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-surface"
            >
              <CloseIcon className="h-5 w-5 text-navy/50" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <Field label="Protocol">
              <select
                value={values.protocol}
                onChange={(event) => setField("protocol", event.target.value)}
                className={fieldInputClass}
              >
                {protocolOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Device Name">
              <input
                value={values.device_name}
                onChange={(event) => setField("device_name", event.target.value)}
                placeholder="e.g., Main Entrance Controller"
                className={fieldInputClass}
              />
            </Field>
            <Field label="IP Address">
              <input
                value={values.device_ip}
                onChange={(event) => setField("device_ip", event.target.value)}
                placeholder="e.g., 192.168.1.64"
                className={fieldInputClass}
              />
            </Field>
            <Field label="Port">
              <input
                type="number"
                value={values.device_port}
                onChange={(event) => setField("device_port", event.target.value)}
                placeholder="e.g., 8000"
                className={fieldInputClass}
              />
            </Field>
            <Field label="Username">
              <input
                value={values.device_username}
                onChange={(event) => setField("device_username", event.target.value)}
                placeholder="e.g., admin"
                className={fieldInputClass}
              />
            </Field>
            <Field label="Password">
              <input
                type="password"
                value={values.device_password}
                onChange={(event) => setField("device_password", event.target.value)}
                placeholder="........"
                className={fieldInputClass}
              />
            </Field>

            <div className="mt-8 flex items-center gap-3 border-t border-navy/[0.06] pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border-2 border-navy/10 px-4 py-3 text-sm font-semibold text-navy transition hover:border-navy/20 hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-purple px-4 py-3 text-sm font-semibold text-white shadow-purple transition hover:bg-purple/90"
              >
                {editing ? "Update Device" : "Save Device"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function Pagination({ currentPage, totalPages, onPageChange, summary }) {
  return (
    <div className="mb-4 mt-8 flex items-center justify-between">
      <p className="text-xs font-medium text-navy/40">{summary}</p>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`pagination-btn flex h-9 w-9 items-center justify-center rounded-xl ${
            currentPage === 1
              ? "cursor-not-allowed text-navy/20"
              : "text-navy/60 hover:bg-white hover:shadow-sm"
          }`}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`pagination-btn flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition ${
              page === currentPage
                ? "bg-purple text-white shadow-purple"
                : "text-navy/50 hover:bg-white hover:shadow-sm"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`pagination-btn flex h-9 w-9 items-center justify-center rounded-xl ${
            currentPage === totalPages
              ? "cursor-not-allowed text-navy/20"
              : "text-navy/60 hover:bg-white hover:shadow-sm"
          }`}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="rounded-[28px] border border-navy/[0.05] bg-white p-10 shadow-sm">
        <h1 className="text-[28px] font-bold leading-tight tracking-tight text-navy">{title}</h1>
        <p className="mt-2 text-sm font-medium text-navy/45">
          This section is preserved in the current product structure and can be expanded later without changing the Devices or Employees modules.
        </p>
      </div>
    </div>
  );
}

function FilterSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`${fieldInputClass} bg-surface`}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function SectionHeading({ title, description }) {
  return (
    <div className="mb-6">
      <div className="text-sm font-bold uppercase tracking-[0.18em] text-navy/40">{title}</div>
      <div className="mt-2 text-sm font-medium text-navy/45">{description}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-navy/50">
        {label}
      </label>
      {children}
    </div>
  );
}

function InfoBlock({ label, children }) {
  return (
    <div className="flex-1 border-l border-navy/[0.06] px-5">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-navy/35">
        {label}
      </p>
      {children}
    </div>
  );
}

function StatusChip({ status }) {
  const tone =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : status === "On Leave"
        ? "bg-yellow/20 text-yellow-700"
        : "bg-red-50 text-red-500";
  const dot =
    status === "Active"
      ? "bg-emerald-400"
      : status === "On Leave"
        ? "bg-yellow"
        : "bg-red-400";
  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${tone}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {status}
    </div>
  );
}

function MetaChip({ children }) {
  return (
    <div className="inline-flex items-center rounded-full bg-surface px-4 py-2 text-sm font-semibold text-navy/70">
      {children}
    </div>
  );
}

function DetailInfoCard({ title, children }) {
  return (
    <div className="rounded-[28px] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-semibold text-navy">{title}</div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function SortableHeader({ label, field, sortField, sortDirection, onSort }) {
  const isActive = sortField === field;
  return (
    <button
      type="button"
      onClick={() => onSort(field)}
      className={`inline-flex items-center gap-2 text-left text-[11px] font-bold uppercase tracking-[0.18em] transition ${
        isActive ? "text-purple" : "text-navy/40 hover:text-purple"
      }`}
    >
      <span>{label}</span>
      {isActive ? (
        sortDirection === "asc" ? (
          <ChevronUpIcon className="h-3.5 w-3.5" />
        ) : (
          <ChevronDownIcon className="h-3.5 w-3.5" />
        )
      ) : (
        <ChevronUpDownIcon className="h-3.5 w-3.5 text-navy/25" />
      )}
    </button>
  );
}

function KeyValueRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-navy/[0.06] pb-3 last:border-b-0 last:pb-0">
      <span className="text-xs font-medium uppercase tracking-wider text-navy/40">{label}</span>
      <span className="max-w-[240px] text-right text-sm font-semibold text-navy">{value}</span>
    </div>
  );
}

function IconStatusCard({ active, icon }) {
  return (
    <div className={`rounded-2xl border p-4 ${active ? "border-emerald-200 bg-emerald-50" : "border-red-100 bg-red-50"}`}>
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${active ? "bg-white text-emerald-600" : "bg-white text-red-400"}`}>
          {icon}
        </div>
        {active ? (
          <CheckIcon className="h-4 w-4 text-emerald-500" />
        ) : (
          <CloseIcon className="h-4 w-4 text-red-400" />
        )}
      </div>
    </div>
  );
}

function ConfirmModal({ isOpen, tone, title, description, confirmText, onClose, onConfirm, icon }) {
  if (!isOpen) return null;
  const iconTone = tone === "danger" ? "bg-red-50" : "bg-yellow/20";
  const buttonTone =
    tone === "danger"
      ? "bg-red-500 text-white shadow-red hover:bg-red-600"
      : "bg-yellow text-navy shadow-yellow hover:bg-yellow/90";

  return (
    <>
      <div className="drawer-overlay fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-50 w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconTone}`}>
            {icon}
          </div>
          <div>
            <h3 className="mb-1 text-lg font-bold text-navy">{title}</h3>
            <p className="text-sm text-navy/50">{description}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-navy/10 px-4 py-3 text-sm font-semibold text-navy transition hover:border-navy/20 hover:bg-surface"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${buttonTone}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
}

function Drawer({ device, onClose }) {
  if (!device) return null;
  const fields = [
    ["Device Name", device.name],
    ["Device ID", device.deviceId],
    ["Model", device.model],
    ["Serial Number", device.serial],
    ["IP Address", device.ip],
    ["MAC Address", device.mac],
    ["Firmware Version", device.firmware],
    ["Firmware Release Date", device.fwDate],
    ["Device Type", device.type],
  ];

  return (
    <>
      <div className="drawer-overlay fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 h-full w-[440px] animate-slideIn overflow-auto bg-white shadow-2xl">
        <div className="p-7">
          <div className="mb-7 flex items-center justify-between">
            <h2 className="text-xl font-bold text-navy">Device Detail</h2>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-surface"
            >
              <CloseIcon className="h-5 w-5 text-navy/50" />
            </button>
          </div>

          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              device.online ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-500"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                device.online ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
            {device.online ? "Online" : "Offline"}
          </div>

          <div className="flex flex-col">
            {fields.map(([label, value]) => (
              <div
                key={label}
                className="flex items-start justify-between border-b border-navy/[0.05] py-3.5"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-navy/40">
                  {label}
                </span>
                <span className="max-w-[240px] text-right font-mono text-sm font-semibold text-navy">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarIcon({ type, className }) {
  if (type === "grid") return <GridIcon className={className} />;
  if (type === "users") return <UsersIcon className={className} />;
  if (type === "calendar") return <CalendarIcon className={className} />;
  if (type === "device") return <DeviceIcon className={className} />;
  if (type === "door") return <DoorFrameIcon className={className} />;
  return <SettingsIcon className={className} />;
}

function createEmployeeRecord(data) {
  return {
    ...employeeBlankForm,
    ...data,
    hourlyRate: data.hourlyRate || data.bonus || "",
    fullName: `${data.firstName} ${data.lastName}`.trim(),
    avatar: data.photoDataUrl ? "" : getInitials(`${data.firstName} ${data.lastName}`),
    photoName: data.photoName || "",
    photoDataUrl: data.photoDataUrl || "",
  };
}

function getEmployeeSortValue(employee, field) {
  if (field === "salary") return parseCurrency(employee.salary);
  if (field === "annualLeaveBalance") return parseLeadingNumber(employee.annualLeaveBalance);
  if (field === "employmentStartDate" || field === "contractEndDate") {
    return new Date(employee[field] || "1900-01-01").getTime();
  }
  return employee[field] || "";
}

function parseCurrency(value) {
  return Number.parseFloat(String(value || "").replace(/[^\d.]/g, "")) || 0;
}

function parseLeadingNumber(value) {
  return Number.parseFloat(String(value || "").match(/[\d.]+/)?.[0] || "0") || 0;
}

function isEmployeeStepComplete(values, step) {
  if (step === 1) {
    return Boolean(
      values.internalId &&
        values.firstName &&
        values.lastName &&
        values.email &&
        values.fatherName &&
        values.fin &&
        values.serialNumber &&
        values.dateOfBirth,
    );
  }

  if (step === 2) {
    return Boolean(
      values.position &&
        values.department &&
        values.contractNumber &&
        values.employmentStartDate &&
        values.contractEndDate &&
        values.annualLeaveDuration &&
        values.employmentStatus &&
        values.shiftType &&
        values.group,
    );
  }

  if (step === 3) {
    return Boolean(
      values.cardAssignment &&
        values.fingerprintAssignment &&
        values.accessGroup &&
        (values.photoDataUrl || values.photoName),
    );
  }

  if (step === 4) {
    return Boolean(values.salary && values.hourlyRate && values.phone);
  }

  return false;
}

function getInitials(fullName) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function IconBase({ children, className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function ShieldCheckIcon(props) { return <IconBase {...props}><path d="M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z" /><path d="M9.5 12.5l1.7 1.7 3.3-3.7" /></IconBase>; }
function GridIcon(props) { return <IconBase {...props}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></IconBase>; }
function UsersIcon(props) { return <IconBase {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></IconBase>; }
function CalendarIcon(props) { return <IconBase {...props}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h.01M12 14h.01M16 14h.01" /></IconBase>; }
function DeviceIcon(props) { return <IconBase {...props}><path d="M4 7h16l1 10H3L4 7z" /><path d="M7 7V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2" /><path d="M8 13h.01M12 13h.01M16 13h.01" /></IconBase>; }
function DoorFrameIcon(props) { return <IconBase {...props}><path d="M4 21h16" /><path d="M8 21V5l8-2v18" /><path d="M13 13h.01" /></IconBase>; }
function SettingsIcon(props) { return <IconBase {...props}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 14 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c.64.26 1.07.88 1.08 1.57V10a2 2 0 1 1 0 4h-.09c-.69.01-1.31.44-1.57 1z" /></IconBase>; }
function RefreshIcon(props) { return <IconBase {...props}><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6l3 2" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6l-3-2" /></IconBase>; }
function ZapIcon(props) { return <IconBase {...props}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></IconBase>; }
function PlusIcon(props) { return <IconBase {...props}><path d="M12 5v14M5 12h14" /></IconBase>; }
function UnlockIcon(props) { return <IconBase {...props}><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V8a5 5 0 0 1 9.9-1" /></IconBase>; }
function LockIcon(props) { return <IconBase {...props}><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></IconBase>; }
function DoorOpenIcon(props) { return <IconBase {...props}><path d="M4 21h16" /><path d="M8 21V5l8-2v18" /><path d="M12 11h.01" /><path d="M16 12h4" /></IconBase>; }
function DownloadCloudIcon(props) { return <IconBase {...props}><path d="M8 17a4 4 0 1 1 .8-7.9A5 5 0 0 1 18 10a4 4 0 1 1 0 8H8z" /><path d="M12 12v6" /><path d="M9 15l3 3 3-3" /></IconBase>; }
function CheckIcon(props) { return <IconBase {...props}><path d="M20 6L9 17l-5-5" /></IconBase>; }
function SpinnerIcon(props) { return <IconBase {...props}><path d="M21 12a9 9 0 1 1-6.2-8.56" /></IconBase>; }
function ChevronLeftIcon(props) { return <IconBase {...props}><path d="M15 18l-6-6 6-6" /></IconBase>; }
function ChevronRightIcon(props) { return <IconBase {...props}><path d="M9 18l6-6-6-6" /></IconBase>; }
function ChevronUpIcon(props) { return <IconBase {...props}><path d="m18 15-6-6-6 6" /></IconBase>; }
function ChevronDownIcon(props) { return <IconBase {...props}><path d="m6 9 6 6 6-6" /></IconBase>; }
function ChevronUpDownIcon(props) { return <IconBase {...props}><path d="m8 9 4-4 4 4" /><path d="m16 15-4 4-4-4" /></IconBase>; }
function CloseIcon(props) { return <IconBase {...props}><path d="M18 6L6 18M6 6l12 12" /></IconBase>; }
function AlertCircleIcon(props) { return <IconBase {...props}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></IconBase>; }
function SearchIcon(props) { return <IconBase {...props}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></IconBase>; }
function EyeIcon(props) { return <IconBase {...props}><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></IconBase>; }
function PencilIcon(props) { return <IconBase {...props}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></IconBase>; }
function TrashIcon(props) { return <IconBase {...props}><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /></IconBase>; }
function ArrowLeftIcon(props) { return <IconBase {...props}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></IconBase>; }
function UploadIcon(props) { return <IconBase {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5" /><path d="M12 3v12" /></IconBase>; }
function CameraIcon(props) { return <IconBase {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></IconBase>; }
function FingerprintIcon(props) { return <IconBase {...props}><path d="M8 13a4 4 0 0 1 8 0v1" /><path d="M12 19v-6" /><path d="M9 17c0 1.7 1.3 3 3 3s3-1.3 3-3v-2" /><path d="M6 14v-1a6 6 0 0 1 12 0v2" /></IconBase>; }
function CardIcon(props) { return <IconBase {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h3" /></IconBase>; }
function FaceIcon(props) { return <IconBase {...props}><path d="M9 3H5a2 2 0 0 0-2 2v4" /><path d="M15 3h4a2 2 0 0 1 2 2v4" /><path d="M21 15v4a2 2 0 0 1-2 2h-4" /><path d="M3 15v4a2 2 0 0 0 2 2h4" /><path d="M9 10h.01M15 10h.01" /><path d="M8 15c1.2 1 2.5 1.5 4 1.5s2.8-.5 4-1.5" /></IconBase>; }

export default App;
