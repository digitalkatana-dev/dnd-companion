import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { alphabet } from '../../../util/data';

const Filter = () => {
	const theme = useSelector((state) => state.theme);
	const dispatch = useDispatch();

	const handleFilter = (item) => {};

	const styles = StyleSheet.create({
		canvas: {
			alignItems: 'center',
			marginVertical: 20,
			marginHorizontal: 5,
		},
		letter: {
			color: theme.brand,
			fontWeight: 'bold',
			marginHorizontal: 2,
		},
	});

	return (
		<View style={styles.canvas}>
			<FlatList
				data={alphabet}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => handleFilter(item.value)}>
						<Text style={styles.letter}>{item.value}</Text>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id}
				horizontal
			/>
		</View>
	);
};

export default Filter;
