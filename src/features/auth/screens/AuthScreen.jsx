import {
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
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
			maxHeight = 190;
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
			maxHeight = 445;
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
			color: theme.heading,
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
			textAlign: 'center',
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
			color: theme.heading,
		},
		toggle_btn_label: {
			color: theme.error,
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
									style={styles.input}
									value={firstName}
									onChangeText={(text) => handleChange('first', text)}
									onFocus={handleFocus}
								/>
								{errors?.firstName && (
									<View style={styles.errorContainer}>
										<Text style={styles.error}>{errors?.firstName}</Text>
									</View>
								)}
							</View>
							<View style={styles.formControl}>
								<TextInput
									placeholder='Last Name'
									style={styles.input}
									value={lastName}
									onChangeText={(text) => handleChange('last', text)}
									onFocus={handleFocus}
								/>
								{errors?.lastName && (
									<View style={styles.errorContainer}>
										<Text style={styles.error}>{errors?.lastName}</Text>
									</View>
								)}
							</View>
							<View style={styles.formControl}>
								<TextInput
									placeholder='Handle'
									style={styles.input}
									value={handle}
									onChangeText={(text) => handleChange('handle', text)}
									onFocus={handleFocus}
								/>
								{errors?.handle && (
									<View style={styles.errorContainer}>
										<Text style={styles.error}>{errors?.handle}</Text>
									</View>
								)}
							</View>
							<View style={styles.formControl}>
								<TextInput
									keyboardType='email-address'
									placeholder='Email'
									style={styles.input}
									value={email}
									onChangeText={(text) => handleChange('email', text)}
									onFocus={handleFocus}
								/>
								{errors?.email && (
									<View style={styles.errorContainer}>
										<Text style={styles.error}>{errors?.email}</Text>
									</View>
								)}
							</View>
						</>
					)}
					{authType === 'login' && (
						<View style={styles.formControl}>
							<TextInput
								placeholder='Login'
								style={styles.input}
								value={login}
								onChangeText={(text) => handleChange('login', text)}
								onFocus={handleFocus}
							/>
							{errors?.login && (
								<View style={styles.errorContainer}>
									<Text style={styles.error}>{errors?.login}</Text>
								</View>
							)}
						</View>
					)}
					<View style={styles.formControl}>
						<TextInput
							secureTextEntry={true}
							placeholder='Password'
							style={styles.input}
							value={password}
							onChangeText={(text) => handleChange('pass', text)}
							onFocus={handleFocus}
						/>
						{errors?.password && (
							<View style={styles.errorContainer}>
								<Text style={styles.error}>{errors?.password}</Text>
							</View>
						)}
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
