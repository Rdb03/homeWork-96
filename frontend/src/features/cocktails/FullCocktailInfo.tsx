import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useParams } from 'react-router-dom';
import { selectCocktail, selectOneCocktailLoading } from './CocktailSlice.ts';
import { CircularProgress, Container } from '@mui/material';
import React, { useEffect } from 'react';
import FullCocktailItem from './components/FullCocktailItem.tsx';
import { fetchOneCocktail } from './CocktailThunk.ts';

const FullCocktailInfo = () => {

  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectCocktail);
  const fetchLoading = useAppSelector(selectOneCocktailLoading);


  let item: React.ReactNode = <CircularProgress/>;

  if (!fetchLoading && post) {
    item = (
      <>
        <FullCocktailItem cocktail={post} />
      </>
    );
  }

  useEffect(() => {
    dispatch(fetchOneCocktail(id));
  }, [dispatch, id]);

  return (
    <Container maxWidth="lg">
      {item}
    </Container>
  )
};

export default FullCocktailInfo;