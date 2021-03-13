import { Schema, model } from 'mongoose';

const UserSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        passwordEncrypted: {
            type: String,
            required: true,
        },
        deleted: {
            type: Boolean,
            required: false,
        },
        createdUser: {
            type: String,
            required: false,
        },
        updatedUser: {
            type: String,
            required: false,
        },
        deletedUser: {
            type: String,
            required: false,
        },
    },
    { timestamps: true },
);

const UserModel = model('User', UserSchema, 'user');

export {
    UserModel,
    UserSchema,
};
