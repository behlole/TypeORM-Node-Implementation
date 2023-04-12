import {NextFunction, Request, Response} from "express";
import jsonwebtoken from "jsonwebtoken";
import RequestResponseMappings from "../utils/Mappings/RequestResponseMappings";

export default {
    isAuthentication:(req:Request,res:Response,next:NextFunction)=>{
        let token=req.header('Authorization')?.split(' ')[1]
        if(token){
            let isVerified=jsonwebtoken.verify(token,process.env.JWT_SECRET_KEY!)
            console.log(isVerified)
            next();
        }
        return RequestResponseMappings.sendErrorMessage(res);

    }
}