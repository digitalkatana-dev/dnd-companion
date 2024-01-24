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

const AuthScreen = () => {
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

	const handleAuthType = () => {
		setAuthType(authType === 'login' ? 'register' : 'login');
		dispatch(clearForm());
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
			maxHeight: authType === 'login' ? 130 : 320,
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
		},
		toggleTxt: {
			color: theme.heading,
		},
	});

	return (
		<View style={styles.canvas}>
			<ImageBackground
				source={require('../../../../assets/doors_of_durin.jpg')}
				style={styles.background}
			>
				<Text style={styles.quote}>Speak friend...</Text>
				<ScrollView style={styles.scroll}>
					{authType === 'register' && (
						<>
							<TextInput
								placeholder='First Name'
								style={styles.input}
								value={firstName}
								onChangeText={(text) => handleChange('first', text)}
								onFocus={handleFocus}
							/>
							<TextInput
								placeholder='Last Name'
								style={styles.input}
								value={lastName}
								onChangeText={(text) => handleChange('last', text)}
								onFocus={handleFocus}
							/>
							<TextInput
								placeholder='Handle'
								style={styles.input}
								value={handle}
								onChangeText={(text) => handleChange('handle', text)}
								onFocus={handleFocus}
							/>
							<TextInput
								keyboardType='email-address'
								placeholder='Email'
								style={styles.input}
								value={email}
								onChangeText={(text) => handleChange('email', text)}
								onFocus={handleFocus}
							/>
						</>
					)}
					{authType === 'login' && (
						<TextInput
							placeholder='Login'
							style={styles.input}
							value={login}
							onChangeText={(text) => handleChange('login', text)}
							onFocus={handleFocus}
						/>
					)}
					<TextInput
						secureTextEntry={true}
						placeholder='Password'
						style={styles.input}
						value={password}
						onChangeText={(text) => handleChange('pass', text)}
						onFocus={handleFocus}
					/>
				</ScrollView>
				<Text style={styles.quote}>And...</Text>
				<View style={styles.buttonContainer}>
					<Button variant='auth' label='Enter Here' onPress={handleSubmit} />
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
						<Button variant='toggle' label='here' onPress={handleAuthType} />
					</View>
				</View>
			</ImageBackground>
		</View>
	);
};

export default AuthScreen;
