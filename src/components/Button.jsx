import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

const Button = ({ loading, btnStyle, label, labelStyle, onPress }) => {
	const theme = useSelector((state) => state.theme);

	const styles = StyleSheet.create({
		buttonContainer: {},
	});

	return (
		<View style={styles.buttonContainer}>
			<TouchableOpacity style={btnStyle} onPress={onPress}>
				<Text style={labelStyle}>{label}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Button;
