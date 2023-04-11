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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const UserValidator_1 = require("../utils/Validators/UserValidator");
const RequestResponseMappings_1 = __importDefault(require("../../../Shared/utils/Mappings/RequestResponseMappings"));
const UserController_1 = __importDefault(require("./UserController"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return RequestResponseMappings_1.default.sendSuccessMessage(res, yield User_1.default.find());
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let userValidationError = UserController_1.default.errorValidateUserSchema(req.body);
        if (userValidationError && "details" in userValidationError) {
            return RequestResponseMappings_1.default
                .sendErrorMessage(res, userValidationError.details);
        }
        let user = yield User_1.default.create({ email: req.body.email, password: req.body.password });
        yield user.save();
        return UserController_1.default.loginUser(req, res, user);
    }),
    loginUser: (req, res, user = null) => {
        let secretKey = process.env.JWT_SECRET_KEY;
        if (user && secretKey) {
            let token = jsonwebtoken_1.default.sign({ email: user.email, password: user.password }, secretKey);
            return RequestResponseMappings_1.default.sendSuccessMessage(res, {
                token: token,
                user: user
            });
        }
        else if (secretKey) {
        }
        return RequestResponseMappings_1.default.sendErrorMessage(res);
    },
    errorValidateUserSchema: (incomingUser) => {
        let userValidationError = UserValidator_1.UserSchema.validate(incomingUser).error;
        if (!userValidationError) {
            return false;
        }
        return userValidationError;
    }
};
