const Page = require('../models/Page');

exports.createPage = async (req, res) => {
  try {
    const page = new Page(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPages = async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePage = async (req, res) => {
  if (req.body.subIndex !== undefined && req.body.contentBlocks) {
  const page = await Page.findById(req.params.id);
  if (!page) return res.status(404).json({ message: "Page not found" });

  page.subPages[req.body.subIndex].contentBlocks = req.body.contentBlocks;
  await page.save();
  return res.status(200).json({ success: true, page });
}

};

exports.deletePage = async (req, res) => {
  try {
    await Page.findByIdAndDelete(req.params.id);
    res.json({ message: 'تم الحذف بنجاح' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeSubPage = async (req, res) => {
  try {
    const { subPageIndex } = req.body;
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ message: 'العنوان غير موجود' });

    page.subPages.splice(subPageIndex, 1);
    await page.save();
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

