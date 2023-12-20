require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./route/userRoutes"); // Import the user routes and secretKey
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Import the cors middleware
app.use(express.json()); // Parse JSON requests
// const CompMaster = require("./route/CMRoute");
// const CompConfig = require("./route/CompanyConfigRoute");
const BankMaster = require("./route/MBankRoutes");
// const DestinationMaster = require("./route/DestinationMasterRoute");
// const ThreeFieldMaster = require("./route/ThreeFieldsRoutes");
// const TwoFieldMaster = require("./route/TwoFieldsRoutes");
const CCMaster = require("./route/MCostCenterRoute");
// const EmpPersonal = require("./route/EmpPersonalRoute");
const EmpWork = require("./route/MEmployeeWorkProfile");
const MEmployeeSalary = require("./route/MEmployeeSalary");
const MEmployeeProfessional = require("./route/MEmployeeProfessional");
const MEmployeeAcademic = require("./route/MEmployeeAcademic");
const MEmployeeType = require("./route/MEmployeeType");
const MEmployeeGrade = require("./route/MEmployeeGrade");
const MDesignation = require("./route/MDesignation");
const MKRA = require("./route/MKRA");
const MJobResponsibility = require("./route/MJobResponsibility");
const MShift = require("./route/MShift");
// const LeaveMaster = require("./route/LeaveMasterRoute");
// const LeaveApplication = require("./route/LeaveApplicationRoute");
const MWeeklyOff = require("./route/MWeeklyOff");
const EarningHeadsMaster = require("./route/MEarningHeads");
// const HolidayMaster = require("./route/HolidayMasterRoute");
const DeductionHeadsMaster = require("./route/MDeductionHeads");
const ProfessionalTaxMaster = require("./route/MProfessTax");
const AdvanceRequest = require("./route/TAdvanceRequest");
// const EmployeeId = require("./route/EmployeeIdRoute");
// const AttendanceMaster = require("./route/AttendanceMasterRoute");
// const EDImports = require("./route/EDImportsRoute");
const MEmployeeFamily = require("./route/MEmployeeFamily");
// const Currencies = require("./route/CurrenciesRoute");
const MCompany = require("./route/MCompany");
const MFinancialYear = require("./route/MFinancialYear");
const MEmployee = require("./route/MEmployee");
const MEmployeeWorkProfile = require("./route/MEmployeeWorkProfile");
const MDepartment = require("./route/MDepartment");
const MEmployeewiseEarning = require("./route/MEmployeewiseEarning");
const MEmployeewiseDeduction = require("./route/MEmployeewiseDeduction");
const MJobType = require("./route/MJobType");
const MCaderwiseEarning = require("./route/MCaderwiseEarning")
const MCaderwiseDeduction = require("./route/MCaderwiseDeduction")

// Apply the cors middleware to allow requests from any origin
app.use(cors());
// Use the user routes
app.use("/users", userRoutes);
app.use("/companies", MCompany);
app.use("/financials", MFinancialYear);
app.use("/employee/personal", MEmployee);
app.use("/employee/work", MEmployeeWorkProfile);
app.use("/employee/salary", MEmployeeSalary);
app.use("/employee/professional", MEmployeeProfessional);
app.use("/employee/academic", MEmployeeAcademic);
app.use("/employee/family", MEmployeeFamily);
// app.use("/company-config", CompConfig);
app.use("/bankmaster", BankMaster);
app.use("/departmentmaster", MDepartment);
// app.use("/threefieldmaster", ThreeFieldMaster);
// app.use("/twofieldmaster", TwoFieldMaster);
app.use("/financials", MFinancialYear);
app.use("/job-type",MJobType)
// app.use("/destinationmaster", DestinationMaster);
app.use("/cost-center", CCMaster);
app.use("/employee-type", MEmployeeType);
app.use("/employee-grade", MEmployeeGrade);
app.use("/designation-master", MDesignation);
app.use("/KRA-master", MKRA);
app.use("/job-responsibility", MJobResponsibility);
app.use("/shift-master", MShift);
// app.use("/leave-master", LeaveMaster);
// app.use("/leave-application", LeaveApplication);
app.use("/weekly-off", MWeeklyOff);
app.use("/earning-heads", EarningHeadsMaster);
// app.use("/holiday-master", HolidayMaster);
app.use("/deduction-heads", DeductionHeadsMaster);
app.use("/professional-tax", ProfessionalTaxMaster);
app.use("/advance-request", AdvanceRequest);
// app.use("/attendance-master", AttendanceMaster);
// // app.use("/employeeid", EmployeeId);
// app.use("/ed-imports", EDImports);
// app.use("/currency", Currencies);
app.use("/employee-wise-earning", MEmployeewiseEarning);
app.use("/employee-wise-deductions", MEmployeewiseDeduction);
app.use("/caderwise-earning", MCaderwiseEarning)
app.use("/caderwise-deduction", MCaderwiseDeduction)
app.use("/job-type", MJobType);

// Start the server
const port = 5500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
