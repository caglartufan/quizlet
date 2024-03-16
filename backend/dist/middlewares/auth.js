"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const ErrorHandler_1 = __importStar(require("../utils/ErrorHandler"));
const UserDAO_1 = __importDefault(require("../DAO/UserDAO"));
const auth = async (req, res, next) => {
    const unauthorizedError = new ErrorHandler_1.UnauthorizedError();
    const authHeader = req.headers.authorization;
    let token;
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7, authHeader.length);
    }
    if (typeof token === 'undefined') {
        return next(unauthorizedError);
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.get('jwt.privateKey'));
        const user = await UserDAO_1.default.findUserWithGivenEmail(payload.email);
        if (!user) {
            return next(unauthorizedError);
        }
        res.locals.user = user;
        return next();
    }
    catch (err) {
        return next(ErrorHandler_1.default.handle(err));
    }
};
exports.default = auth;
