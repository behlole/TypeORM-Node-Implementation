import {Request, Response} from "express";
import User from "../models/User";
import {UserSchema} from "../utils/Validators/UserValidator";
import RequestResponseMappings from "../../../Shared/utils/Mappings/RequestResponseMappings";
import UserController from "./UserController";
import jsonwebtoken from 'jsonwebtoken';
import Joi from "joi";
import bcrypt from 'bcrypt';

interface _User {
    email: string;
    password: string;
}

export default {
    getUser: async (req: Request, res: Response) => {
        return RequestResponseMappings.sendSuccessMessage(res, await User.find())
    },
    register: async (req: Request, res: Response) => {
        let userValidationError:  Joi.ValidationError | undefined = UserController.errorValidateUserSchema(req.body)
        if (userValidationError && "details" in userValidationError) {
            return RequestResponseMappings
                .sendErrorMessage(
                    res,
                    userValidationError.details
                )
        }
        let salt=process.env.JWT_SECRET_KEY;
        if (salt){
            console.log("hello")

            let hashPassword = bcrypt.hashSync(req.body.password, 10)
            let user = await User.create({email: req.body.email, password: hashPassword});
            await user.save();
            // return UserController.loginUser(req, res, user);
        }
        return RequestResponseMappings.sendErrorMessage(res)
    },
    loginUser: async (req: Request, res: Response) => {
        // if (user) {
        //     return UserController.sendTokenWithPayload(res, user);
        // }
        let user = await User.findOneBy({email: req.body.email});
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            return UserController.sendTokenWithPayload(res, user);
        }
        return RequestResponseMappings.sendErrorMessage(res)
    },
    errorValidateUserSchema: (incomingUser: any):  Joi.ValidationError | undefined => {
        let userValidationError = UserSchema.validate(incomingUser).error
        if (!userValidationError) {
            return
        }
        return userValidationError;
    },
    sendTokenWithPayload: (res: Response, user: _User) => {
        return RequestResponseMappings.sendSuccessMessage(res, {
            token: jsonwebtoken.sign(
                {email: user.email, password: user.password},
                process.env.JWT_SECRET_KEY!),
            user: user
        })
    }
}