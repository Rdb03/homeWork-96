import React from 'react';
import { Card, CardMedia, Grid, styled, Typography } from '@mui/material';
import { ICocktail } from '../../../types';
import { apiURL } from '../../../constants.ts';
import imageNotAvailable from '../../assets/images/image_not_available.png';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  cocktail: ICocktail;
}

const CocktailItem: React.FC<Props> = ({cocktail}) => {
  let cardImage = imageNotAvailable;

  if (cocktail.image) {
    cardImage = apiURL + '/' + cocktail.image;
  }

  return (
    <Card sx={{
      border: '1px solid black',
      margin: '20px', padding: '10px',
      width: 345,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography sx={{fontWeight: 'bold'}} variant="h5">{cocktail.name}</Typography>
      <ImageCardMedia image={cardImage} title={cocktail.name}/>
      <Grid sx={{margin: '20px 0'}}>
        <Typography sx={{fontWeight: "bold"}}>Recipe:</Typography>
        <Typography>{cocktail.recipe}</Typography>
      </Grid>
      <Grid sx={{marginTop: 'auto'}}>
        <Typography sx={{fontWeight: "bold"}}>Ingredients:</Typography>
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