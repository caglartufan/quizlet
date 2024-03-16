"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const getUsers = (req, res, next) => {
    res.json({
        users: []
    });
};
exports.getUsers = getUsers;
