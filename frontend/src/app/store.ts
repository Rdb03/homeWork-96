import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { usersReducer } from '../features/users/usersSlice.ts';
import { cocktailsReducer } from '../features/cocktails/CocktailSlice.ts';


const userPersistConfig = {
  key: 'spotybi:users',
  storage: storage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  users: persistReducer(userPersistConfig, usersReducer),
  cocktails: cocktailsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
    }
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persist = persistStore(store);
