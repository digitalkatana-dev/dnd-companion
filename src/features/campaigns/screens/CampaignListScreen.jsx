import {
	FlatList,
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setName, createCampaign } from '../../../redux/slices/campaignSlice';
import IconButton from '../../../components/IconButton';
import Button from '../../../components/Button';

const CampaignListScreen = ({ navigation }) => {
	const theme = useSelector((state) => state.theme);
	const { name, campaigns } = useSelector((state) => state.campaigns);
	const dispatch = useDispatch();

	const handleChange = (text) => {
		dispatch(setName(text));
	};

	const handleSubmit = () => {
		const data = {
			name,
		};
		dispatch(createCampaign(data));
	};

	const handlePress = (item) => {
		navigation.navigate('CampaignDetails', { campaign: item });
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
		formContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			// padding: 10,
			margin: 20,
		},
		input: {
			flex: 1,
			height: 40,
			margin: 12,
			borderWidth: 2,
			borderColor: theme.brand,
			borderRadius: 20,
			padding: 10,
			textAlign: 'center',
		},
		listContainer: {
			flex: 1,
			justifyContent: 'center',
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
				<View style={styles.formContainer}>
					<TextInput
						placeholder='New Campaign'
						style={styles.input}
						value={name}
						onChangeText={handleChange}
					/>
					<IconButton
						icon='add-circle-outline'
						size={30}
						color={theme.brand}
						onPress={handleSubmit}
					/>
				</View>
				<View style={styles.listContainer}>
					{campaigns.length === 0 ? (
						<Text style={styles.empty}>
							You have no campaigns, create an new one!
						</Text>
					) : (
						<FlatList
							data={campaigns}
							renderItem={({ item }) => (
								<Button
									variant='text'
									label={item.name}
									onPress={() => handlePress(item)}
								/>
							)}
							keyExtractor={(item) => item._id}
						/>
					)}
				</View>
			</ImageBackground>
		</View>
	);
};

export default CampaignListScreen;
