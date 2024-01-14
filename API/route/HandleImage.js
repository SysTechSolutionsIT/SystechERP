// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// // Set up multer for file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/CompanyLogo');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// // Serve static files from the public folder
// app.use(express.static('public'));

// // Handle file upload
// app.post('/upload', upload.single('Logo'), (req, res) => {
//   res.send('File uploaded successfully!');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
