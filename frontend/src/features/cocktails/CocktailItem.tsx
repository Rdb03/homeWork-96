import React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { ICocktail } from '../../../types';

interface Props {
  cocktail: ICocktail;
}

const CocktailItem: React.FC<Props> = ({cocktail}) => {
  return (
    <Card sx={{
      border: '1px solid black',
      margin: '20px', padding: '10px',
      maxWidth: 345,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography sx={{fontWeight: 'bold'}} variant="h5">{cocktail.name}</Typography>
      <Typography>{cocktail.image}</Typography>
      <Grid sx={{margin: '20px 0'}}>
        <Typography>Recipe:</Typography>
        <Typography>{cocktail.recipe}</Typography>
      </Grid>
      <Grid sx={{marginTop: 'auto'}}>
        {cocktail.ingredients.map((ingredient, index) => (
          <Grid sx={{display: "flex", justifyContent: "space-between"}} key={index}>
            <Typography>{ingredient.nameIng}</Typography>
            <Typography>{ingredient.qty}</Typography>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default CocktailItem;