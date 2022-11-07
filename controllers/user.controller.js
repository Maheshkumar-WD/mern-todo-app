const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config();
// const
const userControllers = {
    getUser: (req, res) => {
        try {
            const { token } = req.query;
            const SECRET_KEY = process.env.SECRET_KEY;
            jwt.verify(token, SECRET_KEY, async (err, decoded) => {
                let data = await UserModel.findOne({ email: decoded.email });
                res.send({ msg: "success", status: 200, data });
            });
        } catch (err) {
            res.send({ msg: "failed", status: 500, err });
        }
    },
    login: async (req, res) => {
        try{
            let { email, password } = req.body;
        let user = await UserModel.findOne({ email });
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.send("somthing went wrong");
                } else {
                    if (result) {
                        const SECRET_KEY = process.env.SECRET_KEY;
                        const token = jwt.sign({ email }, SECRET_KEY);
                        res.send({
                            msg: "success",
                            status: 200,
                            data: { user, token },
                        });
                    } else {
                        res.send({
                            msg: "login failed",
                            status: 404,
                        });
                    }
                    
                }
            });
        }else{
            res.send({status:404,msg:"user not found"})
        }
        }catch(err){
            console.log(err);
        }
        
    },
    postUser: async (req, res) => {
        try {
            let { name, age, email, course, role, password } = req.body;
            const checkUserExist = await UserModel.find({ email });
            if (checkUserExist.length > 0) {
                res.send({
                    msg: "user already exist",
                    status: 403,
                });
            } else {
                bcrypt.hash(password, 4, async (err, hash) => {
                    if (err) {
                        res.send({
                            msg: "Somthing went wrong, please try after some time",
                            status: 400,
                        });
                    } else {
                        let obj = {
                            name,
                            age,
                            email,
                            course,
                            role,
                            password: hash,
                        };
                        const newUser = new UserModel(obj);
                        await newUser.save();
                        res.send({ msg: "register success", status: 200 });
                    }
                });
            }
        } catch (err) {
            res.send({ msg: "error" });
        }
    },
};

module.exports = { userControllers };
