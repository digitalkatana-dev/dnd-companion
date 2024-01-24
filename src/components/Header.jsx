import { Header as AppHeader } from '@rneui/themed';
import { useSelector } from 'react-redux';
import Logout from './Logout';

const Header = () => {
	const theme = useSelector((state) => state.theme);
	const { user } = useSelector((state) => state.user);

	return (
		<AppHeader
			barStyle='light-content'
			backgroundColor={theme.primary}
			rightComponent={user && <Logout />}
		/>
	);
};

export default Header;
