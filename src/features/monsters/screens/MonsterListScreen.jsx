import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

const MonsterListScreen = () => {
	const theme = useSelector((state) => state.theme);

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
	});

	return (
		<View style={styles.canvas}>
			<ImageBackground
				source={require('../../../../assets/parchment-dark.png')}
				style={styles.background}
			></ImageBackground>
		</View>
	);
};

export default MonsterListScreen;
