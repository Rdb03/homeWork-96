import {Model, Schema} from "mongoose";

export interface IUser {
    email: string;
    password: string;
    token: string;
    role: string;
}

export interface ICocktail extends Document{
    name: string;
    user: Schema.Types.ObjectId;
    image: string;
    recipe: string;
    isPublished: boolean;
    ingredients: string;
}

export interface UserFields {
    email: string,
    password: string,
    token: string,
    role: string,
    displayName: string;
    googleID?: string;
    image: string | null;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;