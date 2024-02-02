import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MonsterListScreen from '../features/monsters/screens/MonsterListScreen';
import MonsterDetailScreen from '../features/monsters/screens/MonsterDetailScreen';

const MonsterStack = createNativeStackNavigator();
export const MonsterNavigator = () => {
	return (
		<MonsterStack.Navigator
			screenOptions={{ headerShown: false, gestureEnabled: false }}
		>
			<MonsterStack.Screen
				name='MonsterList'
				component={MonsterListScreen}
				options={{ gestureEnabled: false }}
			/>
			<MonsterStack.Screen
				name='MonsterDetail'
				component={MonsterDetailScreen}
				options={{ gestureEnabled: false }}
			/>
		</MonsterStack.Navigator>
	);
};
