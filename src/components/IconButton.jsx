import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

const IconButton = ({ children, label, onPress }) => {
	return (
		<TouchableOpacity style={styles.iconButton} onPress={onPress}>
			{children}
			{label && <Text style={styles.iconButtonLabel}>{label}</Text>}
		</TouchableOpacity>
	);
};

export default IconButton;

const styles = StyleSheet.create({
	iconButton: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconButtonLabel: {
		color: '#fff',
		marginTop: 12,
	},
});
