import { ICocktail, OneCocktail } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createCocktail, deleteCocktail, fetchCocktails, fetchOneCocktail, patchCocktail } from './CocktailThunk.ts';
import { RootState } from '../../app/store.ts';

interface CocktailState {
  items: ICocktail[];
  cocktail: OneCocktail | null,
  fetchLoadingCocktails: boolean;
  createLoading: boolean;
  fetchOneLoading: boolean;
  deleteLoading: boolean | string;
  patchLoading: boolean | string;
}

const initialState: CocktailState = {
  items: [],
  cocktail: null,
  fetchLoadingCocktails: false,
  createLoading: false,
  fetchOneLoading: false,
  deleteLoading: false,
  patchLoading: false,
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

    builder.addCase(createCocktail.pending, (state) => {
      state.createLoading = true;
    });

    builder.addCase(createCocktail.fulfilled, (state) => {
      state.createLoading = false;
    });

    builder.addCase(createCocktail.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchOneCocktail.pending, (state) => {
      state.fetchOneLoading = true;
    });

    builder.addCase(fetchOneCocktail.fulfilled, (state, action) => {
      state.fetchOneLoading = false;
      state.cocktail = action.payload;
    });

    builder.addCase(fetchOneCocktail.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(deleteCocktail.pending, (state, action) => {
      state.deleteLoading = !!action.meta.arg;
    });
    builder.addCase(deleteCocktail.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteCocktail.rejected, (state) => {
      state.deleteLoading = true;
    });

    builder.addCase(patchCocktail.pending, (state, action) => {
      state.patchLoading = !!action.meta.arg;
    });
    builder.addCase(patchCocktail.fulfilled, (state) => {
      state.patchLoading = false;
    });
    builder.addCase(patchCocktail.rejected, (state) => {
      state.patchLoading = true;
    });
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktail = (state: RootState) => state.cocktails.cocktail;
export const selectOneCocktailLoading = (state: RootState) => state.cocktails.fetchOneLoading;
export const selectCreateLoading = (state: RootState) => state.cocktails.createLoading;
export const selectCocktailsLoading = (state: RootState) => state.cocktails.fetchLoadingCocktails;
export const selectDeleteLoading = (state: RootState) => state.cocktails.deleteLoading;
export const selectPatchLoading = (state: RootState) => state.cocktails.patchLoading;