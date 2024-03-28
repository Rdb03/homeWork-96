import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';
import { useEffect } from 'react';
import { fetchCocktails } from './CocktailThunk.ts';
import { selectCocktails } from './CocktailSlice.ts';
import { Grid } from '@mui/material';
import CocktailItem from './CocktailItem.tsx';

const CocktailsUser = () => {
  const dispatch = useAppDispatch();
  const cocktailsUser = useAppSelector(selectCocktails);
  const user = useAppSelector(selectUser);
  const params = new URLSearchParams(location.search);
  const userId = params.get('user');

  useEffect(() => {
    if (user && userId) {
      dispatch(fetchCocktails(user._id));
    }
  }, [dispatch, user, userId]);


  return (
    <Grid>
      {cocktailsUser.map((item) => (
        //   (user?.role !== 'admin' ? item.isPublished : item) &&
        //   <CocktailItem cocktail={item}/>
        // )
        <CocktailItem key={item._id} cocktail={item}/>
      ))}
    </Grid>
  );
};

export default CocktailsUser;