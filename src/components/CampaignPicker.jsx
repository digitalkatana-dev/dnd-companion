import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import React from 'react';

const CampaignPicker = ({ isVisible, children, onClose }) => {
	const theme = useSelector((state) => state.theme);

	const styles = StyleSheet.create({
		modalContent: {
			height: '25%',
			width: '100%',
			backgroundColor: '#25292e',
			borderTopRightRadius: 18,
			borderTopLeftRadius: 18,
			position: 'absolute',
			bottom: 0,
		},
		titleContainer: {
			height: '16%',
			backgroundColor: '#464C55',
			borderTopRightRadius: 10,
			borderTopLeftRadius: 10,
			paddingHorizontal: 20,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		title: {
			color: '#fff',
			fontSize: 16,
		},
	});

	return (
		<Modal animationType='slide' transparent={true} visible={isVisible}>
			<View style={styles.modalContent}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Choose Campaign</Text>
					<Pressable onPress={onClose}>
						<MaterialIcons name='close' color='#fff' size={22} />
					</Pressable>
				</View>
				{children}
			</View>
		</Modal>
	);
};

export default CampaignPicker;