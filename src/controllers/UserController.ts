import {Request, Response} from "express";
import User from "../models/User";

export default {
    getUser: async (req: Request, res: Response) => {
        res.send({
            "users": await User.find()
        })
    },
    createUser: async (req: Request, res: Response) => {
        let {username, email} = req.body;
        if (username && email) {
            let user = await User.create({email: email, username: username});
            await user.save();
            res.send({
                "user": user,
                "message": "User created successfully"
            })
        } else {
            res.send({
                "message": "Validation failed!"
            })
        }

    }
}