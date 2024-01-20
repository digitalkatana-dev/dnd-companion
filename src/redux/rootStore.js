import { configureStore } from '@reduxjs/toolkit';
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import monsterReducer from './slices/monsterSlice';

const themePersistConfig = {
	key: 'theme',
	storage: AsyncStorage,
	// whitelist: ['user'],
};

const userPersistConfig = {
	key: 'user',
	storage: AsyncStorage,
	// whitelist: ['user'],
};

const monsterPersistConfig = {
	key: 'monster',
	storage: AsyncStorage,
	// whitelist: ['monsters'],
};

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		// user: persistReducer(userPersistConfig, userReducer),
		user: userReducer,
		monster: persistReducer(monsterPersistConfig, monsterReducer),
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
