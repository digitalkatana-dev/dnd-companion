import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../features/auth/screens/AuthScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';

const AuthStack = createNativeStackNavigator();
export const AuthNavigator = () => {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }}>
			<AuthStack.Screen name='Auth' component={AuthScreen} />
			<AuthStack.Screen
				name='ForgotPassword'
				component={ForgotPasswordScreen}
			/>
		</AuthStack.Navigator>
	);
};
