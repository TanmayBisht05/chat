import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js";

export const signup= async (req,res)=>{
    const {fullName,email,password}=req.body;
    console.log("request received!");
    
    try{

        if(!fullName || !email || !password ){
            return res.status(400).json({message: "All fields are required!"});
        }


        // hash password 
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }

        const user=await User.findOne({email});                 
        // actual syntax is:
        // const user =await User.findOne({email: email}), but since the attribute name is same here, we can use the shorthand 

        if(user) return res.status(400).json({message: "Email already exists"});

        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);


        // salt is random string added to the object for making it difficult to crack passwords 

        const newUser =new User({
            fullName,
            email,
            password: hashedPassword
        })




        if(newUser){
            // generate the jwt token here 
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            });

        }
        else {
            res.status(400).json({message:"Invalid user data"});
        }

    } catch (error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: "Internal Server Error!"});
    }
};



export const login= async (req,res)=>{
    const {email, password }=req.body;
    try {
        const user=await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: "Invalid credentials!"});
        }

        const isPasswordCorrect=await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }

        generateToken(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        });

        
    } catch (error){
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Internal Server Error"});

    }
};



export const logout=(req,res)=>{
    try{
        res.cookie("jwt", "",{maxAge:0});
        res.status(200).json({message: "Logged out successfully"});


    }catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Interal Server Error"});
    }
};


export const updateProfile= async(req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId=req.user._id;

        if(!profilePic){
            return res.status(400).json({message: "Profile Pic is required"});
        }
        
        const uploadResponse= await cloudinary.uploader.upload(profilePic);
        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url}, {new:true});


        // new:true ensures it returns the updated document 


        res.status(200).json(updatedUser)
    }

    catch(error){
        console.log("error in update profile:", error.message);
        res.status(500).json("Internal Server Error");
    }

};


export const checkAuth =(req,res)=>{
    try{ 
        res.status(200).json(req.user);
    }
    catch (error){
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}




// see readme file for http status codes and response function syntaxes 


