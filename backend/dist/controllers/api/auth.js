"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const User_1 = require("../../models/User");
const RequestBodyValidator_1 = __importDefault(require("../../utils/RequestBodyValidator"));
const signUp = async (req, res, next) => {
    // TODO: Validation process into middleware and implement better error handling logic
    const validationErrors = RequestBodyValidator_1.default.validateSignUpRequestBody(req.body);
    if (Object.keys(validationErrors).length > 0) {
        return res.status(400).json({
            ok: false,
            errors: validationErrors
        });
    }
    const user = new User_1.User(req.body);
    await user.save();
    res.json({
        body: req.body,
        user: user
    });
};
exports.signUp = signUp;
const signIn = (req, res, next) => {
};
exports.signIn = signIn;
