import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

const Empty = () => {
	const theme = useSelector((state) => state.theme);

	const styles = StyleSheet.create({
		empty: {
			color: theme.brand,
			fontWeight: 'bold',
			fontSize: 15,
			textAlign: 'center',
		},
	});

	return (
		<Text style={styles.empty}>
			No monsters in sight, I think we're safe...
		</Text>
	);
};

export default Empty;
