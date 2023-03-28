const mongoose = require('mongoose')


const ToDoSchema = new mongoose.Schema({
    description: { type: String, required: true},
    category: { type: String, required: true},
    due_date: { type: Date, required: true, default: Date.now }
    //comments: [{ body: String, date: Date }],
})

const ToDo = mongoose.model('todo', ToDoSchema);
module.exports = ToDo