import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CampaignListScreen from '../features/campaigns/screens/CampaignListScreen';

const CampaignStack = createNativeStackNavigator();
export const CampaignNavigator = () => {
	return (
		<CampaignStack.Navigator screenOptions={{ headerShown: false }}>
			<CampaignStack.Screen
				name='CampaignList'
				component={CampaignListScreen}
			/>
		</CampaignStack.Navigator>
	);
};
