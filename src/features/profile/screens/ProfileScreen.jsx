import {
	FlatList,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Divider, ListItem } from '@rneui/themed';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../../redux/slices/userSlice';
import {
	setSelectedCampaign,
	deleteCampaign,
} from '../../../redux/slices/campaignSlice';
import Loading from '../../../components/Loading';
import CampaignListItem from '../../../components/CampaignListItem';
import AvatarPicker from '../components/AvatarPicker';
import AvatarList from '../components/AvatarList';
import ProfileActions from '../components/ProfileActions';
import DeleteModal from '../../../components/DeleteModal';

const ProfileScreen = ({ navigation }) => {
	const theme = useSelector((state) => state.theme);
	const { loading, user } = useSelector((state) => state.user);
	const userSuccess = useSelector((state) => state.user.success);
	const { selectedCampaign, campaigns, success } = useSelector(
		(state) => state.campaign
	);
	const [isPickerVisible, setIsPickerVisible] = useState(false);
	const [isActionsVisible, setIsActionsVisible] = useState(false);
	const [isDeleteVisible, setIsDeleteVisible] = useState(false);
	const dispatch = useDispatch();

	const onPickerClose = () => {
		setIsPickerVisible(false);
	};

	const onActionsClose = () => {
		setIsActionsVisible(false);
	};

	const handleAvatarPress = () => {
		setIsPickerVisible(true);
	};

	const updateAvatar = (item) => {
		const data = {
			_id: user._id,
			profilePic: item.source,
		};
		dispatch(updateUser(data));
	};

	const handleActionsPress = (item) => {
		setIsActionsVisible(true);
		dispatch(setSelectedCampaign(item));
	};

	const handleEdit = () => {
		navigation.navigate('Campaigns', { screen: 'CampaignDetails' });
		onActionsClose();
	};

	const handleDeleteClose = () => {
		setIsDeleteVisible(false);
	};

	const handleDeletePress = () => {
		onActionsClose();
		setTimeout(() => {
			setIsDeleteVisible(true);
		}, 500);
	};

	const handleDelete = () => {
		const data = {
			id: selectedCampaign._id,
			user: user?._id,
		};
		dispatch(deleteCampaign(data));
	};

	const handleUserSuccess = useCallback(() => {
		if (userSuccess && userSuccess == 'User updated successfully!') {
			onPickerClose();
		}
	}, [userSuccess]);

	useEffect(() => {
		handleUserSuccess();
	}, [handleUserSuccess]);

	const reloadUser = useCallback(() => {
		if (success && success === 'Campaign deleted successfully!') {
			dispatch(getUser(user?._id));
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
		},
		cover_section: {
			height: 150,
			justifyContent: 'center',
			backgroundColor: theme.brand,
			position: 'relative',
		},
		user_image_container: {
			width: 120,
			height: 120,
			justifyContent: 'center',
			alignItems: 'center',
			marginLeft: theme.spacing,
			position: 'absolute',
			left: 0,
			bottom: -60,
		},
		user_image: {
			width: '100%',
			height: '100%',
			objectFit: 'cover',
			borderRadius: 100,
			borderWidth: 4,
			borderColor: theme.primary,
		},
		identity_container: {
			flexDirection: 'column',
			paddingHorizontal: 20,
			marginTop: 65,
		},
		identity_txt: {
			color: theme.brand,
		},
		section: {
			flex: 1,
			paddingHorizontal: 20,
			// borderWidth: 2,
			// borderColor: 'purple',
		},
		divider: {
			marginVertical: 10,
			marginHorizontal: 20,
		},
		section_label: {
			fontFamily: 'AlegreyaSC_500Medium',
			fontSize: 18,
			color: theme.brand,
			textDecorationLine: 'underline',
			marginBottom: 10,
		},
		listItem: {
			backgroundColor: 'transparent',
		},
		itemTitle: {
			fontFamily: 'AlegreyaSC_500Medium',
			color: theme.brand,
		},
		option_item: {
			backgroundColor: 'transparent',
		},
		option_title: {
			fontFamily: 'AlegreyaSC_800ExtraBold',
			color: theme.neutral,
		},
	});

	return (
		<View style={styles.canvas}>
			<ImageBackground
				source={require('../../../../assets/parchment.jpg')}
				style={styles.background}
			>
				{loading && <Loading />}
				<View style={styles.header_container}>
					<View style={styles.cover_section}>
						<TouchableOpacity style={styles.cover_container} disabled />
						<TouchableOpacity
							style={styles.user_image_container}
							onPress={handleAvatarPress}
						>
							<Image
								source={{ uri: user?.profilePic }}
								alt={user?.handle}
								style={styles.user_image}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.identity_container}>
						<Text style={styles.identity_txt}>
							{user?.firstName + ' ' + user?.lastName}
						</Text>
						<Text style={styles.identity_txt}>@{user?.handle}</Text>
					</View>
				</View>
				<Divider style={styles.divider} color={theme.brand} width={3} />
				<View style={styles.section}>
					<Text style={styles.section_label}>Campaigns</Text>
					<View style={styles.list}>
						<FlatList
							data={campaigns}
							renderItem={({ item }) => (
								<CampaignListItem
									disabled={true}
									variant='profile'
									itemStyle={styles.listItem}
									titleStyle={styles.itemTitle}
									optionPress={() => handleActionsPress(item)}
									item={item}
								/>
							)}
							keyExtractor={(item) => item._id}
						/>
					</View>
				</View>
				<AvatarPicker isVisible={isPickerVisible} onClose={onPickerClose}>
					<AvatarList onPress={updateAvatar} />
				</AvatarPicker>
				<ProfileActions isVisible={isActionsVisible} onClose={onActionsClose}>
					<TouchableOpacity onPress={handleEdit}>
						<ListItem containerStyle={styles.option_item} bottomDivider>
							<ListItem.Content>
								<ListItem.Title style={styles.option_title}>
									Edit
								</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleDeletePress}>
						<ListItem containerStyle={styles.option_item} bottomDivider>
							<ListItem.Content>
								<ListItem.Title style={styles.option_title}>
									Delete
								</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					</TouchableOpacity>
				</ProfileActions>
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

export default ProfileScreen;
