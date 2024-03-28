import express from "express";
import Cocktail from "../models/Cocktail";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import auth from "../middleware/auth";

const cocktailRouter = express.Router();

cocktailRouter.get('/', async (req , res, next) => {
    try {
        const user = req.query.user as string;

        if(user && req.query.user) {
            const result = await Cocktail.find({user: req.query.user});
            return res.send(result);
        }

        const cocktail = await Cocktail.find();
        return res.send(cocktail);
    } catch (e) {
        next(e);
    }
});

cocktailRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const cocktailData  = new Cocktail({
            user: req.body.user,
            name: req.body.name,
            recipe: req.body.recipe,
            image: req.file ? req.file.filename : null,
            ingredients: req.body.ingredients,
        });

        const cocktail = new Cocktail(cocktailData);

        await cocktail.save();

        return res.send(cocktailData);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        next(error);
    }
});

export default cocktailRouter;