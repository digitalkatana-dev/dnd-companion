import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../features/profile/screens/ProfileScreen';

const ProfileStack = createNativeStackNavigator();
export const ProfileNavigator = () => {
	return (
		<ProfileStack.Navigator screenOptions={{ headerShown: false }}>
			<ProfileStack.Screen name='ProfileScreen' component={ProfileScreen} />
		</ProfileStack.Navigator>
	);
};
