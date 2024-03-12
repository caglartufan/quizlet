import { Model, Schema, model } from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from 'config';
import FIELDS from '../messages/fields';

export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    activeToken?: string;
    countryCode?: string;
    avatar?: string;
}

interface IUserMethods {
    checkPassword(password: string): Promise<boolean>;
    getActiveAuthTokenOrGenerateOne(): Promise<string>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        firstname: {
            type: String,
            required: [true, FIELDS.firstname['any.required']],
            maxlength: [50, FIELDS.firstname['string.max']],
        },
        lastname: {
            type: String,
            required: [true, FIELDS.lastname['any.required']],
            maxlength: [50, FIELDS.lastname['string.max']],
        },
        email: {
            type: String,
            unique: true,
            required: [true, FIELDS.email['any.required']],
            validate: {
                validator: function (value: string) {
                    const { error } = Joi.string().email().validate(value);

                    return typeof error === 'undefined';
                },
                message: FIELDS.email['string.email'],
            },
        },
        password: {
            type: String,
            required: [true, FIELDS.password['any.required']],
            minlength: [5, FIELDS.password['string.min']],
            maxlength: [1024, FIELDS.password['string.max']],
        },
        activeToken: {
            type: String,
        },
        countryCode: {
            type: String,
            validate: {
                validator: function (value: string) {
                    return value.length === 2;
                },
                message: FIELDS.countryCode['string.pattern.base'],
            },
        },
        avatar: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;

    return next();
});

userSchema.method(
    'checkPassword',
    async function checkPassword(password: string) {
        const isCorrectPassword: boolean = await bcrypt.compare(
            password,
            this.password
        );

        return isCorrectPassword;
    }
);

userSchema.method(
    'getActiveAuthTokenOrGenerateOne',
    async function getActiveAuthTokenOrGenerateOne() {
        let token: string | undefined = this.activeToken;
        const jwtPrivateKey = config.get<string>('jwt.privateKey');
        const jwtExpirationDuration = config.get<string>('jwt.expirationDuration');
        const newToken = jwt.sign(
            {
                email: this.email,
            },
            jwtPrivateKey,
            {
                expiresIn: jwtExpirationDuration,
            }
        );

        // If there's an active token, verify it. If the token is not valid or happens to be there's an error thrown
        // while verifying related to jwt's possible verification errors then update the active token
        // with new token generated above. If the error thrown while verification is not
        // related to jwt's possible verification errors, then throw it again for error handler to catch it and handle
        if (token) {
            try {
                const payload = jwt.verify(token, jwtPrivateKey);

                if (
                    typeof payload === 'string' ||
                    (typeof payload === 'object' && payload?.email !== this.email)
                ) {
                    token = newToken;
                }
            } catch(err) {
                if(err instanceof jwt.JsonWebTokenError || err instanceof jwt.NotBeforeError || err instanceof jwt.TokenExpiredError) {
                    token = newToken;
                } else {
                    throw err;
                }
            }
        } else {
            token = newToken;
        }

        this.activeToken = token;

        await this.save();

        return token;
    }
);

export const User = model<IUser, UserModel>('User', userSchema);
