const crypto = require('crypto');

// Generate a 128-byte (1024-bit) random secret key
const secretKey = crypto.randomBytes(128).toString('hex');
console.log('Generated Secret Key:', secretKey);

module.exports = secretKey