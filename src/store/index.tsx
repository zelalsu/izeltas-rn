import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import thunk from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Reducer
import themeReducer from './slices/theme';
import routeReducer from './slices/route';
import userReducer from './slices/user';
import { newsApi } from './api/news';
import { cityApi } from './api/city';

// Api
import { commonApi } from './api/login';
import { productApi } from './api/product';
import { sellerApi } from './api/seller';
import { contactFormApi } from './api/contacForm';
import { registerApi } from './api/register';
import apiMiddleware from './api/apiMiddleware';
import languageReducer from './slices/language';
import { usersApi } from './api/users';

const rootReducer = combineReducers({
  theme: themeReducer,
  route: routeReducer,
  user: userReducer,
  language: languageReducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [cityApi.reducerPath]: cityApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [sellerApi.reducerPath]: sellerApi.reducer,
  [contactFormApi.reducerPath]: contactFormApi.reducer,
  [registerApi.reducerPath]: registerApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [apiMiddleware.reducerPath]: apiMiddleware.reducer,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'user', 'language'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        warnAfter: 1000,
        serializableCheck: false,
      },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 1000,
      },
    }).concat(
      thunk,
      usersApi.middleware,
      apiMiddleware.middleware,
      commonApi.middleware,
      newsApi.middleware,
      cityApi.middleware,
      productApi.middleware,
      sellerApi.middleware,
      contactFormApi.middleware,
      registerApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Redux hooks with types
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
