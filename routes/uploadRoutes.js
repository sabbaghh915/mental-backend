const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'لم يتم رفع أي ملف' });
  res.status(200).json({ path: `uploads/${req.file.filename}` });
});

module.exports = router;
