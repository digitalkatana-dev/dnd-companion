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
import Empty from '../components/Empty';
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
		container: {
			flex: 1,
			paddingTop: 20,
			paddingHorizontal: 20,
			justifyContent: 'center',
		},
		buttonContainer: {
			paddingHorizontal: 30,
		},
	});

	return (
		<View style={styles.canvas}>
			<ImageBackground
				source={require('../../../../assets/parchment.jpg')}
				style={styles.background}
			>
				<Filter />
				{/* <Button label='Clear Monsters' onPress={handleClear} /> */}
				<View style={styles.container}>
					{monsters.length === 0 ? (
						<Empty />
					) : (
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
							onEndReached={page !== 0 && handleLoadMore}
							onEndReachedThreshold={0}
						/>
					)}
					{page === 0 && (
						<View style={styles.buttonContainer}>
							<Button label='Get Monsters' onPress={handleLoadMore} />
						</View>
					)}
				</View>
			</ImageBackground>
		</View>
	);
};

export default MonsterListScreen;
