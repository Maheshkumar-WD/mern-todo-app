let mongoose = require("mongoose");
let todoSchema = mongoose.Schema({
    userId: String,
    title: String,
    status: { type: Boolean, default: false },
    category: String,
});
let TodoModel = mongoose.model("mern-crud-ass-todo", todoSchema);

module.exports = { TodoModel };
