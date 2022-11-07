const jwt = require("jsonwebtoken");
const { TodoModel } = require("../models/todos.model");
require("dotenv").config();
const todoControllers = {
    getTodos: async (req, res) => {
        let token = await req.headers.token;
        if (token) {
            jwt.verify(
                token,
                process.env.SECRET_KEY,
                async function (err, decoded) {
                    let userId = decoded.email;
                    if (err) {
                        res.send({ msg: "something went wrong", status: 500 });
                    } else {
                        let data = await TodoModel.find({ userId: userId });
                        res.send(data);
                    }
                }
            );
        } else {
            res.send({ msg: "Access Denied" });
        }
    },
    getOneTodo: async (req, res) => {
        let token = await req.headers.token;
        let todoId = await req.headers.todoid;
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                res.send("something went wrong");
            } else {
                let data = await TodoModel.findOne({ _id: todoId });
                res.send(data);
            }
        });
    },
    postTodo: async (req, res) => {
        let token = await req.body.headers.token;
        let reqdata = await req.body.data;
        jwt.verify(
            token,
            process.env.SECRET_KEY,
            async function (err, decoded) {
                let userId = decoded.email;
                if (err) {
                    res.send({ msg: "something went wrong", status: 500 });
                } else {
                    let dataToBeAdded = {
                        ...reqdata,
                        userId,
                    };
                    let data = new TodoModel(dataToBeAdded);
                    await data.save();
                    res.send({ msg: "Added success", status: 200 });
                }
            }
        );
    },

    updateTodo: async (req, res) => {
        let { id } = req.params;
        let token = req.body.headers.token;
        let updateData = req.body.headers.data;
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                res.send(err);
            } else {
                let userId = decoded.email;
                await TodoModel.updateOne(
                    { _id: id, userId: userId },
                    updateData
                );
                res.send("updated success");
            }
        });
    },
    deleteTodo: async (req, res) => {
        let token = req.body.token;
        let { id } = req.params;
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                res.send(err);
            } else {
                await TodoModel.deleteOne({ _id: id, userId: decoded.email });
                res.send({ status: 200, msg: "deleted success" });
            }
        });
    },
};

module.exports = { todoControllers };
