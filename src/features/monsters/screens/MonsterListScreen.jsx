import {
	FlatList,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setPage,
	loadMonsters,
	resetPage,
	clearMonsters,
} from '../../../redux/slices/monsterSlice';
import Button from '../../../components/Button';
import MonsterListItem from '../components/MonsterListItem';
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

	const initialLoad = useCallback(() => {
		handleLoadMore();
	}, []);

	useEffect(() => {
		initialLoad();
	}, []);

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
		spacer: {
			marginVertical: 15,
		},
	});

	return (
		<View style={styles.canvas}>
			<ImageBackground
				source={require('../../../../assets/parchment-dark.png')}
				style={styles.background}
			>
				{/* <Button title='Load monsters' onPress={handleClick} /> */}
				<Button label='Clear monsters' onPress={handleClear} />
				<View style={styles.spacer} />
				<FlatList
					data={monsters}
					renderItem={({ item }) => (
						<MonsterListItem item={item} onPress={() => handlePress(item)} />
					)}
					keyExtractor={(item) => item.slug}
					ListFooterComponent={<Footer />}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0}
				/>
			</ImageBackground>
		</View>
	);
};

export default MonsterListScreen;
