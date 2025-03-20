import mongoose from "mongoose";

export const connectDB =async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } 

    catch (error){
        console.log("MongoDB connection error: ", error);
    }
}



// i made a db on mongo, and connected it using my uri 
// later, i created 2 schemas viz user and message in this db 
