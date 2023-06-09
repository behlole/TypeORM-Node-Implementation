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
const RequestResponseMappings_1 = __importDefault(require("../Shared/utils/Mappings/RequestResponseMappings"));
exports.default = {
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return RequestResponseMappings_1.default.sendSuccessMessage(res, yield User_1.default.find());
    }),
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let userValidationError = UserValidator_1.UserSchema.validate(req.body).error;
        if (userValidationError) {
            return RequestResponseMappings_1.default
                .sendErrorMessage(res, userValidationError === null || userValidationError === void 0 ? void 0 : userValidationError.details);
        }
        let user = yield User_1.default.create({ email: req.body.email, username: req.body.username });
        yield user.save();
        return RequestResponseMappings_1.default
            .sendSuccessMessage(res, user, "User Created Successfully");
    })
};
