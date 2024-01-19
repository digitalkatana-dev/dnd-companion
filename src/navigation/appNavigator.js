import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { TabNavigator } from './tabNavigator';
import { AuthNavigator } from './authNavigator';
import Header from '../components/Header';

const AppStack = createNativeStackNavigator();
export const AppNavigator = () => {
	const { user } = useSelector((state) => state.user);

	const createScreenOptions = () => {
		return {
			header: ({ route, navigation }) => (
				<Header route={route} navigation={navigation} />
			),
		};
	};

	return (
		<AppStack.Navigator screenOptions={createScreenOptions}>
			{user ? (
				<AppStack.Screen name='UserStack' component={TabNavigator} />
			) : (
				<AppStack.Screen name='AuthStack' component={AuthNavigator} />
			)}
		</AppStack.Navigator>
	);
};
