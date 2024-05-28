const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  choices: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      option: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Menu', MenuSchema);
