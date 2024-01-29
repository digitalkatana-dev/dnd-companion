import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { FontAwesome5, Fontisto } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccess } from '../redux/slices/campaignSlice';
import { MonsterNavigator } from './monsterNavigator';
import { CampaignNavigator } from './campaignNavigator';
import { ProfileNavigator } from './profileNavigator';

const AppTabs = createBottomTabNavigator();
export const TabNavigator = () => {
	const theme = useSelector((state) => state.theme);
	const { user } = useSelector((state) => state.user);
	const { success } = useSelector((state) => state.campaign);
	const [isVisible, setIsVisible] = useState(false);
	const dispatch = useDispatch();

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
			tabBarActiveTintColor: theme.heading,
			tabBarInactiveTintColor: theme.muted,
			swipeEnabled: false,
		};
	};

	const dismissSnackBar = () => {
		setIsVisible(false);
	};

	const handleSuccess = useCallback(() => {
		if (success) {
			setIsVisible(true);

			setTimeout(() => {
				dispatch(clearSuccess());
				setIsVisible(false);
			}, 4000);
		}
	}, [success, dispatch]);

	useEffect(() => {
		handleSuccess();
	}, [handleSuccess]);

	const styles = StyleSheet.create({
		alert: {
			backgroundColor: theme.highlight,
			marginBottom: 75,
		},
	});

	return (
		<>
			<AppTabs.Navigator screenOptions={createScreenOptions}>
				<AppTabs.Screen name='Monsters' component={MonsterNavigator} />
				<AppTabs.Screen name='Campaigns' component={CampaignNavigator} />
				<AppTabs.Screen name='Profile' component={ProfileNavigator} />
			</AppTabs.Navigator>
			<Snackbar
				visible={isVisible}
				onDismiss={dismissSnackBar}
				style={styles.alert}
			>
				{success && success}
			</Snackbar>
		</>
	);
};
