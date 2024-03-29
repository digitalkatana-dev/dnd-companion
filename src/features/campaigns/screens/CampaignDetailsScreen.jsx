import {
	FlatList,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/slices/userSlice';
import {
	deleteCampaign,
	setSelectedCampaign,
} from '../../../redux/slices/campaignSlice';
import { setSelectedMonster } from '../../../redux/slices/monsterSlice';
import dayjs from 'dayjs';
import IconButton from '../../../components/IconButton';
import MonsterListItem from '../../../components/MonsterListItem';
import DeleteModal from '../../../components/DeleteModal';

const CampaignDetailsScreen = ({ navigation }) => {
	const theme = useSelector((state) => state.theme);
	const { user } = useSelector((state) => state.user);
	const { selectedCampaign, success } = useSelector((state) => state.campaign);
	const [isDeleteVisible, setIsDeleteVisible] = useState(false);
	const dispatch = useDispatch();

	const handleDelete = () => {
		const data = {
			id: selectedCampaign?._id,
			user: user._id,
		};

		dispatch(deleteCampaign(data));
	};

	const handlePress = (item) => {
		dispatch(setSelectedMonster(item));
		navigation.navigate('CampaignMonster');
	};

	const handleDeletePress = () => {
		setIsDeleteVisible(true);
	};

	const handleDeleteClose = () => {
		setIsDeleteVisible(false);
	};

	const clearCampaign = useCallback(() => {
		navigation.addListener('beforeRemove', () => {
			setTimeout(() => {
				dispatch(setSelectedCampaign(null));
			}, 1500);
		});
	}, [navigation, dispatch]);

	useEffect(() => {
		return clearCampaign();
	}, [clearCampaign]);

	const reloadUser = useCallback(() => {
		if (success && success === 'Campaign deleted successfully!') {
			dispatch(getUser(user?._id));
			navigation.navigate('CampaignList');
			handleDeleteClose();
		}
	}, [dispatch, success, user]);

	useEffect(() => {
		reloadUser();
	}, [reloadUser]);

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
			flexDirection: 'row',
			alignItems: 'center',
			alignSelf: 'flex-end',
			margin: theme.spacing,
			gap: 5,
		},
		buttonLabel: {
			color: theme.brand,
			fontSize: 12,
		},
		container: {
			flex: 1,
			padding: 20,
		},
		header: {
			marginBottom: 20,
			alignItems: 'center',
		},
		label: {
			fontFamily: 'AlegreyaSC_500Medium',
			fontSize: 20,
			color: theme.brand,
		},
		value: {
			fontSize: 15,
			color: theme.brand,
		},
		section: {
			fontFamily: 'AlegreyaSC_500Medium',
			fontSize: 18,
			color: theme.brand,
		},
		divider: {
			borderBottomColor: 'brown',
			borderBottomWidth: 3,
			marginVertical: 5,
		},
	});

	return (
		<View style={styles.canvas}>
			<ImageBackground
				source={require('../../../../assets/parchment.jpg')}
				style={styles.background}
			>
				<View style={styles.buttonContainer}>
					<Text style={styles.buttonLabel}>Delete Campaign</Text>
					<IconButton onPress={handleDeletePress}>
						<MaterialIcons
							name='remove-circle-outline'
							size={25}
							color={theme.brand}
						/>
					</IconButton>
				</View>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.value}>
							<Text style={styles.label}>Name: </Text>
							{selectedCampaign?.name}
						</Text>
						<Text style={styles.value}>
							<Text style={styles.label}>Created: </Text>
							{dayjs(selectedCampaign?.createdAt).format('MMM/D/YYYY')}
						</Text>
					</View>
					<Text style={styles.section}>Monsters</Text>
					<View style={styles.divider} />
					{selectedCampaign?.monsters.length === 0 ? (
						<Text style={styles.empty}>
							No monsters in sight, I think we're safe...
						</Text>
					) : (
						<FlatList
							data={selectedCampaign?.monsters}
							renderItem={({ item }) => (
								<MonsterListItem
									item={item}
									onPress={() => handlePress(item)}
								/>
							)}
							keyExtractor={(item) => item.slug}
						/>
					)}
				</View>
				<DeleteModal
					visible={isDeleteVisible}
					type='campaign'
					onPress={handleDelete}
					onClose={handleDeleteClose}
				/>
			</ImageBackground>
		</View>
	);
};

export default CampaignDetailsScreen;
