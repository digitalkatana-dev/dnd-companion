import {
	FlatList,
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Divider } from '@rneui/themed';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMonster } from '../../../redux/slices/monsterSlice';
import {
	getCampaigns,
	addOrRemoveMonster,
} from '../../../redux/slices/campaignSlice';
import { capitalizeWords } from '../../../util/helpers';
import Loading from '../../../components/Loading';
import IconButton from '../../../components/IconButton';
import CampaignPicker from '../../../components/CampaignPicker';
import CampaignListItem from '../../../components/CampaignListItem';

const MonsterDetailScreen = ({ navigation }) => {
	const theme = useSelector((state) => state.theme);
	const { user } = useSelector((state) => state.user);
	const { loading, selectedMonster } = useSelector((state) => state.monster);
	const { campaigns } = useSelector((state) => state.campaign);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const dispatch = useDispatch();

	const speed = () => {
		const monsterSpeed = selectedMonster?.speed;
		const elements = [];

		for (const key in monsterSpeed) {
			elements.push(
				<Text style={[styles.statTxt, styles.hspace]} key={key}>
					{`${capitalizeWords(key)} +${monsterSpeed[key]}`}
				</Text>
			);
		}

		return elements;
	};

	const skills = () => {
		const monsterSkills = selectedMonster?.skills;
		const elements = [];

		for (const key in monsterSkills) {
			elements.push(
				<Text style={[styles.statTxt, styles.hspace]} key={key}>
					{`${capitalizeWords(key)} +${monsterSkills[key]}`}
				</Text>
			);
		}

		return elements;
	};

	const onAddToCampaign = () => {
		setIsModalVisible(true);
		dispatch(getCampaigns(user._id));
	};

	const onModalClose = () => {
		setIsModalVisible(false);
	};

	const handlePress = (item, variant) => {
		if (variant === 'empty') {
			navigation.navigate('Campaigns');
		} else {
			const data = {
				campaignId: item._id,
				monster: selectedMonster,
				user: user._id,
			};
			dispatch(addOrRemoveMonster(data));
		}
		onModalClose();
	};

	const styles = StyleSheet.create({
		canvas: {
			flex: 1,
			flexDirection: 'column',
		},
		background: {
			flex: 1,
			resizeMode: 'cover',
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
		scroll: {
			paddingBottom: 20,
		},
		statContainer: {
			paddingHorizontal: 20,
		},
		identityContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		name: {
			fontFamily: 'AlegreyaSC_700Bold',
			fontSize: 23,
			fontWeight: '400',
			color: theme.brand,
		},
		vitals: {
			fontSize: 11,
			fontStyle: 'italic',
			color: theme.brand,
		},
		monsterImg: {
			width: 65,
			height: 65,
			borderWidth: 2,
			borderColor: theme.brand,
			borderRadius: 10,
			objectFit: 'contain',
		},
		divider: {
			marginVertical: 5,
		},
		statRow: {
			flexDirection: 'row',
			alignItems: 'center',
			flexWrap: 'wrap',
		},
		statLabel: {
			fontSize: 12,
			fontWeight: 'bold',
			marginRight: 5,
			color: theme.brand,
		},
		statTxt: {
			fontSize: 11,
			color: theme.brand,
		},
		statBlockRow: {
			flexDirection: 'row',
			justifyContent: 'space-around',
		},
		statStack: {
			alignItems: 'center',
		},
		hspace: {
			marginRight: 5,
		},
		traitRow: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			marginVertical: 5,
		},
		sectionContainer: {
			paddingHorizontal: 20,
		},
		sectionLabel: {
			fontFamily: 'AlegreyaSC_500Medium',
			fontSize: 18,
			color: theme.brand,
			textDecorationLine: 'underline',
		},
		legendaryDesc: {
			marginVertical: 5,
		},
		dividerSM: {
			borderBottomColor: 'brown',
			borderBottomWidth: 1,
		},
	});

	const clearMonster = useCallback(() => {
		navigation.addListener('beforeRemove', () => {
			setTimeout(() => {
				dispatch(setSelectedMonster(null));
			}, 1500);
		});
	}, [navigation, dispatch]);

	useEffect(() => {
		return clearMonster();
	}, [clearMonster]);

	return (
		<View style={styles.canvas}>
			{loading && <Loading />}
			<ImageBackground
				source={require('../../../../assets/parchment.jpg')}
				style={styles.background}
			>
				<View style={styles.buttonContainer}>
					<Text style={styles.buttonLabel}>Add to Campaign</Text>
					<IconButton onPress={onAddToCampaign}>
						<MaterialIcons
							name='add-circle-outline'
							size={25}
							color={theme.brand}
						/>
					</IconButton>
				</View>
				<ScrollView contentContainerStyle={styles.scroll}>
					<View style={styles.statContainer}>
						<View style={styles.identityContainer}>
							<View>
								<Text style={styles.name}>{selectedMonster?.name}</Text>
								<Text style={styles.vitals}>
									{`${selectedMonster?.size} ${selectedMonster?.type}, ${
										selectedMonster?.subtype
											? `${capitalizeWords(selectedMonster?.subtype)}, `
											: ''
									}${capitalizeWords(selectedMonster?.alignment)} `}
								</Text>
							</View>
							{selectedMonster?.img_main && (
								<Image
									style={styles.monsterImg}
									source={{ uri: selectedMonster?.img_main }}
								/>
							)}
						</View>
						<Divider style={styles.divider} color={theme.brand} width={3} />
						<View style={styles.statRow}>
							<Text style={styles.statLabel}>Armor Class</Text>
							<Text style={styles.statTxt}>{`${selectedMonster?.armor_class} ${
								selectedMonster?.armor_desc
									? `(${selectedMonster?.armor_desc})`
									: ''
							}`}</Text>
						</View>
						<View style={styles.statRow}>
							<Text style={styles.statLabel}>Hit Points</Text>
							<Text
								style={styles.statTxt}
							>{`${selectedMonster?.hit_points} (${selectedMonster?.hit_dice})`}</Text>
						</View>
						<View style={styles.statRow}>
							<Text style={styles.statLabel}>Speed</Text>
							{speed()}
						</View>
						<Divider style={styles.divider} color={theme.brand} width={3} />
						<View style={styles.statBlockRow}>
							<View style={styles.statStack}>
								<Text style={styles.statLabel}>STR</Text>
								<Text style={styles.statTxt}>{selectedMonster?.strength}</Text>
							</View>
							<View style={styles.statStack}>
								<Text style={styles.statLabel}>DEX</Text>
								<Text style={styles.statTxt}>{selectedMonster?.dexterity}</Text>
							</View>
							<View style={styles.statStack}>
								<Text style={styles.statLabel}>CON</Text>
								<Text style={styles.statTxt}>
									{selectedMonster?.constitution}
								</Text>
							</View>
							<View style={styles.statStack}>
								<Text style={styles.statLabel}>INT</Text>
								<Text style={styles.statTxt}>
									{selectedMonster?.intelligence}
								</Text>
							</View>
							<View style={styles.statStack}>
								<Text style={styles.statLabel}>WIS</Text>
								<Text style={styles.statTxt}>{selectedMonster?.wisdom}</Text>
							</View>
							<View style={styles.statStack}>
								<Text style={styles.statLabel}>CHA</Text>
								<Text style={styles.statTxt}>{selectedMonster?.charisma}</Text>
							</View>
						</View>
						<Divider style={styles.divider} color={theme.brand} width={3} />
						<View style={styles.statRow}>
							<Text style={styles.statLabel}>Saving Throws</Text>
							{selectedMonster?.strength_save && (
								<Text
									style={[styles.statTxt, styles.hspace]}
								>{`STR +${selectedMonster?.strength_save};`}</Text>
							)}
							{selectedMonster?.dexterity_save && (
								<Text
									style={[styles.statTxt, styles.hspace]}
								>{`DEX +${selectedMonster?.dexterity_save};`}</Text>
							)}
							{selectedMonster?.constitution_save && (
								<Text
									style={[styles.statTxt, styles.hspace]}
								>{`CON +${selectedMonster?.constitution_save};`}</Text>
							)}
							{selectedMonster?.intelligence_save && (
								<Text
									style={[styles.statTxt, styles.hspace]}
								>{`INT +${selectedMonster?.intelligence_save};`}</Text>
							)}
							{selectedMonster?.wisdom_save && (
								<Text
									style={[styles.statTxt, styles.hspace]}
								>{`WIS +${selectedMonster?.wisdom_save};`}</Text>
							)}
							{selectedMonster?.charisma_save && (
								<Text
									style={[styles.statTxt, styles.hspace]}
								>{`CHA +${selectedMonster?.charisma_save};`}</Text>
							)}
						</View>
						{selectedMonster?.skills && (
							<View style={styles.statRow}>
								<Text style={styles.statLabel}>Skills</Text>
								{skills()}
							</View>
						)}
						{selectedMonster?.damage_vulnerabilities && (
							<View style={styles.statRow}>
								<Text style={styles.statLabel}>Vulnerabilities</Text>
								<Text style={styles.statTxt}>
									{capitalizeWords(selectedMonster?.damage_vulnerabilities)}
								</Text>
							</View>
						)}
						{selectedMonster?.damage_resistances && (
							<View style={styles.statRow}>
								<Text style={styles.statLabel}>Resistances</Text>
								<Text style={styles.statTxt}>
									{capitalizeWords(selectedMonster?.damage_resistances)}
								</Text>
							</View>
						)}
						{(selectedMonster?.damage_immunities ||
							selectedMonster?.condition_immunities) && (
							<View style={styles.statRow}>
								<Text style={styles.statLabel}>Immunities</Text>
								<Text style={styles.statTxt}>
									{selectedMonster?.damage_immunities &&
										capitalizeWords(selectedMonster?.damage_immunities)}
									{selectedMonster?.condition_immunities &&
										capitalizeWords(selectedMonster?.condition_immunities)}
								</Text>
							</View>
						)}
						{selectedMonster?.senses && (
							<View style={styles.statRow}>
								<Text style={styles.statLabel}>Senses</Text>
								<Text style={styles.statTxt}>{selectedMonster?.senses}</Text>
							</View>
						)}
						{selectedMonster?.languages && (
							<View style={styles.statRow}>
								<Text style={styles.statLabel}>Languages</Text>
								<Text style={styles.statTxt}>{selectedMonster?.languages}</Text>
							</View>
						)}
						<View style={styles.statRow}>
							<Text style={styles.statLabel}>Challenge</Text>
							<Text
								style={styles.statTxt}
							>{`${selectedMonster?.challenge_rating}`}</Text>
						</View>
						<Divider style={styles.divider} color={theme.brand} width={3} />
					</View>
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionLabel}>Abilities</Text>
						{selectedMonster?.special_abilities?.map((ability) => (
							<View key={ability.name} style={styles.traitRow}>
								<Text style={styles.statLabel}>{ability.name}</Text>
								<Text style={styles.statTxt}>{ability.desc}</Text>
							</View>
						))}
					</View>
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionLabel}>Actions</Text>
						{selectedMonster?.actions?.map((action) => (
							<View key={action.name} style={styles.traitRow}>
								<Text style={styles.statLabel}>{action.name}</Text>
								<Text style={styles.statTxt}>{action.desc}</Text>
							</View>
						))}
					</View>
					{selectedMonster?.bonus_actions && (
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionLabel}>Bonus Actions</Text>
							{selectedMonster?.bonus_actions?.map((action) => (
								<View key={action.name} style={styles.traitRow}>
									<Text style={styles.statLabel}>{action.name}</Text>
									<Text style={styles.statTxt}>{action.desc}</Text>
								</View>
							))}
						</View>
					)}
					{selectedMonster?.legendary_actions && (
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionLabel}>Legendary Actions</Text>
							<Text style={[styles.legendaryDesc, styles.statTxt]}>
								{selectedMonster?.legendary_desc}
							</Text>
							{selectedMonster?.legendary_actions?.map((action) => (
								<View key={action.name} style={styles.traitRow}>
									<Text style={styles.statLabel}>{action.name}</Text>
									<Text style={styles.statTxt}>{action.desc}</Text>
								</View>
							))}
						</View>
					)}
					{selectedMonster?.reactions && (
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionLabel}>Reactions</Text>
							{selectedMonster?.reactions?.map((reaction) => (
								<View key={reaction.name} style={styles.traitRow}>
									<Text style={styles.statLabel}>{reaction.name}</Text>
									<Text style={styles.statTxt}>{reaction.desc}</Text>
								</View>
							))}
						</View>
					)}
					{selectedMonster?.environments && (
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionLabel}>Where to find</Text>
							<View style={styles.statRow}>
								{selectedMonster?.environments?.map((location) => (
									<Text key={location} style={[styles.statTxt, styles.hspace]}>
										{location}
									</Text>
								))}
							</View>
						</View>
					)}
					{selectedMonster?.desc && (
						<View style={styles.sectionContainer}>
							<Divider style={styles.divider} color={theme.brand} width={3} />
							<Text style={styles.sectionLabel}>Notes</Text>
							<Text style={styles.statTxt}>{selectedMonster?.desc}</Text>
						</View>
					)}
				</ScrollView>
				<CampaignPicker isVisible={isModalVisible} onClose={onModalClose}>
					{campaigns.length === 0 ? (
						<CampaignListItem
							variant='empty'
							onPress={() => handlePress(item, 'empty')}
						/>
					) : (
						<FlatList
							data={campaigns}
							renderItem={({ item }) => (
								<CampaignListItem
									item={item}
									onPress={() => handlePress(item)}
								/>
							)}
							keyExtractor={(item) => item._id}
						/>
					)}
				</CampaignPicker>
			</ImageBackground>
		</View>
	);
};

export default MonsterDetailScreen;
