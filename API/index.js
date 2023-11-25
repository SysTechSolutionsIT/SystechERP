require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./route/userRoutes"); // Import the user routes and secretKey
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Import the cors middleware
app.use(express.json()); // Parse JSON requests
// const CompMaster = require("./route/CMRoute");
// const CompConfig = require("./route/CompanyConfigRoute");
// const BankMaster = require("./route/MBankRoutes");
// const DepartmentMaster = require("./route/DepartmentMasterRoute");
// const DestinationMaster = require("./route/DestinationMasterRoute");
// const ThreeFieldMaster = require("./route/ThreeFieldsRoutes");
// const TwoFieldMaster = require("./route/TwoFieldsRoutes");
// const FinMaster = require("./route/FinMasterRoute");
const CCMaster = require("./route/MCostCenterRoute");
// const EmpPersonal = require("./route/EmpPersonalRoute");
const EmpWork = require("./route/MEmployeeWorkProfile");
const MEmployeeSalary = require("./route/MEmployeeSalary");
const MEmployeeProfessional = require("./route/MEmployeeProfessional");
const MEmployeeAcademic = require("./route/MEmployeeAcademic");
// const EmpType = require("./route/EmployeeTypeRoute");
// const EmpGrade = require("./route/EmployeeGradeRoute");
// const Designation = require("./route/DesignationRoute");
// const KRAMaster = require("./route/KRARoute");
// const JobResponsibility = require("./route/JobResponsibilityRoute");
// const JobMaster = require("./route/JobMasterRoute");
// const ShiftMaster = require("./route/ShiftMasterRoute");
// const LeaveMaster = require("./route/LeaveMasterRoute");
// const LeaveApplication = require("./route/LeaveApplicationRoute");
// const WeeklyOffMaster = require("./route/WeeklyOffRoute");
const EarningHeadsMaster = require("./route/MEarningHeads");
// const HolidayMaster = require("./route/HolidayMasterRoute");
const DeductionHeadsMaster = require("./route/MDeductionHeads");
const ProfessionalTaxMaster = require("./route/MProfessTax");
// const AdvanceRequest = require("./route/AdvanceRequestRoute");
// const EmployeeId = require("./route/EmployeeIdRoute");
// const AttendanceMaster = require("./route/AttendanceMasterRoute");
// const EDImports = require("./route/EDImportsRoute");
const MEmployeeFamily = require("./route/MEmployeeFamily");
// const Currencies = require("./route/CurrenciesRoute");
const MCompany = require("./route/MCompany");
// const MFinancialYear = require("./route/MFinancialYear");
const MEmployee = require("./route/MEmployee");
const MEmployeeWorkProfile = require("./route/MEmployeeWorkProfile");
const MDepartment = require("./route/MDepartment");

// Apply the cors middleware to allow requests from any origin
app.use(cors());
// Use the user routes
app.use("/users", userRoutes);
app.use("/companies", MCompany);
// app.use("/financials", MFinancialYear);
app.use("/employee/personal", MEmployee);
app.use("/employee/work", MEmployeeWorkProfile);
app.use("/employee/salary", MEmployeeSalary);
app.use("/employee/professional", MEmployeeProfessional);
app.use("/employee/academic", MEmployeeAcademic);
app.use("/employee/family", MEmployeeFamily);
// app.use("/company-config", CompConfig);
// app.use("/bankmaster", BankMaster);
app.use("/departmentmaster", MDepartment);
// app.use("/threefieldmaster", ThreeFieldMaster);
// app.use("/twofieldmaster", TwoFieldMaster);
// app.use("/financials", FinMaster);
// app.use("/destinationmaster", DestinationMaster);
app.use("/cost-center", CCMaster);
// app.use("/employee-type", EmpType);
// app.use("/employee-grade", EmpGrade);
// app.use("/designation-master", Designation);
// app.use("/KRA-master", KRAMaster);
// app.use("/job-responsibility", JobResponsibility);
// app.use("/job-master", JobMaster);
// app.use("/shift-master", ShiftMaster);
// app.use("/leave-master", LeaveMaster);
// app.use("/leave-application", LeaveApplication);
// app.use("/weekly-off-master", WeeklyOffMaster);
app.use("/earning-heads", EarningHeadsMaster);
// app.use("/holiday-master", HolidayMaster);
app.use("/deduction-heads", DeductionHeadsMaster);
app.use("/professional-tax", ProfessionalTaxMaster);
// app.use("/advance-request", AdvanceRequest);
// app.use("/attendance-master", AttendanceMaster);
// // app.use("/employeeid", EmployeeId);
// app.use("/ed-imports", EDImports);
// app.use("/currency", Currencies);

// Start the server
const port = 5500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
