"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const User_1 = require("../../models/User");
const signUp = async (req, res, next) => {
    const user = new User_1.User(req.body);
    await user.save();
    res.json({
        body: req.body,
        user: user,
    });
};
exports.signUp = signUp;
const signIn = (req, res, next) => {
    // Will be added
};
exports.signIn = signIn;
