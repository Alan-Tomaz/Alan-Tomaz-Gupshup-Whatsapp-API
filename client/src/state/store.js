import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from '@reduxjs/toolkit';
import formReducer from "./form/formSlice";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";

/* UNIFY REDUCERS */
const rootReducer = combineReducers({ formReducer })

/* CREATE PERSIST REDUX CONFIG */
const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* CREATE STORE MIDDLEWARE */


/* CREATE REDUX STATE */
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
})

const persistor = persistStore(store);

export { store, persistor };