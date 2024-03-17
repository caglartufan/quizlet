"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuiz = void 0;
const createQuiz = async (req, res, next) => {
    res.json({
        user: res.locals.user,
        body: req.body
    });
};
exports.createQuiz = createQuiz;
