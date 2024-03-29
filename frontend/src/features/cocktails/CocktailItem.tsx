import React from 'react';
import { Button, Card, CardActionArea, CardMedia, Grid, styled, Typography } from '@mui/material';
import { ICocktail } from '../../../types';
import { apiURL } from '../../../constants.ts';
import imageNotAvailable from '../../assets/images/image_not_available.png';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  cocktail: ICocktail;
}

const CocktailItem: React.FC<Props> = ({cocktail}) => {
  let cardImage = imageNotAvailable;
  const user = useAppSelector(selectUser);

  if (cocktail.image) {
    cardImage = apiURL + '/' + cocktail.image;
  }

  return (
    <Card sx={{
      border: '1px solid black',
      margin: '20px', padding: '10px',
      width: 345,
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
    }}>
      <CardActionArea component={Link} to={'/cocktails/' + cocktail._id}>
        <Typography sx={{fontWeight: 'bold'}} variant="h5">{cocktail.name}</Typography>
        <ImageCardMedia image={cardImage} title={cocktail.name}/>
        <Grid sx={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>
          {user?.role === 'admin' ? <Button variant="contained" color="error">Delete</Button> : null}
          {user?.role === 'admin' && !cocktail.isPublished ? <Button
            variant="contained"
            sx={{marginLeft: '10px'}}
            color="success">Published</Button> : null}
        </Grid>
      </CardActionArea>
      {/*<Grid sx={{margin: '20px 0'}}>*/}
      {/*  <Typography sx={{fontWeight: "bold"}}>Recipe:</Typography>*/}
      {/*  <Typography>{cocktail.recipe}</Typography>*/}
      {/*</Grid>*/}
      {/*<Grid sx={{marginTop: 'auto'}}>*/}
      {/*  <Typography sx={{fontWeight: "bold"}}>Ingredients:</Typography>*/}
      {/*  {cocktail.ingredients.map((ingredient, index) => (*/}
      {/*    <Grid sx={{display: "flex", justifyContent: "space-between"}} key={index}>*/}
      {/*      <Typography>{ingredient.nameIng}</Typography>*/}
      {/*      <Typography>{ingredient.qty}</Typography>*/}
      {/*    </Grid>*/}
      {/*  ))}*/}
      {/*</Grid>*/}
      {/*<Grid sx={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>*/}
      {/*  {user?.role === 'admin' ? <Button variant="contained" color="error">Delete</Button> : null}*/}
      {/*  {user?.role === 'admin' && !cocktail.isPublished ? <Button*/}
      {/*    variant="contained"*/}
      {/*    sx={{marginLeft: '10px'}}*/}
      {/*    color="success">Published</Button> : null}*/}
      {/*</Grid>*/}
    </Card>
  );
};

export default CocktailItem;