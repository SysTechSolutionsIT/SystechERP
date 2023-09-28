require('dotenv').config()
const express = require("express");
const app = express();
const userRoutes = require("./route/userRoutes"); // Import the user routes and secretKey
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Import the cors middleware
app.use(express.json()); // Parse JSON requests
const secretKey = process.env.SECRET_KEY
const CompMaster = require("./route/CMRoute");
const CompConfig = require("./route/CompanyConfigRoute");
const BankMaster = require("./route/BankMasterRoute");
const DepartmentMaster = require("./route/DepartmentMasterRoute");
const DestinationMaster = require("./route/DestinationMasterRoute");
const ThreeFieldsMaster = require("./route/ThreeFieldsRoutes")
const FinMaster = require("./route/FinMasterRoute");
const CCMaster = require("./route/CostCenterRoute");
const EmpPersonal = require("./route/EmpPersonalRoute")
const EmpWork = require("./route/EmpWorkRoute")
const EmpSalary = require("./route/EmpSalaryRoute")
const EmpProfessional = require("./route/EmpProfessionalRoute");
const EmpAcademic = require('./route/EmpAcademicRoute');
const EmpType = require("./route/EmployeeTypeRoute")
const EmpGrade = require("./route/EmployeeGradeRoute")
const Designation = require("./route/DesignationRoute")
// Apply the cors middleware to allow requests from any origin
app.use(cors());
// Use the user routes
app.use("/users", userRoutes);
app.use("/companies", CompMaster);
app.use("/company-config", CompConfig);
app.use("/bankmaster", BankMaster);
app.use("/departmentmaster", DepartmentMaster);
app.use("/threefieldmaster", ThreeFieldsMaster);
app.use("/financials", FinMaster);
app.use("/destinationmaster", DestinationMaster);
app.use("/cost-center", CCMaster);
app.use("/employee/personal", EmpPersonal);
app.use("/employee/work", EmpWork)
app.use("/employee/salary", EmpSalary)
app.use("/employee/professional", EmpProfessional)
app.use("/employee/academic", EmpAcademic)
app.use("/employee-type", EmpType)
app.use("/employee-grade", EmpGrade)
app.use("/designation-master", Designation)

// Start the server
const port = 5500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
