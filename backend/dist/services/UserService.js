"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }
    constructor() { }
}
exports.default = UserService;
