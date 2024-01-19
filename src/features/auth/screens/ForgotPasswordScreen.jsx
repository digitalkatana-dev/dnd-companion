import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

const ForgotPasswordScreen = () => {
	const theme = useSelector((state) => state.theme);

	const styles = StyleSheet.create({});

	return (
		<View>
			<Text>ForgotPasswordScreen</Text>
		</View>
	);
};

export default ForgotPasswordScreen;
