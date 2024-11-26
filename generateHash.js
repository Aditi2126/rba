const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('newAdminPassword123', 10); // Use a new password
console.log('Hashed password:', hashedPassword);
