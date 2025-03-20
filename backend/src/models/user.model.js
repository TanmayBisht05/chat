import mongoose from "mongoose";

const userSchema =new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
        },

        fullName:{
            type: String,
            required: true,
        },

        password:{
            type:String,
            required: true,
            minlength:6,
        },

        profilePic:{
            type:String,
            default:"",
        },
    },

    {
        timestamps:true 
    }
);


const User=mongoose.model("User", userSchema);
export default User;

// had there been multiple dbs, i would have used 
// const User=db.model("User",userSchema)
// where db is the name of the database





// userSchema is a schema object (a blueprint, it does not add anything to the db)
// User is the model object, which is used to interact with mongo 
// "User" is how it will be saved as the name for schema in the mongo , along with an 's', hence the name of the schema is 'users'
