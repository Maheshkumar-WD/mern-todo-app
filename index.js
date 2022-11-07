const express = require("express");
const cors = require("cors")
const { connection } = require("./configs/db");
const {todoRoute}  = require("./routes/todos.route");
const {userRoute} = require("./routes/users.route");

require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(process.env.TODO_ROUTE,todoRoute);
app.use(process.env.USER_ROUTE,userRoute)

app.get("/",(req,res)=>{
     res.send("Welcome to the todos Server"); 
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,async () => {
     console.log("server is running at port "+ PORT)
     try{
          await connection;
          console.log("connected to db")
     }catch(err){
          console.log(err)
          console.log("connection to db failed"); 
     }
})