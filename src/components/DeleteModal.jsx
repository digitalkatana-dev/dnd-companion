import { Modal, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../components/Button';

const DeleteModal = ({ visible, type, onPress, onClose }) => {
	const theme = useSelector((state) => state.theme);

	const styles = StyleSheet.create({
		canvas: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
		modalView: {
			margin: 20,
			backgroundColor: 'white',
			borderRadius: 20,
			padding: 35,
			alignItems: 'center',
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5,
		},
		header: {
			fontSize: 20,
			fontWeight: 'bold',
			marginBottom: 10,
		},
		important: {
			fontWeight: 'bold',
			color: theme.error,
		},
		action_container: {
			alignSelf: 'flex-end',
			flexDirection: 'row',
			gap: 5,
			marginTop: 10,
		},
		delete_button: {
			backgroundColor: theme.brand,
			padding: 7,
			borderRadius: 10,
		},
		cancel_button: {
			backgroundColor: theme.error,
			padding: 7,
			borderRadius: 10,
		},
		button_label: {
			color: theme.heading,
		},
	});

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.canvas}>
				<View style={styles.modalView}>
					<Text style={styles.header}>Are you sure?</Text>
					<Text>
						Are you sure you want to delete this {type} forever? This{' '}
						<Text style={styles.important}>CANNOT</Text> be undone.
					</Text>
					<View style={styles.action_container}>
						<Button
							btnStyle={styles.cancel_button}
							labelStyle={styles.button_label}
							label='Cancel'
							onPress={onClose}
						/>
						<Button
							btnStyle={styles.delete_button}
							labelStyle={styles.button_label}
							label='Delete'
							onPress={onPress}
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default DeleteModal;
