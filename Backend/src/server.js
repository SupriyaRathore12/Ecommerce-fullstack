const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/route.js");
const cors=require("cors")


const app = express();
// let middleware1=(req,res,next)=>{
//     console.log("middleware1");
//     next();
// }
// let middleware2=(req,res,next)=>{
//     console.log("middleware2");
//     next();

// }
app.use(cors());
app.use(express.json());
app.use("/", router)



app.get("/", (req, res) => {
    res.send("hello world");
})

mongoose.connect("mongodb+srv://supriyarathor68:rJ16Ts5cvyxyjdH4@cluster0.umtc5pm.mongodb.net/Ecommerce-fullstack")
    .then(() => console.log("MongoDB Connected")
    )
    .catch(() => console.log("DB Not connected")
    )

app.listen(4000, (err) => {
    err
        ? console.log("server not connected")
        : console.log("server is running on port 4000")

})

