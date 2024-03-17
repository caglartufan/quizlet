"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quizzes_1 = require("../../controllers/api/quizzes");
const validateRequestBody_1 = require("../../middlewares/validateRequestBody");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.use(auth_1.default);
router.post('/create', validateRequestBody_1.validateCreateQuizRequestBodyMiddleware, quizzes_1.createQuiz);
exports.default = router;
