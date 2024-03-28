import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCocktails, selectCocktailsLoading } from './CocktailSlice.ts';
import { useEffect } from 'react';
import { fetchCocktails } from './CocktailThunk.ts';
import { CircularProgress, Grid, Typography } from '@mui/material';
import CocktailItem from './CocktailItem.tsx';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectCocktailsLoading);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  console.log(cocktails);


  return loading ? (
    <CircularProgress />
  ) : (
    <Grid sx={{display: 'flex', flexDirection: 'column'}}>
      <Typography sx={{margin: '0 auto'}} variant="h3">All Cocktails</Typography>
      <Grid sx={{display: 'flex'}}>
        {cocktails.map((item) => (
          //   (user?.role !== 'admin' ? item.isPublished : item) &&
          //   <CocktailItem cocktail={item}/>
          // )
          <CocktailItem key={item._id} cocktail={item}/>
        ))}
      </Grid>
    </Grid>
  );
};

export default Cocktails;