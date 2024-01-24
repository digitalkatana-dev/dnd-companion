import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import Button from '../components/Button';

const Logout = () => {
	const theme = useSelector((state) => state.theme);
	const dispatch = useDispatch();

	const handlePress = () => {
		dispatch(logout());
	};

	const styles = StyleSheet.create({
		logout: {
			color: theme.paragraph,
		},
	});

	return (
		<Button
			variant='text'
			label='Logout'
			labelStyle={styles.logout}
			onPress={handlePress}
		/>
	);
};

export default Logout;
