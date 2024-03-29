import {
	FlatList,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Input as TextInput } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
	setName,
	createCampaign,
	setSelectedCampaign,
	clearErrors,
} from '../../../redux/slices/campaignSlice';
import Loading from '../../../components/Loading';
import IconButton from '../../../components/IconButton';
import Button from '../../../components/Button';

const CampaignListScreen = ({ navigation }) => {
	const theme = useSelector((state) => state.theme);
	const { user } = useSelector((state) => state.user);
	const { loading, name, campaigns, errors } = useSelector(
		(state) => state.campaign
	);
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (text) => {
		dispatch(setName(text));
	};

	const handleSubmit = () => {
		const data = {
			name,
			createdBy: user._id,
		};
		dispatch(createCampaign(data));
	};

	const handlePress = (item) => {
		dispatch(setSelectedCampaign(item));
		navigation.navigate('CampaignDetails');
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
		formControl: {
			flexDirection: 'column',
		},
		formContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			margin: 20,
			marginBottom: 0,
		},
		inputContainer: {
			height: 35,
			margin: 12,
			backgroundColor: 'lightgrey',
			borderWidth: 2,
			borderColor: theme.brand,
			borderRadius: 20,
			padding: 10,
		},
		input: {
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
		button: {
			marginVertical: theme.spacing,
			borderRadius: 20,
		},
		button_label: {
			color: theme.brand,
			fontFamily: 'Creepster_400Regular',
			fontSize: 20,
			textAlign: 'center',
		},
		input_error: {
			color: theme.error,
			alignSelf: 'center',
			fontWeight: 'bold',
			borderRadius: 20,
			paddingVertical: 3,
			paddingHorizontal: 5,
		},
		errorContainer: {
			alignItems: 'center',
		},
		error: {
			color: theme.error,
			fontWeight: 'bold',
		},
	});

	return (
		<View style={styles.canvas}>
			{loading && <Loading />}
			<ImageBackground
				source={require('../../../../assets/parchment.jpg')}
				style={styles.background}
			>
				<View style={styles.formControl}>
					<View style={styles.formContainer}>
						<TextInput
							placeholder='New Campaign'
							inputContainerStyle={styles.inputContainer}
							inputStyle={styles.input}
							value={name}
							onChangeText={handleChange}
							onFocus={handleFocus}
							rightIcon={
								<IconButton onPress={handleSubmit}>
									<MaterialIcons
										name='add-circle-outline'
										size={30}
										color={theme.brand}
									/>
								</IconButton>
							}
							errorMessage={errors?.name}
							renderErrorMessage={false}
							errorStyle={styles.input_error}
						/>
					</View>
					{errors?.message && (
						<View style={styles.errorContainer}>
							<Text style={styles.error}>{errors?.message}</Text>
						</View>
					)}
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
									btnStyle={styles.button}
									labelStyle={styles.button_label}
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
