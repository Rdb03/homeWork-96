import axiosApi from '../../../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICocktail } from '../../../types';

export const fetchCocktails = createAsyncThunk<ICocktail[], string | undefined>(
  'cocktails/fetchCocktails',
  async (user) => {
    const url = user ? `/cocktails?user=${user}` : '/cocktails';
    const response = await axiosApi.get<ICocktail[]>(url);
    return response.data;
  }
);
