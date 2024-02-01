import {
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Input as TextInput, Icon } from '@rneui/themed';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	register,
	userLogin,
	setFirstName,
	setLastName,
	setHandle,
	setEmail,
	setLogin,
	setPassword,
	clearForm,
	clearErrors,
} from '../../../redux/slices/userSlice';
import Button from '../../../components/Button';

const AuthScreen = ({ navigation }) => {
	const theme = useSelector((state) => state.theme);
	const {
		loading,
		firstName,
		lastName,
		handle,
		email,
		login,
		password,
		errors,
	} = useSelector((state) => state.user);
	const [authType, setAuthType] = useState('login');
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	let maxHeight;

	const handleAuthType = () => {
		setAuthType(authType === 'login' ? 'register' : 'login');
		dispatch(clearForm());
		dispatch(clearErrors());
	};

	const handleFocus = () => {
		dispatch(clearErrors());
	};

	const handleChange = (input, value) => {
		const actionMap = {
			first: setFirstName,
			last: setLastName,
			handle: setHandle,
			email: setEmail,
			login: setLogin,
			pass: setPassword,
		};

		const action = actionMap[input];

		action && dispatch(action(value));
	};

	const handleSubmit = () => {
		let data;

		if (authType === 'login') {
			data = {
				login,
				password,
			};

			dispatch(userLogin(data));
		} else if (authType === 'register') {
			data = {
				firstName,
				lastName,
				handle,
				email,
				password,
			};

			dispatch(register(data));
		}
	};

	const handleForgot = () => {
		navigation.navigate('ForgotPassword');
	};

	if (authType === 'login') {
		if (errors?.login || errors?.password) {
			maxHeight = 195;
		} else {
			maxHeight = 130;
		}
	} else if (authType === 'register') {
		if (
			errors?.firstName ||
			errors?.lastName ||
			errors?.handle ||
			errors?.email ||
			errors?.password
		) {
			maxHeight = 480;
		} else {
			maxHeight = 320;
		}
	}

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
		scroll: {
			maxHeight: maxHeight,
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
		},
		buttonContainer: {
			marginVertical: 20,
			paddingHorizontal: 20,
		},
		authToggleContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			alignSelf: 'center',
			backgroundColor: 'rgba(0,0,0,.7)',
			paddingHorizontal: 10,
			paddingVertical: 5,
			borderRadius: 20,
			marginVertical: 5,
		},
		toggleTxt: {
			color: theme.neutral,
		},
		toggle_btn_label: {
			color: theme.error,
			fontWeight: 'bold',
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
		link_btn: {
			alignSelf: 'center',
			backgroundColor: 'rgba(0,0,0,.8)',
			paddingHorizontal: 10,
			paddingVertical: 5,
			borderRadius: 20,
			marginVertical: 5,
		},
		link_label: {
			color: theme.highlight,
			fontWeight: 'bold',
		},
		input_error: {
			color: theme.error,
			alignSelf: 'center',
			fontWeight: 'bold',
			backgroundColor: 'rgba(0,0,0,.7)',
			borderRadius: 20,
			padding: 3,
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
				<Text style={styles.quote}>Speak friend...</Text>
				<View style={styles.authToggleContainer}>
					{authType === 'login' ? (
						<Text style={styles.toggleTxt}>Need and account? Register </Text>
					) : (
						authType === 'register' && (
							<Text style={styles.toggleTxt}>
								Already have an account? Login{' '}
							</Text>
						)
					)}
					<Button
						labelStyle={styles.toggle_btn_label}
						label='here'
						onPress={handleAuthType}
					/>
				</View>
				<ScrollView style={styles.scroll}>
					{authType === 'register' && (
						<>
							<View style={styles.formControl}>
								<TextInput
									placeholder='First Name'
									inputContainerStyle={styles.input}
									inputStyle={{ textAlign: 'center' }}
									value={firstName}
									onChangeText={(text) => handleChange('first', text)}
									onFocus={handleFocus}
									errorMessage={errors?.firstName}
									renderErrorMessage={false}
									errorStyle={styles.input_error}
								/>
							</View>
							<View style={styles.formControl}>
								<TextInput
									placeholder='Last Name'
									inputContainerStyle={styles.input}
									inputStyle={{ textAlign: 'center' }}
									value={lastName}
									onChangeText={(text) => handleChange('last', text)}
									onFocus={handleFocus}
									errorMessage={errors?.lastName}
									renderErrorMessage={false}
									errorStyle={styles.input_error}
								/>
							</View>
							<View style={styles.formControl}>
								<TextInput
									placeholder='Handle'
									inputContainerStyle={styles.input}
									inputStyle={{ textAlign: 'center' }}
									value={handle}
									onChangeText={(text) => handleChange('handle', text)}
									onFocus={handleFocus}
									errorMessage={errors?.handle}
									renderErrorMessage={false}
									errorStyle={styles.input_error}
								/>
							</View>
							<View style={styles.formControl}>
								<TextInput
									keyboardType='email-address'
									placeholder='Email'
									inputContainerStyle={styles.input}
									inputStyle={{ textAlign: 'center' }}
									value={email}
									onChangeText={(text) => handleChange('email', text)}
									onFocus={handleFocus}
									errorMessage={errors?.email}
									renderErrorMessage={false}
									errorStyle={styles.input_error}
								/>
							</View>
						</>
					)}
					{authType === 'login' && (
						<View style={styles.formControl}>
							<TextInput
								placeholder='Login'
								inputContainerStyle={styles.input}
								inputStyle={{ textAlign: 'center' }}
								value={login}
								onChangeText={(text) => handleChange('login', text)}
								onFocus={handleFocus}
								errorMessage={errors?.login}
								renderErrorMessage={false}
								errorStyle={styles.input_error}
							/>
						</View>
					)}
					<View style={styles.formControl}>
						<TextInput
							secureTextEntry={show ? false : true}
							placeholder='Password'
							inputContainerStyle={styles.input}
							inputStyle={{ textAlign: 'center' }}
							value={password}
							onChangeText={(text) => handleChange('pass', text)}
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
							errorStyle={styles.input_error}
						/>
					</View>
				</ScrollView>
				<Text style={styles.quote}>And...</Text>
				<View style={styles.buttonContainer}>
					<Button
						btnStyle={styles.auth_btn_style}
						labelStyle={styles.auth_btn_label}
						label='Enter Here'
						onPress={handleSubmit}
					/>
					{errors?.message && (
						<View style={styles.errorContainer}>
							<Text style={styles.error}>{errors?.message}</Text>
						</View>
					)}
					{authType === 'login' && (
						<Button
							btnStyle={styles.link_btn}
							labelStyle={styles.link_label}
							label='Forgot Password'
							onPress={handleForgot}
						/>
					)}
				</View>
			</ImageBackground>
		</View>
	);
};

export default AuthScreen;
