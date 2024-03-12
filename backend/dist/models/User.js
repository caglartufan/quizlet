"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("config"));
const fields_1 = __importDefault(require("../messages/fields"));
const userSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: [true, fields_1.default.firstname['any.required']],
        maxlength: [50, fields_1.default.firstname['string.max']],
    },
    lastname: {
        type: String,
        required: [true, fields_1.default.lastname['any.required']],
        maxlength: [50, fields_1.default.lastname['string.max']],
    },
    email: {
        type: String,
        unique: true,
        required: [true, fields_1.default.email['any.required']],
        validate: {
            validator: function (value) {
                const { error } = joi_1.default.string().email().validate(value);
                return typeof error === 'undefined';
            },
            message: fields_1.default.email['string.email'],
        },
    },
    password: {
        type: String,
        required: [true, fields_1.default.password['any.required']],
        minlength: [5, fields_1.default.password['string.min']],
        maxlength: [1024, fields_1.default.password['string.max']],
    },
    activeToken: {
        type: String,
    },
    countryCode: {
        type: String,
        validate: {
            validator: function (value) {
                return value.length === 2;
            },
            message: fields_1.default.countryCode['string.pattern.base'],
        },
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true,
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
});
userSchema.method('checkPassword', async function checkPassword(password) {
    const isCorrectPassword = await bcrypt_1.default.compare(password, this.password);
    return isCorrectPassword;
});
userSchema.method('getActiveAuthTokenOrGenerateOne', async function getActiveAuthTokenOrGenerateOne() {
    let token = this.activeToken;
    const jwtPrivateKey = config_1.default.get('jwt.privateKey');
    const jwtExpirationDuration = config_1.default.get('jwt.expirationDuration');
    const newToken = jsonwebtoken_1.default.sign({
        email: this.email,
    }, jwtPrivateKey, {
        expiresIn: jwtExpirationDuration,
    });
    // If there's an active token, verify it. If the token is not valid or happens to be there's an error thrown
    // while verifying related to jwt's possible verification errors then update the active token
    // with new token generated above. If the error thrown while verification is not
    // related to jwt's possible verification errors, then throw it again for error handler to catch it and handle
    if (token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, jwtPrivateKey);
            if (typeof payload === 'string' ||
                (typeof payload === 'object' && payload?.email !== this.email)) {
                token = newToken;
            }
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.default.JsonWebTokenError || err instanceof jsonwebtoken_1.default.NotBeforeError || err instanceof jsonwebtoken_1.default.TokenExpiredError) {
                token = newToken;
            }
            else {
                throw err;
            }
        }
    }
    else {
        token = newToken;
    }
    this.activeToken = token;
    await this.save();
    return token;
});
exports.User = (0, mongoose_1.model)('User', userSchema);
