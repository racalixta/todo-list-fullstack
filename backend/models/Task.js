const { trusted } = require('../db/conn');
const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Tasl = mongoose.model(
  'Task',
  new Schema (
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required:  true
      },
      date: {
        type: Date,
        required: required,
      },
      category: {
        type: String,
        required: true
      },
      done: {
        type: Boolean,
        required: true
      },
      user: Object
    },
    { timestamps: true },
  )
);

module.exports = Task;
