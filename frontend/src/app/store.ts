import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {usersReducer} from "../features/users/usersSlice";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from "redux-persist";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { cocktailsReducer } from '../features/cocktails/CocktailSlice.ts';

const usersPersistConfig = {
  key: 'cocktail:user',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  cocktails: cocktailsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persist = persistStore(store);
