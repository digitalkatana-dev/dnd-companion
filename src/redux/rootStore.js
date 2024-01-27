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
import campaignReducer from './slices/campaignSlice';

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

const campaignPersistConfig = {
	key: 'campaign',
	storage: AsyncStorage,
	// whitelist: ['campaigns'],
};

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		// user: userReducer,
		user: persistReducer(userPersistConfig, userReducer),
		monster: persistReducer(monsterPersistConfig, monsterReducer),
		campaign: persistReducer(campaignPersistConfig, campaignReducer),
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
