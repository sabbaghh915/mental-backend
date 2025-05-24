require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const hashed = await bcrypt.hash('admin123', 10);
  const admin = new Admin({ email: 'admin@site.com', password: hashed });
  await admin.save();
  console.log("✅ Admin created successfully");
  mongoose.disconnect();
}).catch((err) => {
  console.error("❌ MongoDB connection failed:", err);
});
