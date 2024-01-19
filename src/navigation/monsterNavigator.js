import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MonsterListScreen from '../features/monsters/screens/MonsterListScreen';

const MonsterStack = createNativeStackNavigator();
export const MonsterNavigator = () => {
	return (
		<MonsterStack.Navigator screenOptions={{ headerShown: false }}>
			<MonsterStack.Screen name='MonsterList' component={MonsterListScreen} />
		</MonsterStack.Navigator>
	);
};
