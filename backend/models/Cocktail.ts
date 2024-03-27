import {model, Schema, Types} from "mongoose";
import User from "./User";

const CocktailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not exist!',
        }
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    recipe: {
        type: String,
        required: true,
    },
    isPublished: {
        required: true,
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [{
            nameIng: String,
            qty: Number,
        }],
        required: true,
    },
    grades: {
        type: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
                validate: {
                    validator: async (value: Types.ObjectId) => {
                        const user = await User.findById(value);
                        return Boolean(user);
                    },
                    message: 'User does not exist!',
                }
            },
            grade: String,
        }],
        required: true,
    }
});

const Cocktail = model('Cocktail', CocktailSchema);

export default Cocktail;
