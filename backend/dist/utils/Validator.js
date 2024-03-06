"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpRequestValidationSchema = exports.Validator = void 0;
const joi_1 = __importDefault(require("joi"));
class Validator {
}
exports.Validator = Validator;
exports.signUpRequestValidationSchema = joi_1.default.object({
    firstname: joi_1.default.string().required().max(50),
    lastname: joi_1.default.string().required().max(50),
    username: joi_1.default.string().required().min(3).max(20).alphanum(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().min(5).max(100),
    passwordConfirm: joi_1.default.any().equal(joi_1.default.ref('password')).required(),
});
