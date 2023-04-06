import {Request, Response} from "express";
import {UserEntity} from "../models/User";

export default {
    getUser: async (req: Request, res: Response) => {
        let users = await UserEntity.find();
        res.send({
            users: users
        })
    },
    createUser: async (req: Request, res: Response) => {
        let {title, content} = req.body;
        let user = await UserEntity.create({title: title, content: content}).save()
        res.send({
            "user": user
        })
    }
}