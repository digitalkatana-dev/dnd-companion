import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Fontisto } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { MonsterNavigator } from './monsterNavigator';
import { CampaignNavigator } from './campaignNavigator';
import { ProfileNavigator } from './profileNavigator';

const AppTabs = createBottomTabNavigator();
export const TabNavigator = () => {
	const theme = useSelector((state) => state.theme);
	const { user } = useSelector((state) => state.user);

	const createScreenOptions = ({ route, navigation }) => {
		const TAB_ICON = {
			Monsters: 'dragon',
			Campaigns: 'map',
			Profile: 'hat-wizard',
		};
		const iconName = TAB_ICON[route.name];

		const tabBarIcon = ({ size, color, focused }) => {
			const iconComponents = {
				Monsters: FontAwesome5,
				Campaigns: Fontisto,
				Profile: FontAwesome5,
			};

			const IconComponent = iconComponents[route.name];

			if (IconComponent) {
				return (
					<IconComponent
						name={iconName}
						size={size}
						color={color}
						focused={focused}
					/>
				);
			}

			return null;
		};

		const tabBarStyle = user
			? { backgroundColor: theme.primary }
			: { display: 'none' };

		return {
			headerShown: false,
			tabBarIcon,
			tabBarStyle,
			tabBarActiveTintColor: theme.paragraph,
			tabBarInactiveTintColor: theme.heading,
			swipeEnabled: false,
		};
	};

	return (
		<AppTabs.Navigator screenOptions={createScreenOptions}>
			<AppTabs.Screen name='Monsters' component={MonsterNavigator} />
			<AppTabs.Screen name='Campaigns' component={CampaignNavigator} />
			<AppTabs.Screen name='Profile' component={ProfileNavigator} />
		</AppTabs.Navigator>
	);
};
