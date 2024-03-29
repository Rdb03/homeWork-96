import React from 'react';
import { IIngredients, OneCocktail } from '../../../../types';
import { apiURL } from '../../../../constants.ts';
import { Grid, Typography } from '@mui/material';


interface Props {
    cocktail: OneCocktail;
}

const FullCocktailItem: React.FC<Props> = ({ cocktail }) => {

  return (
        <Grid>
            <img style={{width: '400px'}} src={apiURL + '/' + cocktail.result.image} alt="cocktail"/>
            <Grid style={{flex: 1, paddingLeft: '20px'}}>
              <Typography variant="h2">{cocktail.result.name}</Typography>
                <Typography >Author: {cocktail.result.user.displayName}</Typography>
                <Grid>
                    <Typography sx={{fontSize: "23px", marginBottom: "5px"}}>Recipe:</Typography>
                    <Typography>
                        {cocktail.result.recipe}
                    </Typography>
                </Grid>
                <Grid>
                    <Typography variant="h3" sx={{marginTop: '20px'}}>Ingredients:</Typography>
                  {cocktail.result.ingredients.map((ingredient :IIngredients) => (
                    <Typography key={ingredient._id}>
                      {ingredient.nameIng}: {ingredient.qty}
                    </Typography>
                  ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FullCocktailItem;