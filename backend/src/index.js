import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {connectDB} from "./lib/db.js";
import {app,server} from "./lib/socket.js";

dotenv.config();

// const app=express();               this line is needed any more since we are now importing it from socket.js 

const PORT=process.env.PORT;
app.use(express.json())
app.use(cookieParser());

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,              
    })
  );


app.use("/api/auth", authRoutes)
app.use("/api/messages",messageRoutes);

server.listen(PORT, ()=>{
    console.log("server is running on PORT: "+ PORT);
    connectDB();
});

app.get("/test", (req, res) => {
    res.send("Test route is working!");
    console.log("ye to chal rha hai!");
});




// credentials are set true to allow cookies from frontend 
// server.listen(PORT,callback) makes the server ready at PORT, and the callback function is executed once
// had i not used http for creating server, and used app directly, it would be app.listen(...)
