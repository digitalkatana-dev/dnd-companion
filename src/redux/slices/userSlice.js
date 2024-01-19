import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState({
	loading: false,
	user: { id: 1 },
	success: null,
	errors: null,
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
