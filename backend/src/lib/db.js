import mongoose from "mongoose";

export const connectDB =async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        // console.log(process.env.MONGODB_URI);
        // const conn=await mongoose.connect('mongodb+srv://tanmaybisht2005:js6PpGqal9Yv6Mpt@cluster0.ta750.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    } 

    catch (error){
        console.log("MongoDB connection error: ", error);
    }
}