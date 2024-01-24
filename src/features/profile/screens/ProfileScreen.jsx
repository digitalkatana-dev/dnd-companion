import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

const ProfileScreen = () => {
	const theme = useSelector((state) => state.theme);

	const styles = StyleSheet.create({
		canvas: {
			flex: 1,
		},
	});

	return (
		<View style={styles.canvas}>
			<Text>ProfileScreen</Text>
		</View>
	);
};

export default ProfileScreen;
