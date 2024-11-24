import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import userReducer from './features/user-slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;