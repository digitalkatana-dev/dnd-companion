import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../features/auth/screens/AuthScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../features/auth/screens/ResetPasswordScreen';

const AuthStack = createNativeStackNavigator();
export const AuthNavigator = () => {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }}>
			<AuthStack.Screen name='Auth' component={AuthScreen} />
			<AuthStack.Screen
				name='ForgotPassword'
				component={ForgotPasswordScreen}
			/>
			<AuthStack.Screen name='ResetPassword' component={ResetPasswordScreen} />
		</AuthStack.Navigator>
	);
};
