import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Input as TextInput, Icon } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setPassword,
	resetWithToken,
	clearErrors,
} from '../../../redux/slices/userSlice';
import Button from '../../../components/Button';

const ResetPasswordScreen = ({ navigation }) => {
	const theme = useSelector((state) => state.theme);
	const { password, resetToken, success, errors } = useSelector(
		(state) => state.user
	);
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (text) => {
		dispatch(setPassword(text));
	};

	const handleSubmit = () => {
		const data = {
			token: resetToken,
			password,
		};

		dispatch(resetWithToken(data));
	};

	const handleSuccess = useCallback(() => {
		if (success && success == 'Password Upated Successfully!') {
			setTimeout(() => {
				navigation.navigate('Auth');
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
			color: theme.neutral,
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
		inputContainer: {
			height: 40,
			margin: 12,
			backgroundColor: 'lightgrey',
			borderRadius: 20,
			padding: 10,
		},
		input: {
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
			color: theme.neutral,
			fontFamily: 'Creepster_400Regular',
			fontSize: 15,
			marginVertical: 5,
			textAlign: 'center',
		},
		input_error: {
			color: theme.error,
			alignSelf: 'center',
			fontWeight: 'bold',
			borderRadius: 20,
		},
		error_background: {
			backgroundColor: 'rgba(0,0,0,.7)',
			paddingVertical: 3,
			paddingHorizontal: 5,
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
				<Text style={styles.quote}>Reset Password</Text>
				<View style={styles.icon_container}>
					<MaterialIcons name='lock-reset' size={55} style={styles.icon} />
				</View>
				<>
					<View style={styles.formControl}>
						<TextInput
							secureTextEntry={show ? false : true}
							placeholder='Password'
							autoCapitalize='none'
							inputContainerStyle={styles.inputContainer}
							inputStyle={styles.input}
							value={password}
							onChangeText={handleChange}
							onFocus={handleFocus}
							rightIcon={
								<Icon
									name={show ? 'visibility-off' : 'visibility'}
									type='material'
									size={20}
									onPress={() => setShow(!show)}
								/>
							}
							errorMessage={errors?.password}
							renderErrorMessage={false}
							errorStyle={
								errors?.password
									? [styles.input_error, styles.error_background]
									: styles.input_error
							}
						/>
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

export default ResetPasswordScreen;
