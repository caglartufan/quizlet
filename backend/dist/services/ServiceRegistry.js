"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("./UserService"));
class ServiceRegistry {
    static instance;
    userService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new ServiceRegistry();
        }
        return this.instance;
    }
    constructor() {
        this.userService = UserService_1.default.getInstance();
    }
}
exports.default = ServiceRegistry;
