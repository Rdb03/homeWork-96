import { ICocktail } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCocktails } from './CocktailThunk.ts';
import { RootState } from '../../app/store.ts';

interface CocktailState {
  items: ICocktail[];
  fetchLoadingCocktails: boolean;
}

const initialState: CocktailState = {
  items: [],
  fetchLoadingCocktails: false,
};

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCocktails.pending, (state) => {
      state.fetchLoadingCocktails = true;
    });
    builder.addCase(fetchCocktails.fulfilled, (state, { payload: cocktails }) => {
      state.fetchLoadingCocktails = false;
      state.items = cocktails;
    });
    builder.addCase(fetchCocktails.rejected, (state) => {
      state.fetchLoadingCocktails = false;
    });
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktailsLoading = (state: RootState) => state.cocktails.fetchLoadingCocktails;