const express = require("express");
const app = express();
const userRoutes = require("./route/userRoutes"); // Import the user routes and secretKey
const jwt = require("jsonwebtoken");

app.use(express.json()); // Parse JSON requests

// Import the secretKey from userRoutes.js
const { secretKey } = require("./config");
const CompMaster = require("./route/CompMaster");

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

// Apply the authentication middleware for protected routes
app.use("/protected-route", verifyToken);

// Use the user routes
app.use("/users", userRoutes);
app.use("/companies", CompMaster);

// Start the server
const port = 5500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
