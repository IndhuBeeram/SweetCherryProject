const jwt=require("jsonwebtoken");
const verifyToken=(req,res,next)=>{
    try{
        const authHeader=req.headers["authorization"];
        if(!authHeader){
            return res.status(401).json({message:"Access token not provided"});

        }
        const jwtToken=authHeader.split(" ")[1];
        if (!jwtToken) {
            return res.status(401).json({ message: "Invalid access token" });
          }
        
        //Verify the token
        jwt.verify(jwtToken,"indhu",(err,decoded)=>{
            if(err){
                return res.status(401).json({message:"Unauthorized access"});
            }
            console.log("details of user", decoded);
            console.log("id", decoded._id);
            // Attach the decoded token to the request for future use
            req.email = decoded?.email;
            req._id = decoded._id;
            req.user = decoded;
       
            next(); 
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error")
    }
}
module.exports=verifyToken;