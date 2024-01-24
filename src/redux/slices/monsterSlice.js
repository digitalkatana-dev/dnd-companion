import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { logout } from './userSlice';
import open5eApi from '../../api/open5eApi';

export const loadMonsters = createAsyncThunk(
	'monsters/load_monsters',
	async (data, { rejectWithValue }) => {
		try {
			const res = await open5eApi.get(`/monsters/?page=${data}`);
			return res.data.results;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const filterMonsters = createAsyncThunk(
	'monsters/filter',
	async (data, { rejectWithValue }) => {
		try {
			const res = await open5eApi.get(`/monsters`);
			return res.data.results;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const monsterAdapter = createEntityAdapter();
const initialState = monsterAdapter.getInitialState({
	loading: false,
	page: 0,
	monsters: [],
	errors: null,
});

export const monsterSlice = createSlice({
	name: 'monster',
	initialState,
	reducers: {
		setPage: (state, action) => {
			state.page = action.payload;
		},
		resetPage: (state) => {
			state.page = 0;
		},
		clearMonsters: (state) => {
			state.monsters = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadMonsters.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(loadMonsters.fulfilled, (state, action) => {
				state.loading = false;
				state.monsters = [...state.monsters, ...action.payload];
			})
			.addCase(loadMonsters.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(logout, (state) => {
				state.loading = false;
				state.page = 0;
				state.monsters = [];
				state.errors = null;
				monsterAdapter.removeAll(state);
			});
	},
});

export const { setPage, resetPage, clearMonsters } = monsterSlice.actions;

export default monsterSlice.reducer;
