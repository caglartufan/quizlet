"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const UserDTO_1 = __importDefault(require("../../DTO/UserDTO"));
const ErrorHandler_1 = __importDefault(require("../../utils/ErrorHandler"));
const signUp = async (req, res, next) => {
    const services = req.app.get('services');
    const userDTO = new UserDTO_1.default(req.body.firstname, req.body.lastname, req.body.username, req.body.email, req.body.password);
    try {
        const user = await services.userService.signUpUser(userDTO);
        res.json({
            body: req.body,
            user: user,
        });
    }
    catch (err) {
        next(ErrorHandler_1.default.handle(err));
    }
};
exports.signUp = signUp;
const signIn = (req, res, next) => {
    // Will be added
};
exports.signIn = signIn;
