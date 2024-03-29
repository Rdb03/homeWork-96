import React from 'react';
import { Button, Card, CardActionArea, CardMedia, Grid, styled, Typography } from '@mui/material';
import { ICocktail } from '../../../types';
import { apiURL } from '../../../constants.ts';
import imageNotAvailable from '../../assets/images/image_not_available.png';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';
import { selectDeleteLoading, selectPatchLoading } from './CocktailSlice.ts';
import { deleteCocktail, fetchCocktails, patchCocktail } from './CocktailThunk.ts';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  cocktail: ICocktail;
}

const CocktailItem: React.FC<Props> = ({cocktail}) => {
  let cardImage = imageNotAvailable;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const patchLoading = useAppSelector(selectPatchLoading);

  if (cocktail.image) {
    cardImage = apiURL + '/' + cocktail.image;
  }

  const cocktailDelete = async () => {
    if(user) {
      const token = user.token;
      await dispatch(deleteCocktail({ id: cocktail._id, token }));
      await dispatch(fetchCocktails());
    }
  };

  const cocktailPatch = async () => {
    if(user) {
      const token = user.token;
      await dispatch(patchCocktail({ id: cocktail._id, token }));
      await dispatch(fetchCocktails());
    }
  };

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
      </CardActionArea>
      <Grid sx={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>
        {user?.role === 'admin' ?
          <Button
            onClick={cocktailDelete}
            variant="contained"
            color="error"
            disabled={deleteLoading ? deleteLoading === cocktail._id : false}
          >Delete
          </Button> : null}
        {user?.role === 'admin' && !cocktail.isPublished ? <Button
          onClick={cocktailPatch}
          variant="contained"
          sx={{marginLeft: '10px'}}
          color="success"
          disabled={patchLoading ? patchLoading === cocktail._id : false}>
          Published
        </Button> : null}
      </Grid>
    </Card>
  );
};

export default CocktailItem;