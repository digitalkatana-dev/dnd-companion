import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { setCampaigns } from './campaignSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import companionApi from '../../api/companionApi';

export const register = createAsyncThunk(
	'user/register',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await companionApi.post('/users/register', data);
			const { token, userData } = res.data;
			AsyncStorage.setItem('token', token);
			dispatch(clearForm());
			return userData;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const userLogin = createAsyncThunk(
	'user/login',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await companionApi.post('/users/login', data);
			const { token, userData } = res.data;
			AsyncStorage.setItem('token', token);
			dispatch(clearForm());
			dispatch(setCampaigns(userData.campaigns));
			return userData;
		} catch (err) {
			console.log(err);
			return rejectWithValue(err.response.data);
		}
	}
);

export const getUser = createAsyncThunk(
	'user/get_user',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await companionApi.get(`/users/?id=${data}`);
			dispatch(setCampaigns(res.data.campaigns));
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getAllUsers = createAsyncThunk(
	'user/get_user',
	async (data, { rejectWithValue }) => {
		try {
			const res = await companionApi.get(`/users/`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const generatePasswordToken = createAsyncThunk(
	'user/generate_password_token',
	async (data, { rejectWithValue }) => {
		try {
			const res = await companionApi.put(
				'/users/generate-password-token',
				data
			);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const resetWithToken = createAsyncThunk(
	'user/reset_with_token',
	async (data, { rejectWithValue }) => {
		try {
			const res = await companionApi.put('/users/reset-password', data);
			const { success } = res.data;
			return success;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateUser = createAsyncThunk(
	'user/update_user',
	async (data, { rejectWithValue }) => {
		const { _id, ...others } = data;
		try {
			const res = await companionApi.put(`/users/${_id}`, others);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const deleteUser = createAsyncThunk();

export const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState({
	loading: false,
	firstName: '',
	lastName: '',
	handle: '',
	email: '',
	login: '',
	password: '',
	user: null,
	resetToken: null,
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
		setFirstName: (state, action) => {
			state.firstName = action.payload;
		},
		setLastName: (state, action) => {
			state.lastName = action.payload;
		},
		setHandle: (state, action) => {
			state.handle = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
		setLogin: (state, action) => {
			state.login = action.payload;
		},
		setPassword: (state, action) => {
			state.password = action.payload;
		},
		clearForm: (state) => {
			state.firstName = '';
			state.lastName = '';
			state.handle = '';
			state.email = '';
			state.login = '';
			state.password = '';
		},
		clearUserSuccess: (state) => {
			state.success = null;
		},
		clearErrors: (state) => {
			state.errors = null;
		},
		logout: (state) => {
			state.loading = false;
			state.firstName = '';
			state.lastName = '';
			state.handle = '';
			state.email = '';
			state.login = '';
			state.password = '';
			state.user = null;
			state.resetToken = null;
			state.success = null;
			state.errors = null;
			AsyncStorage.removeItem('token');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(userLogin.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(userLogin.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(getUser.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(generatePasswordToken.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(generatePasswordToken.fulfilled, (state, action) => {
				state.loading = false;
				state.email = '';
				state.success = action.payload.success;
				state.resetToken = action.payload.resetToken;
			})
			.addCase(generatePasswordToken.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(resetWithToken.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(resetWithToken.fulfilled, (state, action) => {
				state.loading = false;
				state.password = '';
				state.success = action.payload;
				state.resetToken = null;
			})
			.addCase(resetWithToken.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
				state.errors = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.success;
				state.user = action.payload.updatedUser;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.errors = action.payload;
			})
			.addCase(logout, (state) => {
				userAdapter.removeAll(state);
			});
	},
});

export const {
	setFirstName,
	setLastName,
	setHandle,
	setEmail,
	setLogin,
	setPassword,
	setSelectedImage,
	clearForm,
	clearUserSuccess,
	clearErrors,
	logout,
} = userSlice.actions;

export default userSlice.reducer;
