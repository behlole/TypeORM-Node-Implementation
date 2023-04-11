import {Request, Response} from "express";
import User from "../models/User";
import {UserSchema} from "../utils/Validators/UserValidator";
import RequestResponseMappings from "../../../Shared/utils/Mappings/RequestResponseMappings";
import UserController from "./UserController";
import jsonwebtoken from 'jsonwebtoken';
import dotenv from "dotenv";
import Joi from "joi";


interface _User {
    email: string;
    password: string;
}

export default {
    getUser: async (req: Request, res: Response) => {
        return RequestResponseMappings.sendSuccessMessage(res, await User.find())
    },
    register: async (req: Request, res: Response) => {
        let userValidationError: Boolean | Joi.ValidationError | undefined = UserController.errorValidateUserSchema(req.body)
        if (userValidationError && "details" in userValidationError) {
            return RequestResponseMappings
                .sendErrorMessage(
                    res,
                    userValidationError.details
                )
        }
        let user = await User.create({email: req.body.email, password: req.body.password});
        await user.save();
        return UserController.loginUser(req, res, user);
    },
    loginUser: (req: Request, res: Response, user: _User | null = null) => {
        let secretKey = process.env.JWT_SECRET_KEY;
        if (user && secretKey) {
            let token = jsonwebtoken.sign(
                {email: user.email, password: user.password},
                secretKey);
            return RequestResponseMappings.sendSuccessMessage(res, {
                token: token,
                user: user
            })
        } else if (secretKey) {

        }
        return RequestResponseMappings.sendErrorMessage(res)
    },
    errorValidateUserSchema: (incomingUser: any): Boolean | Joi.ValidationError | undefined => {
        let userValidationError = UserSchema.validate(incomingUser).error
        if (!userValidationError) {
            return false
        }
        return userValidationError;
    }
}