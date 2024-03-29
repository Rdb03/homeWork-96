import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCocktails, selectCocktailsLoading } from './CocktailSlice.ts';
import { useEffect } from 'react';
import { fetchCocktails } from './CocktailThunk.ts';
import { CircularProgress, Grid, Typography } from '@mui/material';
import CocktailItem from './CocktailItem.tsx';
import { selectUser } from '../users/usersSlice.ts';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectCocktailsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  return loading ? (
    <CircularProgress />
  ) : (
    <Grid sx={{display: 'flex', flexDirection: 'column'}}>
      <Typography sx={{margin: '0 auto'}} variant="h3">All Cocktails</Typography>
      <Grid container sx={{display: 'flex', justifyContent: 'center'}}>
        {cocktails.map((item) => (
            (user?.role !== 'admin' ? item.isPublished : item) &&
            <CocktailItem cocktail={item} key={item._id}/>
          )
        )}
      </Grid>
    </Grid>
  );
};

export default Cocktails;