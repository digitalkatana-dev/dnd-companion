import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

const AuthScreen = () => {
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
				source={require('../../../../assets/doors_of_durin.jpg')}
				style={styles.background}
			></ImageBackground>
		</View>
	);
};

export default AuthScreen;
