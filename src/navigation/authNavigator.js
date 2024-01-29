import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccess } from '../redux/slices/userSlice';
import AuthScreen from '../features/auth/screens/AuthScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../features/auth/screens/ResetPasswordScreen';

const AuthStack = createNativeStackNavigator();
export const AuthNavigator = () => {
	const theme = useSelector((state) => state.theme);
	const { success } = useSelector((state) => state.user);
	const [isVisible, setIsVisible] = useState(false);
	const dispatch = useDispatch();

	const dismissSnackBar = () => {
		setIsVisible(false);
	};

	const handleSuccess = useCallback(() => {
		if (success) {
			setIsVisible(true);

			setTimeout(() => {
				dispatch(clearSuccess());
				setIsVisible(false);
			}, 4000);
		}
	}, [success, dispatch]);

	useEffect(() => {
		handleSuccess();
	}, [handleSuccess]);

	const styles = StyleSheet.create({
		alert: {
			backgroundColor: theme.highlight,
		},
	});

	return (
		<>
			<AuthStack.Navigator screenOptions={{ headerShown: false }}>
				<AuthStack.Screen name='Auth' component={AuthScreen} />
				<AuthStack.Screen
					name='ForgotPassword'
					component={ForgotPasswordScreen}
				/>
				<AuthStack.Screen
					name='ResetPassword'
					component={ResetPasswordScreen}
				/>
			</AuthStack.Navigator>
			<Snackbar
				visible={isVisible}
				onDismiss={dismissSnackBar}
				style={styles.alert}
			>
				{success && success}
			</Snackbar>
		</>
	);
};
