import {
	FlatList,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
	setPage,
	loadMonsters,
	resetPage,
	clearMonsters,
} from '../../../redux/slices/monsterSlice';
import Button from '../../../components/Button';
import MonsterListItem from '../../../components/MonsterListItem';
import Filter from '../components/Filter';
import Footer from '../components/Footer';

const MonsterListScreen = ({ navigation }) => {
	const theme = useSelector((state) => state.theme);
	const { monsters, page } = useSelector((state) => state.monster);
	const dispatch = useDispatch();

	const handleLoadMore = () => {
		const newPage = page + 1;
		dispatch(setPage(newPage));
		dispatch(loadMonsters(newPage));
	};

	const handleClear = () => {
		dispatch(resetPage());
		dispatch(clearMonsters());
	};

	const handlePress = (item) => {
		navigation.navigate('MonsterDetail', { monster: item });
	};

	const styles = StyleSheet.create({
		canvas: {
			flex: 1,
			flexDirection: 'column',
		},
		background: {
			flex: 1,
			resizeMode: 'cover',
			justifyContent: 'center',
		},
		buttonContainer: {
			padding: 20,
		},
		empty: {
			color: theme.brand,
			fontWeight: 'bold',
			fontSize: 15,
			textAlign: 'center',
		},
	});

	return (
		<View style={styles.canvas}>
			<ImageBackground
				source={require('../../../../assets/parchment.jpg')}
				style={styles.background}
			>
				{/* <Button label='Clear Monsters' onPress={handleClear} /> */}
				{monsters.length === 0 ? (
					<View style={styles.buttonContainer}>
						<Text style={styles.empty}>
							No monsters in sight, I think we're safe...
						</Text>
						<Button label='Get Monsters' onPress={handleLoadMore} />
					</View>
				) : (
					<>
						<Filter />
						<FlatList
							data={monsters}
							renderItem={({ item }) => (
								<MonsterListItem
									item={item}
									onPress={() => handlePress(item)}
								/>
							)}
							keyExtractor={(item) => item.slug}
							ListFooterComponent={<Footer />}
							onEndReached={handleLoadMore}
							onEndReachedThreshold={0}
						/>
					</>
				)}
			</ImageBackground>
		</View>
	);
};

export default MonsterListScreen;
