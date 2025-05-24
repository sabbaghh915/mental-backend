const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Page = require('../models/Page');
const { getPages, updatePage, deletePage, removeSubPage } = require('../controllers/pageController');

console.log("✅ تم تحميل ملف pageRoutes.js");

router.get('/', getPages);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);
router.put('/:id/remove-subpage', removeSubPage);

router.get('/ping', (req, res) => {
  console.log("📡 تم استدعاء ping");
  res.send('pong');
});

router.post('/', (req, res) => {
  console.log("🚀 بدأ التنفيذ");

  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error("❌ MULTER ERROR:", err.message);
      return res.status(500).json({ message: err.message });
    }

    console.log("✅ تم تمرير multer");

    try {
      console.log("🧾 req.body:", req.body);
      console.log("🖼️ req.file:", req.file);

      const { title, showOnHome, order } = req.body;
      const subPages = JSON.parse(req.body.subPages || '[]');
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

      const page = new Page({
        title,
        subPages,
        showOnHome: showOnHome === 'true' || showOnHome === true,
        order: parseInt(order) || 0,
        imageUrl
      });

      await page.save();
      console.log("✅ تم حفظ الصفحة بنجاح");
      res.status(201).json({ success: true, page });
    } catch (err) {
      console.error("❌ SERVER ERROR:", err.message);
      res.status(500).json({ message: err.message });
    }
  });
});

module.exports = router;
