import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './navigation/appNavigator';

const DNDCompanion = () => {
	return (
		<NavigationContainer>
			<AppNavigator />
		</NavigationContainer>
	);
};

export default DNDCompanion;
