import jwt from "jsonwebtoken"

export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })


    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV!=="development"
    })

    return token;
}


// systax for functions:

// jwt.sign(payload, secret_key, options)                       
// res.cookie(name,value,options)


// payload is the actual data you wanna store in token, which generally is a primary key for auth purposes 

// http is set to be true to avoid the cookie from being accessed using javascript (using document.cookie), this prevents XSS attacks (Cross Site Scripting)
// sameSite being strict ensures the cookies will be sent for first party requests only 
// secure is used for enabling http along with https 

