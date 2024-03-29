import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';
import { useEffect } from 'react';
import { fetchCocktails } from './CocktailThunk.ts';
import { selectCocktails, selectCocktailsLoading } from './CocktailSlice.ts';
import { CircularProgress, Grid, Typography } from '@mui/material';
import CocktailItem from './CocktailItem.tsx';

const CocktailsUser = () => {
  const dispatch = useAppDispatch();
  const cocktailsUser = useAppSelector(selectCocktails);
  const user = useAppSelector(selectUser);
  const params = new URLSearchParams(location.search);
  const userId = params.get('user');
  const loading = useAppSelector(selectCocktailsLoading);

  useEffect(() => {
    if (user && userId) {
      dispatch(fetchCocktails(user._id));
    }
  }, [dispatch, user, userId]);


  return loading ? (
    <CircularProgress />
  ) : (
    <Grid sx={{display: 'flex', flexDirection: 'column'}}>
      <Typography sx={{margin: '0 auto'}} variant="h3">{user?.displayName} Cocktails</Typography>
      <Grid sx={{display: 'flex', marginTop: '30px'}}>
        {cocktailsUser.map((item) => (
            (user?.role !== 'admin' ? item.isPublished : item) &&
            <CocktailItem cocktail={item} key={item._id}/>
          )
        )}
      </Grid>
    </Grid>
  );
};

export default CocktailsUser;