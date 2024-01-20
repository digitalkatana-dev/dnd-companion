import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

const Button = ({ variant, label, onPress }) => {
	const theme = useSelector((state) => state.theme);

	const styles = StyleSheet.create({
		buttonLabel: {
			color: 'brown',
			fontFamily: 'Creepster_400Regular',
			fontSize: 20,
			marginVertical: 5,
			textAlign: 'center',
		},
	});

	return (
		<View style={styles.buttonContainer}>
			<Pressable style={styles.button} onPress={onPress}>
				<Text style={styles.buttonLabel}>{label}</Text>
			</Pressable>
		</View>
	);
};

export default Button;
