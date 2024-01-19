import { Header as AppHeader } from '@rneui/themed';
import { useSelector } from 'react-redux';
import React from 'react';

const Header = () => {
	const theme = useSelector((state) => state.theme);
	const { user } = useSelector((state) => state.user);

	return <AppHeader barStyle='light-content' backgroundColor='#051625' />;
};

export default Header;
