import {
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setEmail,
	generatePasswordToken,
	clearErrors,
} from '../../../redux/slices/userSlice';
import Button from '../../../components/Button';

const ForgotPasswordScreen = ({ navigation }) => {
	const theme = useSelector((state) => state.theme);
	const { email, success, errors } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (text) => {
		dispatch(setEmail(text));
	};

	const handleSubmit = () => {
		const data = {
			email,
		};

		dispatch(generatePasswordToken(data));
	};

	const handleSuccess = useCallback(() => {
		if (success && success == 'Token generated successfully!') {
			setTimeout(() => {
				navigation.navigate('ResetPassword');
			}, 5000);
		}
	}, [success, navigation]);

	useEffect(() => {
		handleSuccess();
	}, [handleSuccess]);

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
		quote: {
			fontFamily: 'Creepster_400Regular',
			fontSize: 50,
			color: theme.heading,
			textAlign: 'center',
		},
		icon_container: {
			alignItems: 'center',
			paddingVertical: 5,
		},
		icon: {
			color: theme.highlight,
			backgroundColor: 'rgba(0,0,0,.7)',
			borderRadius: 50,
			padding: 7,
		},
		formControl: {
			flexDirection: 'column',
		},
		input: {
			height: 40,
			margin: 12,
			backgroundColor: 'lightgrey',
			borderRadius: 20,
			padding: 10,
			textAlign: 'center',
		},
		buttonContainer: {
			marginVertical: 20,
			paddingHorizontal: 20,
		},
		auth_btn_style: {
			marginVertical: theme.spacing,
			borderRadius: 20,
			elevation: 10,
			backgroundColor: theme.secondary,
			borderWidth: 1,
			borderColor: 'steelblue',
		},
		auth_btn_label: {
			color: theme.heading,
			fontFamily: 'Creepster_400Regular',
			fontSize: 15,
			marginVertical: 5,
			textAlign: 'center',
		},
		errorContainer: {
			alignItems: 'center',
		},
		error: {
			color: theme.error,
			fontWeight: 'bold',
			backgroundColor: 'rgba(0,0,0,.7)',
			paddingHorizontal: 10,
			paddingVertical: 2.5,
			borderRadius: 20,
		},
	});

	return (
		<View style={styles.canvas}>
			<ImageBackground
				source={require('../../../../assets/doors_of_durin.jpg')}
				style={styles.background}
			>
				<Text style={styles.quote}>Forgot Password</Text>
				<View style={styles.icon_container}>
					<FontAwesome5 name='question-circle' size={55} style={styles.icon} />
				</View>
				<>
					<View style={styles.formControl}>
						<TextInput
							keyboardType='email-address'
							placeholder='Email'
							style={styles.input}
							value={email}
							onChangeText={handleChange}
							onFocus={handleFocus}
						/>
						{errors?.email && (
							<View style={styles.errorContainer}>
								<Text style={styles.error}>{errors?.email}</Text>
							</View>
						)}
					</View>
				</>
				<View style={styles.buttonContainer}>
					<Button
						btnStyle={styles.auth_btn_style}
						labelStyle={styles.auth_btn_label}
						label='Submit'
						onPress={handleSubmit}
					/>
					{errors?.message && (
						<View style={styles.errorContainer}>
							<Text style={styles.error}>{errors?.message}</Text>
						</View>
					)}
				</View>
			</ImageBackground>
		</View>
	);
};

export default ForgotPasswordScreen;
