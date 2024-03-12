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
    generateAuthToken(): Promise<string>;
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

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;

    return next();
});

userSchema.method('generateAuthToken', async function generateAuthToken() {
    const token: string = jwt.sign(
        {
            email: this.email,
        },
        config.get<string>('jwt.privateKey'),
        {
            expiresIn: '1h',
        }
    );

    this.activeToken = token;

    await this.save();

    return token;
});

export const User = model<IUser, UserModel>('User', userSchema);
