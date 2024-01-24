import {
	FlatList,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCampaign } from '../../../redux/slices/campaignSlice';
import dayjs from 'dayjs';
import IconButton from '../../../components/IconButton';
import MonsterListItem from '../../../components/MonsterListItem';

const CampaignDetailsScreen = ({ route, navigation }) => {
	const { campaign } = route.params;
	const theme = useSelector((state) => state.theme);
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteCampaign(campaign._id));
		navigation.navigate('CampaignList');
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
			flexDirection: 'row',
			alignItems: 'center',
			alignSelf: 'flex-end',
			margin: theme.spacing,
			gap: 5,
		},
		buttonLabel: {
			color: theme.brand,
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
					<IconButton
						icon='remove-circle-outline'
						size={25}
						color={theme.brand}
						onPress={handleDelete}
					/>
				</View>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.value}>
							<Text style={styles.label}>Name: </Text>
							{campaign.name}
						</Text>
						<Text style={styles.value}>
							<Text style={styles.label}>Created: </Text>
							{dayjs(campaign.createdAt).format('MMM/D/YYYY')}
						</Text>
					</View>
					<Text style={styles.section}>Monsters</Text>
					<View style={styles.divider} />
					{campaign.monsters.length === 0 ? (
						<Text style={styles.empty}>
							No monsters in sight, I think we're safe...
						</Text>
					) : (
						<FlatList
							data={campaign.monsters}
							renderItem={({ item }) => <MonsterListItem item={item} />}
							keyExtractor={(item) => item.slug}
						/>
					)}
				</View>
			</ImageBackground>
		</View>
	);
};

export default CampaignDetailsScreen;
