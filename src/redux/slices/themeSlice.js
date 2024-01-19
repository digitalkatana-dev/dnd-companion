import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const themeAdapter = createEntityAdapter();
const initialState = themeAdapter.getInitialState({
	brand: '#7f5af0',
	brandShadow: 'rgba(129, 92, 240, 0.2)',
	primary: '#242629',
	secondary: '#16161a',
	heading: '#fffffe',
	paragraph: '#94a1b2',
	highlight: '#2cb67d',
	highlightShadow: 'rgba(44, 182, 125, 0.2)',
	outline: '#010101',
	border: '#72757e',
	muted: 'rgba(255, 255, 255, 0.34)',
	mutedShadow: 'rgba(255, 255, 255, 0.06)',
	reply: '#4fc4cf',
	replyShadow: 'rgba(79, 196, 207, 0.2)',
	pin: 'dodgerblue',
	pinShadow: 'rgba(30, 144, 255, 0.2)',
	like: '#e53170',
	likeShadow: 'rgba(229, 49, 112, 0.2)',
	selected: 'rgb(0, 132, 255)',
	selectedShadow: 'rgba(204, 230, 255, 0.2)',
	success: 'green',
	error: 'red',
	spacing: 15,
});

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {},
});

export default themeSlice.reducer;
