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
    let userDTO = new UserDTO_1.default(req.body.firstname, req.body.lastname, req.body.username, req.body.email, req.body.password);
    try {
        const user = await services.userService.signUpUser(userDTO);
        const token = await user.generateAuthToken();
        userDTO = UserDTO_1.default.withUserDocument(user);
        return res
            .status(201)
            .header('Authorization', 'Bearer ' + token)
            .json({
            ok: true,
            user: userDTO.toObject(),
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
