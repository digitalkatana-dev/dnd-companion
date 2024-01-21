import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Divider } from '@rneui/themed';
import { useSelector } from 'react-redux';
import { capitalizeWords } from '../../../util/helpers';
import IconButton from '../../../components/IconButton';
import React from 'react';

const MonsterDetailScreen = ({ route }) => {
	const theme = useSelector((state) => state.theme);
	const { monster } = route.params;

	const speed = () => {
		const monsterSpeed = monster.speed;
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
		const monsterSkills = monster.skills;
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
			color: theme.paragraph,
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
			color: theme.paragraph,
		},
		vitals: {
			fontSize: 11,
			fontStyle: 'italic',
			color: theme.paragraph,
		},
		monsterImg: {
			width: 75,
			height: 75,
			borderWidth: 2,
			borderColor: theme.paragraph,
			borderRadius: 10,
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
			color: theme.paragraph,
		},
		statTxt: {
			fontSize: 11,
			color: theme.paragraph,
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
			color: theme.paragraph,
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

	return (
		<View style={styles.canvas}>
			<ImageBackground
				source={require('../../../../assets/parchment.jpg')}
				style={styles.background}
			>
				<View style={styles.buttonContainer}>
					<Text style={styles.buttonLabel}>Add to Campaign</Text>
					<IconButton
						icon='add-circle-outline'
						size={35}
						color={theme.paragraph}
					/>
				</View>
				<ScrollView contentContainerStyle={styles.scroll}>
					<View style={styles.statContainer}>
						<View style={styles.identityContainer}>
							<View>
								<Text style={styles.name}>{monster.name}</Text>
								<Text style={styles.vitals}>
									{`${monster.size} ${monster.type}, ${
										monster.subtype
											? `${capitalizeWords(monster.subtype)}, `
											: ''
									}${capitalizeWords(monster.alignment)} `}
								</Text>
							</View>
							{monster.img_main && (
								<Image
									style={styles.monsterImg}
									source={{ uri: monster.img_main }}
								/>
							)}
						</View>
						<Divider style={styles.divider} color={theme.paragraph} width={3} />
						<View style={styles.statRow}>
							<Text style={styles.statLabel}>Armor Class</Text>
							<Text style={styles.statTxt}>{`${monster.armor_class} ${
								monster.armor_desc ? `(${monster.armor_desc})` : ''
							}`}</Text>
						</View>
						<View style={styles.statRow}>
							<Text style={styles.statLabel}>Hit Points</Text>
							<Text
								style={styles.statTxt}
							>{`${monster.hit_points} (${monster.hit_dice})`}</Text>
						</View>
						<View style={styles.statRow}>
							<Text style={styles.statLabel}>Speed</Text>
							{speed()}
						</View>
						<Divider style={styles.divider} color={theme.paragraph} width={3} />
						<View style={styles.statBlockRow}>
							<View style={styles.statStack}>
								<Text style={styles.statLabel}>STR</Text>
								<Text style={styles.statTxt}>{monster.strength}</Text>
							</View>
							<View style={styles.statStack}>
								<Text style={styles.statLabel}>DEX</Text>
								<Text style={styles.statTxt}>{monster.dexterity}</Text>
							</View>
							<View style={styles.statStack}>
								<Text style={styles.statLabel}>CON</Text>
								<Text style={styles.statTxt}>{monster.constitution}</Text>
							</View>
							<View style={styles.statStack}>
								<Text style={styles.statLabel}>INT</Text>
								<Text style={styles.statTxt}>{monster.intelligence}</Text>
							</View>
							<View style={styles.statStack}>
								<Text style={styles.statLabel}>WIS</Text>
								<Text style={styles.statTxt}>{monster.wisdom}</Text>
							</View>
							<View style={styles.statStack}>
								<Text style={styles.statLabel}>CHA</Text>
								<Text style={styles.statTxt}>{monster.charisma}</Text>
							</View>
						</View>
						<Divider style={styles.divider} color={theme.paragraph} width={3} />
						<View style={styles.statRow}>
							<Text style={styles.statLabel}>Saving Throws</Text>
							{monster.strength_save && (
								<Text
									style={[styles.statTxt, styles.hspace]}
								>{`STR +${monster.strength_save};`}</Text>
							)}
							{monster.dexterity_save && (
								<Text
									style={[styles.statTxt, styles.hspace]}
								>{`DEX +${monster.dexterity_save};`}</Text>
							)}
							{monster.constitution_save && (
								<Text
									style={[styles.statTxt, styles.hspace]}
								>{`CON +${monster.constitution_save};`}</Text>
							)}
							{monster.intelligence_save && (
								<Text
									style={[styles.statTxt, styles.hspace]}
								>{`INT +${monster.intelligence_save};`}</Text>
							)}
							{monster.wisdom_save && (
								<Text
									style={[styles.statTxt, styles.hspace]}
								>{`WIS +${monster.wisdom_save};`}</Text>
							)}
							{monster.charisma_save && (
								<Text
									style={[styles.statTxt, styles.hspace]}
								>{`CHA +${monster.charisma_save};`}</Text>
							)}
						</View>
						{monster.skills && (
							<View style={styles.statRow}>
								<Text style={styles.statLabel}>Skills</Text>
								{skills()}
							</View>
						)}
						{monster.damage_vulnerabilities && (
							<View style={styles.statRow}>
								<Text style={styles.statLabel}>Vulnerabilities</Text>
								<Text style={styles.statTxt}>
									{capitalizeWords(monster.damage_vulnerabilities)}
								</Text>
							</View>
						)}
						{monster.damage_resistances && (
							<View style={styles.statRow}>
								<Text style={styles.statLabel}>Resistances</Text>
								<Text style={styles.statTxt}>
									{capitalizeWords(monster.damage_resistances)}
								</Text>
							</View>
						)}
						{(monster.damage_immunities || monster.condition_immunities) && (
							<View style={styles.statRow}>
								<Text style={styles.statLabel}>Immunities</Text>
								<Text style={styles.statTxt}>
									{monster.damage_immunities &&
										capitalizeWords(monster.damage_immunities)}
									{monster.condition_immunities &&
										capitalizeWords(monster.condition_immunities)}
								</Text>
							</View>
						)}
						{monster.senses && (
							<View style={styles.statRow}>
								<Text style={styles.statLabel}>Senses</Text>
								<Text style={styles.statTxt}>{monster.senses}</Text>
							</View>
						)}
						{monster.languages && (
							<View style={styles.statRow}>
								<Text style={styles.statLabel}>Languages</Text>
								<Text style={styles.statTxt}>{monster.languages}</Text>
							</View>
						)}
						<View style={styles.statRow}>
							<Text style={styles.statLabel}>Challenge</Text>
							<Text
								style={styles.statTxt}
							>{`${monster.challenge_rating}`}</Text>
						</View>
						<Divider style={styles.divider} color={theme.paragraph} width={3} />
					</View>
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionLabel}>Abilities</Text>
						{monster.special_abilities?.map((ability) => (
							<View key={ability.name} style={styles.traitRow}>
								<Text style={styles.statLabel}>{ability.name}</Text>
								<Text style={styles.statTxt}>{ability.desc}</Text>
							</View>
						))}
					</View>
					<View style={styles.sectionContainer}>
						<Text style={styles.sectionLabel}>Actions</Text>
						{monster.actions?.map((action) => (
							<View key={action.name} style={styles.traitRow}>
								<Text style={styles.statLabel}>{action.name}</Text>
								<Text style={styles.statTxt}>{action.desc}</Text>
							</View>
						))}
					</View>
					{monster.bonus_actions && (
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionLabel}>Bonus Actions</Text>
							{monster.bonus_actions?.map((action) => (
								<View key={action.name} style={styles.traitRow}>
									<Text style={styles.statLabel}>{action.name}</Text>
									<Text style={styles.statTxt}>{action.desc}</Text>
								</View>
							))}
						</View>
					)}
					{monster.legendary_actions && (
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionLabel}>Legendary Actions</Text>
							<Text style={[styles.legendaryDesc, styles.statTxt]}>
								{monster.legendary_desc}
							</Text>
							{monster.legendary_actions?.map((action) => (
								<View key={action.name} style={styles.traitRow}>
									<Text style={styles.statLabel}>{action.name}</Text>
									<Text style={styles.statTxt}>{action.desc}</Text>
								</View>
							))}
						</View>
					)}
					{monster.reactions && (
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionLabel}>Reactions</Text>
							{monster.reactions?.map((reaction) => (
								<View key={reaction.name} style={styles.traitRow}>
									<Text style={styles.statLabel}>{reaction.name}</Text>
									<Text style={styles.statTxt}>{reaction.desc}</Text>
								</View>
							))}
						</View>
					)}
					{monster.environments && (
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionLabel}>Where to find</Text>
							<View style={styles.statRow}>
								{monster.environments?.map((location) => (
									<Text key={location} style={[styles.statTxt, styles.hspace]}>
										{location}
									</Text>
								))}
							</View>
						</View>
					)}
					{monster.desc && (
						<View style={styles.sectionContainer}>
							<Divider
								style={styles.divider}
								color={theme.paragraph}
								width={3}
							/>
							<Text style={styles.sectionLabel}>Notes</Text>
							<Text style={styles.statTxt}>{monster.desc}</Text>
						</View>
					)}
				</ScrollView>
			</ImageBackground>
		</View>
	);
};

export default MonsterDetailScreen;
