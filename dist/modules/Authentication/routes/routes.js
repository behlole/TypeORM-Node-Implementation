"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const userRouter = (0, express_1.default)();
userRouter.get('/', UserController_1.default.getUser);
userRouter.post('/', UserController_1.default.register);
exports.default = userRouter;
