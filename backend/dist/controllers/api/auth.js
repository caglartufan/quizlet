"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const lodash_1 = __importDefault(require("lodash"));
const UserDTO_1 = __importDefault(require("../../DTO/UserDTO"));
const ErrorHandler_1 = __importDefault(require("../../utils/ErrorHandler"));
const signUp = async (req, res, next) => {
    const services = req.app.get('services');
    let userDTO = new UserDTO_1.default(req.body);
    try {
        const user = await services.userService.signUpUser(userDTO);
        const token = await user.getActiveAuthTokenOrGenerateOne();
        userDTO = new UserDTO_1.default(user);
        return res
            .status(201)
            .header('Authorization', 'Bearer ' + token)
            .json({
            ok: true,
            user: lodash_1.default.omit(userDTO.toObject(), ['_id', 'password', 'activeToken']),
        });
    }
    catch (err) {
        next(ErrorHandler_1.default.handle(err));
    }
};
exports.signUp = signUp;
const signIn = async (req, res, next) => {
    const services = req.app.get('services');
    let userDTO = new UserDTO_1.default(req.body);
    try {
        const user = await services.userService.signInUser(userDTO);
        const token = await user.getActiveAuthTokenOrGenerateOne();
        userDTO = new UserDTO_1.default(user);
        return res
            .header('Authorization', 'Bearer ' + token)
            .json({
            ok: true,
            user: lodash_1.default.omit(userDTO.toObject(), ['_id', 'password', 'activeToken'])
        });
    }
    catch (err) {
        next(ErrorHandler_1.default.handle(err));
    }
};
exports.signIn = signIn;
