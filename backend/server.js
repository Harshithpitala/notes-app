const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const morgan=require("morgan");
const connectDB=require("./config/db");
const authRoutes=require("./routes/authRoutes");
const createNote=require("./routes/noteRoutes");

dotenv.config();
connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.get("/",(req,res)=>{
    res.send("api is running");
});
app.use("/api/auth",authRoutes);
app.use("/api/notes",createNote);
const Port=process.env.PORT || 5000;
app.listen(Port,()=>{
    console.log(`server is running on PORT ${Port}`);
});