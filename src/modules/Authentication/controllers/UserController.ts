import {Request, Response} from "express";
import User from "../models/User";
import {UserSchema} from "../utils/Validators/UserValidator";
import RequestResponseMappings from "../../../Shared/utils/Mappings/RequestResponseMappings";
import {webcrypto} from "crypto";
import * as crypto from "crypto";

export default {
    getUser: async (req: Request, res: Response) => {
        return RequestResponseMappings.sendSuccessMessage(res, await User.find())
    },
    register: async (req: Request, res: Response) => {
        let userValidationError = UserSchema.validate(req.body).error;
        if (userValidationError) {
            return RequestResponseMappings
                .sendErrorMessage(
                    res,
                    userValidationError?.details
                )
        }
        let user = await User.create({email: req.body.email, password: req.body.password});
        await user.save();
        // let hasPassword=bcrypt.

        return RequestResponseMappings
            .sendSuccessMessage(
                res,
                user,
                "User Created Successfully"
            )
    },
    loginUser: (req: Request, res: Response) => {

    }
}