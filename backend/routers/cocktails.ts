import express from "express";
import Cocktail from "../models/Cocktail";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const cocktailRouter = express.Router();

cocktailRouter.get('/', async (req , res, next) => {
    try {
        const user = req.query.user as string;

        if(user && req.query.user) {
            const result = await Cocktail.find({user: req.query.user}).populate('user', 'displayName');
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

cocktailRouter.get('/:id', async (req, res) => {
    try {
        const result = await Cocktail.findById(req.params.id).populate('user', 'displayName');

        if (!result) return res.status(404).send({ error: "Cocktail not found!" });

        return res.send({result});
    } catch {
        return res.sendStatus(500);
    }
});

cocktailRouter.patch(
    "/:id/togglePublished",
    auth,
    permit("admin"),
    async (req, res, next) => {
        try {
            const cocktail_id = req.params.id;
            const cocktail = await Cocktail.findById(cocktail_id);

            if (!cocktail) {
                return res.status(404).send({ error: "Not found!" });
            }

            cocktail.isPublished = !cocktail.isPublished;

            await Cocktail.findByIdAndUpdate(cocktail_id, {
                isPublished: !cocktail.isPublished,
            });

            await cocktail.save();
            return res.send(cocktail);
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).send(error);
            }

            return next(error);
        }
    },
);

cocktailRouter.delete("/:id", auth, permit("admin"), async (req, res, next) => {
    try {
        const cocktail_id = req.params.id;
        const cocktail = await Cocktail.findOne({ _id: cocktail_id });

        if (!cocktail) {
            return res.status(404).send({ error: "Not found!" });
        }

        await Cocktail.deleteOne({ _id: cocktail_id });
        return res.send("Cocktail deleted");
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});


export default cocktailRouter;