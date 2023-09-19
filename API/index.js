const express = require("express");
const app = express();
const userRoutes = require("./route/userRoutes"); // Import the user routes and secretKey
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Import the cors middleware
app.use(express.json()); // Parse JSON requests
const { secretKey } = require("./config");
const CompMaster = require("./route/CMRoute");
const CompConfig = require("./route/CompanyConfigRoute");
const BankMaster = require("./route/BankMasterRoute");
const DepartmentMaster = require("./route/DepartmentMasterRoute");
const DestinationMaster = require("./route/DestinationMasterRoute");
const FinMaster = require("./route/FinMasterRoute");

// Your authentication middleware for token verification
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
}

// Apply the cors middleware to allow requests from any origin
app.use(cors());

// Apply the authentication middleware for protected routes
app.use("/protected-route", verifyToken);

// Use the user routes
app.use("/users", userRoutes);
app.use("/companies", CompMaster);
app.use("/company-config", CompConfig);
app.use("/bankmaster", BankMaster);
app.use("/departmentmaster", DepartmentMaster);
app.use("/financials", FinMaster);
app.use("/destinationmaster", DestinationMaster);

// Start the server
const port = 5500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
