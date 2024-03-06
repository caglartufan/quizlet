"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controllers/api/auth");
const validateRequestBody_1 = require("../../middlewares/validateRequestBody");
const router = (0, express_1.Router)();
router.post('/sign-up', validateRequestBody_1.validateSignUpRequestBodyMiddleware, auth_1.signUp);
router.post('/sign-in', auth_1.signIn);
exports.default = router;
