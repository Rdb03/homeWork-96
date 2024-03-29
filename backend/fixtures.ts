import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import User from "./models/User";
import Cocktail from "./models/Cocktail";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    const collections = ['users', 'cocktails'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const [user1, user2, admin1, admin2] = await User.create(
        {
            email: 'user1@cocktails.com',
            password: '123456',
            token: crypto.randomUUID(),
            displayName: 'User1',
            role: 'user',
            image: 'fixtures/user.webp',
        }, {
            email: 'user2@cocktails.com',
            password: '123456',
            token: crypto.randomUUID(),
            displayName: 'User2',
            role: 'user',
            image: 'fixtures/user2.jng',
        }, {
            email: 'admin1@cocktails.com',
            password: '123456',
            token: crypto.randomUUID(),
            displayName: 'Admin1',
            role: 'admin',
            image: 'fixtures/admin.png',
        }, {
            email: 'admin2@cocktails.com',
            password: '123456',
            token: crypto.randomUUID(),
            displayName: 'Admin2',
            role: 'admin',
            image: 'fixtures/admin.png',
        },
    );

    await Cocktail.create({
        user: admin1._id,
        name: 'Strawberry gin',
        image: 'fixtures/strawberry-gin.jpg',
        recipe: 'Mix the gin with the strawberries and caster sugar in a large bowl and pour into a 1.5-litre sterilised Kilner jar.',
        isPublished: true,
        ingredients: [
            {
                nameIng: 'Bottle of gin',
                qty: '700 ml'
            },
            {
                nameIng: 'Strawberries',
                qty: '400 g'
            },
            {
                nameIng: 'Caster Sugar',
                qty: '100 g'
            }
        ],
    }, {
        user: admin2._id,
        name: 'Passion fruit martini',
        image: 'fixtures/martini.jpg',
        recipe: 'Scoop the seeds from one of the passion fruits into the glass of a cocktail shaker, add the Absolut Vanilia vodka, passoa, lime juice and sugar syrup. Add a handful of ice and shake well, strain into 2 martini glasses, top up with prosecco, then add half a passion fruit to each. Serve immediately.',
        isPublished: true,
        ingredients: [
            {
                nameIng: 'Absolut Vanilia vodka',
                qty: '60 ml'
            },
            {
                nameIng: 'Passoa',
                qty: '30 ml'
            },
            {
                nameIng: 'Ripe passion fruits',
                qty: '2'
            },
            {
                nameIng: 'Lime juice',
                qty: '1 tbsp'
            },
            {
                nameIng: 'Sugar syrup',
                qty: '1 tbsp'
            }
        ],
    }, {
        user: admin1._id,
        name: 'Watermelon Daiqiri',
        image: 'fixtures/watermelon-daiqiri.jpg',
        recipe: 'Put a handful of ice in a blender suitable for crushing ice, along with the rum, watermelon liqueur, lime juice and watermelon flesh. Blitz until just smooth.' +
            'Fill a hurricane or other tall glass with ice, pour over the daiquiri and garnish with a wedge of watermelon.',
        isPublished: true,
        ingredients: [
            {
                nameIng: 'White rum',
                qty: '50 ml'
            },
            {
                nameIng: 'Watermelon liqueur',
                qty: '25 ml'
            },
            {
                nameIng: 'Lime juice',
                qty: '10 ml'
            },
            {
                nameIng: 'Watermelon',
                qty: '100g'
            }
        ],
    }, {
        user: user1._id,
        name: 'Singapore sling',
        image: 'fixtures/singapore-sling.jpg',
        recipe: 'Pour the Tanqueray London Dry Gin, cherry brandy and Benedictine into a mixing glass or a jug. Add the ice and Angostura bitters. Stir well until the outside of the glass feels cold.',
        isPublished: true,
        ingredients: [
            {
                nameIng: 'Tanqueray London Dry Gin',
                qty: '25ml'
            },
            {
                nameIng: 'cherry brandy',
                qty: '25ml'
            },
            {
                nameIng: 'Benedictine',
                qty: '25ml'
            },
            {
                nameIng: 'pineapple juice',
                qty: '50ml'
            },
            {
                nameIng: 'lime juice',
                qty: '25ml '
            }
        ],
    }, {
        user: user1._id,
        name: 'Bramble',
        image: 'fixtures/bramble.jpg',
        recipe: 'Shake the gin, lemon juice and sugar syrup in a cocktail shaker with a good handful of ice cubes then strain into a rocks glass full of crushed ice. Drizzle the crème de mure over the top so it ‘bleeds’ into the drink. Garnish with the lemon slice and blackberry, if using.',
        isPublished: true,
        ingredients: [
            {
                nameIng: 'gin',
                qty: '50ml'
            },
            {
                nameIng: 'lemon slice',
                qty: '1'
            },
            {
                nameIng: 'crème de mure',
                qty: '¾tbsp'
            },
            {
                nameIng: 'sugar syrup',
                qty: '¾tbsp'
            },
            {
                nameIng: 'lime juice',
                qty: '25ml '
            }
        ],
    }, {
        user: user1._id,
        name: 'Old fashioned',
        image: 'fixtures/old-fashioned.jpg',
        recipe: 'Put the sugar, bitters and water in a small tumbler. Mix until the sugar dissolves if using granulated. Fill your glass with ice and stir in the whisky. Add a splash of soda water if you like and mix. Garnish with the orange and cherry.',
        isPublished: false,
        ingredients: [
            {
                nameIng: 'sugar syrup',
                qty: '2 tsp'
            },
            {
                nameIng: 'Angostura bitters',
                qty: '1-2 dashes'
            },
            {
                nameIng: 'Scotch whisky',
                qty: '60ml'
            },
            {
                nameIng: 'Orange',
                qty: '1 slice'
            },
        ],
    }, {
        user: user2._id,
        name: 'Mojito',
        image: 'fixtures/mojito.jpg',
        recipe: 'Muddle the lime juice, sugar and mint leaves in a small jug, crushing the mint as you go – you can use the end of a rolling pin for this. Pour into a tall glass and add a handful of ice.',
        isPublished: true,
        ingredients: [
            {
                nameIng: 'mint',
                qty: '5g'
            },
            {
                nameIng: 'white rum',
                qty: '60ml'
            },
            {
                nameIng: 'granulated sugar',
                qty: '1 tsp'
            },
            {
                nameIng: 'lime juice',
                qty: '25ml '
            }
        ],
    }, {
        user: user2._id,
        name: 'Sloe gin cocktail',
        image: 'fixtures/sloe-gin.jpg',
        recipe: 'Start by making the juniper syrup. Put the sugar in a small saucepan, then add 100ml water and the juniper berries. Bring to the boil, then take off the heat and gently squash the berries in the liquid using a potato masher. Leave to steep until completely cold, then strain into a sterilised bottle or jar. Will keep in the fridge for up to 2 weeks.',
        isPublished: true,
        ingredients: [
            {
                nameIng: 'Sloe gin',
                qty: '50ml'
            },
            {
                nameIng: 'gin',
                qty: '25ml'
            },
            {
                nameIng: 'white caster sugar',
                qty: '100g'
            },
            {
                nameIng: 'lime juice',
                qty: '25ml '
            }
        ],
    }, {
        user: user2._id,
        name: 'Brandy sour',
        image: 'fixtures/brandy-sour.jpg',
        recipe: 'Tip the lemon juice, cherry syrup, bitters, egg white and brandy into a cocktail shaker with a large handful of ice. Shake until the outside of the shaker feels very cold. Double strain into a tumbler filled with ice. Thread the lemon slice and cherry onto a cocktail stick, rest across the rim of the tumbler and serve.',
        isPublished: false,
        ingredients: [
            {
                nameIng: 'maraschino cherry',
                qty: '1'
            },
            {
                nameIng: 'syrup from the jar',
                qty: '15ml'
            },
            {
                nameIng: 'Angostura bitters',
                qty: 'few drops'
            },
            {
                nameIng: 'egg white',
                qty: '1/2'
            },
            {
                nameIng: 'brandy',
                qty: '50ml'
            },
            {
                nameIng: 'lime juice',
                qty: '25ml '
            }
        ],
    });

    await db.close();
};

void run();