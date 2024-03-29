import mongoose, {model, Schema} from "mongoose";
import User from "./User";
import {ICocktail} from "../types";

const CocktailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not exist!',
        }
    },
    image: String,
    recipe: {
        type: String,
        required: true,
    },
    isPublished: {
        required: true,
        type: Boolean,
        default: false,
    },
    ingredients: [{
        nameIng: {
            type: String,
            required: true,
        },
        qty: {
            type: String,
            required: true,
        },
    }],
});

const Cocktail = model<ICocktail>('Cocktail', CocktailSchema);

export default Cocktail;
