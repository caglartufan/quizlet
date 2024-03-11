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
        const alreadyExistingUsersWithGivenUsernameOrEmail = await UserDAO_1.default.findUsersWithGivenUsernameOrEmail(userDTO.username, userDTO.email);
        if (alreadyExistingUsersWithGivenUsernameOrEmail.length > 0) {
            for (const alreadyExistingUser of alreadyExistingUsersWithGivenUsernameOrEmail) {
                if (alreadyExistingUser.username === userDTO.username) {
                    transformedError['username'] = fields_1.default.username['unique'];
                }
                if (alreadyExistingUser.email === userDTO.email) {
                    transformedError['email'] = fields_1.default.email['unique'];
                }
            }
        }
        if (Object.keys(transformedError).length > 0) {
            throw new ErrorHandler_1.BadRequestError(errors_1.default.invalidUserInputPleaseTryAgain, transformedError);
        }
        const user = await UserDAO_1.default.createUser(userDTO);
        return user;
    }
    constructor() { }
}
exports.default = UserService;
