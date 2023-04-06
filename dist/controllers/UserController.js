"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
exports.default = {
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let users = yield User_1.UserEntity.find();
        res.send({
            users: users
        });
    }),
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { title, content } = req.body;
        let user = yield User_1.UserEntity.create({ title: title, content: content }).save();
        res.send({
            "user": user
        });
    })
};
