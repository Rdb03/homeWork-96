import axiosApi from '../../../axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CocktailMutation, ICocktail } from '../../../types';

export const fetchCocktails = createAsyncThunk<ICocktail[], string | undefined>(
  'cocktails/fetchCocktails',
  async (user) => {
    const url = user ? `/cocktails?user=${user}` : '/cocktails';
    const response = await axiosApi.get<ICocktail[]>(url);
    return response.data;
  }
);

export const createCocktail = createAsyncThunk(
  'cocktails/create',
  async ({ cocktailMutation, token }: { cocktailMutation: CocktailMutation, token: string }) => {
    const formData = new FormData();
    formData.append('name', cocktailMutation.name);
    formData.append('recipe', cocktailMutation.recipe);
    formData.append('user', cocktailMutation.user);

    if (cocktailMutation.image) {
      formData.append('image', cocktailMutation.image);
    }

    if (cocktailMutation.ingredients) {
      cocktailMutation.ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}][nameIng]`, ingredient.nameIng);
        formData.append(`ingredients[${index}][qty]`, ingredient.qty);
      });
    }

    try {
      const response = await axiosApi.post('/cocktails', formData, {
        headers: {
          Authorization: token,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating cocktail:', error);
      throw error;
    }
  },
);


