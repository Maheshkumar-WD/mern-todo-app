const mongoose = require("mongoose");
let reqString = { type: String, required: true };
const userSchema = mongoose.Schema({
    name: reqString,
    age: { type: Number, required: true },
    role: { type: String, default: "student" },
    course: reqString,
    email: reqString,
    password: reqString,
});
const UserModel = mongoose.model("mern-crud-ass-user", userSchema);

module.exports = { UserModel };
