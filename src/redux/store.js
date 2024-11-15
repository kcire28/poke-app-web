import { configureStore } from '@reduxjs/toolkit'
import trainerSlice from './slices/trainerSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from "redux-persist";


const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, trainerSlice);


export const store = configureStore({
  reducer: {
    trainer: persistedReducer
  },
})

export const persistor = persistStore(store);