import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next)=>{
    try {
        const token=req.cookies.jwt;

        if(!token){
            console.log("Unauthorized - No Token Provided");
            return res.status(401).json({message: "Unauthorized - No Token Provided"});
        }


        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            console.log("Unauthorized - Invalid Token");
            res.status(401).json({message: "Unauthorized - Invalid Token"});
        }


        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
            console.log("User not found!");
            res.status(404).json({message: " User not found"});
        }


        // console.log("the logged in user's id: ", user._id);

        req.user=user;
        next ();

         
    }

    catch(error){
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({message: "Internal Server Error"});

    }
}