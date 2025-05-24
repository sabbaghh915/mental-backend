const mongoose = require('mongoose');

const subPageSchema = new mongoose.Schema({
  title: String,
  contentBlocks: [
      {
        type: { type: String, enum: ['text', 'image', 'video'] },
        data: String 
      }
    ]
});

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  subPages: [subPageSchema],
  showOnHome: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  imageUrl: { type: String, default: '' }
});

module.exports = mongoose.model('Page', pageSchema);
