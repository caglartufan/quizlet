"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
class UserService {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }
    async signUpUser(userDTO) {
        const user = new User_1.User({
            firstname: userDTO.firstname,
            lastname: userDTO.lastname,
            username: userDTO.username,
            email: userDTO.email,
            password: userDTO.password
        });
        await user.save();
        return user;
    }
    constructor() { }
}
exports.default = UserService;
