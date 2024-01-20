import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MonsterListScreen from '../features/monsters/screens/MonsterListScreen';
import MonsterDetailScreen from '../features/monsters/screens/MonsterDetailScreen';

const MonsterStack = createNativeStackNavigator();
export const MonsterNavigator = () => {
	return (
		<MonsterStack.Navigator screenOptions={{ headerShown: false }}>
			<MonsterStack.Screen name='MonsterList' component={MonsterListScreen} />
			<MonsterStack.Screen
				name='MonsterDetail'
				component={MonsterDetailScreen}
			/>
		</MonsterStack.Navigator>
	);
};
