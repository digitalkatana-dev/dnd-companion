import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CampaignListScreen from '../features/campaigns/screens/CampaignListScreen';
import CampaignDetailsScreen from '../features/campaigns/screens/CampaignDetailsScreen';
import CampaignMonsterScreen from '../features/campaigns/screens/CampaignMonsterScreen';

const CampaignStack = createNativeStackNavigator();
export const CampaignNavigator = () => {
	return (
		<CampaignStack.Navigator
			screenOptions={{ headerShown: false, gestureEnabled: false }}
		>
			<CampaignStack.Screen
				name='CampaignList'
				component={CampaignListScreen}
			/>
			<CampaignStack.Screen
				name='CampaignDetails'
				component={CampaignDetailsScreen}
			/>
			<CampaignStack.Screen
				name='CampaignMonster'
				component={CampaignMonsterScreen}
			/>
		</CampaignStack.Navigator>
	);
};
