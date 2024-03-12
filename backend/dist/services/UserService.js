"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDAO_1 = __importDefault(require("../DAO/UserDAO"));
const errors_1 = __importDefault(require("../messages/errors"));
const fields_1 = __importDefault(require("../messages/fields"));
const ErrorHandler_1 = require("../utils/ErrorHandler");
class UserService {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }
    async signUpUser(userDTO) {
        // Check if the given username or email is already in use and throw appropriate BadRequestError
        // with generated errors if there's a duplicate value
        const transformedError = {};
        const alreadyExistingUserWithGivenEmail = await UserDAO_1.default.findUserWithGivenEmail(userDTO.email, {
            _id: 0,
            email: 1,
        });
        if (alreadyExistingUserWithGivenEmail?.email === userDTO.email) {
            transformedError['email'] = fields_1.default.email['unique'];
        }
        if (Object.keys(transformedError).length > 0) {
            throw new ErrorHandler_1.BadRequestError(errors_1.default.invalidUserInputPleaseTryAgain, transformedError);
        }
        const user = await UserDAO_1.default.createUser(userDTO);
        return user;
    }
    async signInUser(userDTO) {
        const authenticationFailedError = new ErrorHandler_1.AuthenticationFailedError();
        const user = await UserDAO_1.default.findUserWithGivenEmail(userDTO.email);
        if (!user || !userDTO.password) {
            throw authenticationFailedError;
        }
        const isCorrectPassword = await user.checkPassword(userDTO.password);
        if (!isCorrectPassword) {
            throw authenticationFailedError;
        }
        return user;
    }
    constructor() { }
}
exports.default = UserService;
