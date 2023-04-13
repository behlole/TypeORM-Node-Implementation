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
        return RequestResponseMappings.sendSuccessMessage(res, await User.findOneBy({email:req.body.user.email}))
    },
    register: async (req: Request, res: Response) => {
        try {
            let userValidationError: Joi.ValidationError | undefined = UserController.errorValidateUserSchema(req.body)
            if (userValidationError && "details" in userValidationError) {
                return RequestResponseMappings
                    .sendErrorMessage(
                        res,
                        userValidationError.details
                    )
            }
            let user = User.create(
                {
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10)
                });
            await user.save();
            return UserController.sendTokenWithPayload(res, user);
        }catch (e:any) {
            return RequestResponseMappings.sendErrorMessage(res,{},e.message)
        }
    },
    loginUser: async (req: Request, res: Response) => {
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
        let refreshToken=jsonwebtoken.sign(
            {email: user.email, password: user.password},
            process.env.JWT_SECRET_KEY!)

        return RequestResponseMappings.sendSuccessMessage(res, {
            token: jsonwebtoken.sign(
                {email: user.email, password: user.password},
                process.env.JWT_SECRET_KEY!, {expiresIn:'1m'}),
            refreshToken:refreshToken,
            user: user
        })
    }
}