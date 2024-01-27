import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const Loading = () => {
	const theme = useSelector((state) => state.theme);

	const styles = StyleSheet.create({
		loading: {
			position: 'absolute',
			alignItems: 'center',
			justifyContent: 'center',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			zIndex: 999,
		},
	});

	return (
		<ActivityIndicator
			size='large'
			color={theme.brand}
			style={styles.loading}
		/>
	);
};

export default Loading;
