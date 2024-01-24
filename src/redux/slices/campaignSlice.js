import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { getUser, logout } from './userSlice';
import companionApi from '../../api/companionApi';

export const createCampaign = createAsyncThunk(
	'campaign/create_campaign',
	async (data, { rejectWithValue, dispatch, getState }) => {
		try {
			const res = await companionApi.post('/campaigns', data);
			const { success } = res.data;
			if (success) {
				const user = getState().user.user;
				dispatch(getCampaigns(user._id));
			}
			return success;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getCampaigns = createAsyncThunk(
	'campaign/get_campaigns',
	async (data, { rejectWithValue, getState }) => {
		try {
			const user = getState().user.user;
			const res = await companionApi.get(`/campaigns/?createdBy=${user._id}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateCampaign = createAsyncThunk();

export const addOrRemoveMonster = createAsyncThunk(
	'campaign/add_remove_monster',
	async (data, { rejectWithValue, dispatch, getState }) => {
		const { campaignId } = data;
		try {
			const res = await companionApi.put(
				`/campaigns/${campaignId}/monsters`,
				data
			);
			const { success } = res.data;
			if (success) {
				const user = getState().user.user;
				dispatch(getCampaigns(user._id));
			}
			return success;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const deleteCampaign = createAsyncThunk(
	'campaign/delete_campaign',
	async (data, { rejectWithValue, dispatch, getState }) => {
		try {
			const res = await companionApi.delete(`/campaigns/${data}`);
			const { success } = res.data;
			if (success) {
				const user = getState().user.user;
				dispatch(getUser(user._id));
			}
			return success;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const campaignAdapter = createEntityAdapter();
const initialState = campaignAdapter.getInitialState({
	loading: false,
	name: '',
	campaigns: [],
	success: null,
	errors: null,
});

export const campaignSlice = createSlice({
	name: 'campaign',
	initialState,
	reducers: {
		setName: (state, action) => {
			state.name = action.payload;
		},
		setCampaigns: (state, action) => {
			state.campaigns = action.payload;
		},
		clearSuccess: (state) => {
			state.success = null;
		},
		clearErrors: (state) => {
			state.errors = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createCampaign.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(createCampaign.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
				state.name = '';
			})
			.addCase(createCampaign.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getCampaigns.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getCampaigns.fulfilled, (state, action) => {
				state.loading = false;
				state.campaigns = action.payload;
			})
			.addCase(getCampaigns.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(addOrRemoveMonster.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(addOrRemoveMonster.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
			})
			.addCase(addOrRemoveMonster.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(deleteCampaign.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(deleteCampaign.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload;
			})
			.addCase(deleteCampaign.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(logout, (state) => {
				state.loading = false;
				state.name = '';
				state.campaigns = [];
				state.success = null;
				state.errors = null;
				campaignAdapter.removeAll(state);
			});
	},
});

export const { setName, setCampaigns, clearSuccess, clearErrors } =
	campaignSlice.actions;

export default campaignSlice.reducer;
