import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import IconButton from '../../../components/IconButton';
import React from 'react';

const MonsterDetailScreen = ({ route }) => {
	const theme = useSelector((state) => state.theme);
	const { monster } = route.params;

	const styles = StyleSheet.create({
		canvas: {
			flex: 1,
			flexDirection: 'column',
		},
		background: {
			flex: 1,
			resizeMode: 'cover',
			// justifyContent: 'center',
		},
		buttonContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			alignSelf: 'flex-end',
			marginVertical: 5,
			marginRight: 5,
			gap: 5,
		},
		buttonLabel: {
			color: theme.paragraph,
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
			</ImageBackground>
		</View>
	);
};

export default MonsterDetailScreen;
