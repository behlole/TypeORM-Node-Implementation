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
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = {
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let user = yield User_1.default.findOne({
            where: {
                email: req.body.user.email
            },
            relations: {
                books: true
            }
        });
        return RequestResponseMappings_1.default.sendSuccessMessage(res, user);
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        debugger;
        try {
            let userValidationError = UserController_1.default.errorValidateUserSchema(req.body);
            if (userValidationError && "details" in userValidationError) {
                return RequestResponseMappings_1.default
                    .sendErrorMessage(res, userValidationError.details);
            }
            let user = User_1.default.create({
                email: req.body.email,
                password: bcrypt_1.default.hashSync(req.body.password, 10)
            });
            yield user.save();
            return UserController_1.default.sendTokenWithPayload(res, user);
        }
        catch (e) {
            return RequestResponseMappings_1.default.sendErrorMessage(res, {}, e.message);
        }
    }),
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("hell");
        let user = yield User_1.default.findOneBy({ email: req.body.email });
        if (user && bcrypt_1.default.compareSync(req.body.password, user.password)) {
            return UserController_1.default.sendTokenWithPayload(res, user);
        }
        return RequestResponseMappings_1.default.sendErrorMessage(res);
    }),
    errorValidateUserSchema: (incomingUser) => {
        let userValidationError = UserValidator_1.UserSchema.validate(incomingUser).error;
        if (!userValidationError) {
            return;
        }
        return userValidationError;
    },
    sendTokenWithPayload: (res, user) => {
        return RequestResponseMappings_1.default.sendSuccessMessage(res, {
            token: jsonwebtoken_1.default.sign({ email: user.email, password: user.password }, process.env.JWT_SECRET_KEY),
            user: user
        });
    },
};
