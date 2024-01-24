import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

const Button = ({ variant, loading, btnStyle, label, labelStyle, onPress }) => {
	const theme = useSelector((state) => state.theme);

	const styles = StyleSheet.create({
		button: {
			backgroundColor: theme.brand,
			marginVertical: theme.spacing,
			borderRadius: 20,
			elevation: 10,
		},
		buttonLabel: {
			color: theme.heading,
			fontFamily: 'Creepster_400Regular',
			fontSize: 20,
			marginVertical: 5,
			textAlign: 'center',
		},
		variant_Txt_btn: {
			marginVertical: theme.spacing,
			borderRadius: 20,
			elevation: 10,
		},
		variant_Txt_label: {
			color: theme.brand,
			fontFamily: 'Creepster_400Regular',
			fontSize: 20,
			// marginVertical: 5,
			textAlign: 'center',
		},
		variant_Auth_btn: {
			marginVertical: theme.spacing,
			borderRadius: 20,
			elevation: 10,
			backgroundColor: theme.secondary,
			borderWidth: 1,
			borderColor: 'steelblue',
		},
		variant_Auth_label: {
			color: theme.heading,
			fontFamily: 'Creepster_400Regular',
			fontSize: 15,
			marginVertical: 5,
			textAlign: 'center',
		},
		variant_Togg_btn: {},
		variant_Togg_label: {
			color: theme.error,
		},
	});

	if (variant === 'text') {
		return (
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[styles.variant_Txt_btn, btnStyle]}
					onPress={onPress}
				>
					<Text style={[styles.variant_Txt_label, labelStyle]}>{label}</Text>
				</TouchableOpacity>
			</View>
		);
	} else if (variant === 'auth') {
		return (
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[styles.variant_Auth_btn, btnStyle]}
					onPress={onPress}
				>
					<Text style={[styles.variant_Auth_label, labelStyle]}>{label}</Text>
				</TouchableOpacity>
			</View>
		);
	} else if (variant === 'toggle') {
		return (
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[styles.variant_Togg_btn, btnStyle]}
					onPress={onPress}
				>
					<Text style={[styles.variant_Togg_label, labelStyle]}>{label}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.buttonContainer}>
			<TouchableOpacity style={[styles.button, btnStyle]} onPress={onPress}>
				<Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Button;
