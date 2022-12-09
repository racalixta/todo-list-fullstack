const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Task = mongoose.model(
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
        type: String,
        required: true,
        // mudar para tipo Date depois
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
    { timestamps: true }
  )
);

module.exports = Task;
