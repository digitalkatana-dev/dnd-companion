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
		btn_style: {
			marginVertical: theme.spacing,
			borderRadius: 20,
			elevation: 10,
		},
		btn_label: {
			color: theme.paragraph,
			fontFamily: 'Creepster_400Regular',
			fontSize: 20,
			textAlign: 'center',
		},
	});

	return (
		<Button
			btnStyle={styles.btn_style}
			label='Logout'
			labelStyle={styles.btn_label}
			onPress={handlePress}
		/>
	);
};

export default Logout;
