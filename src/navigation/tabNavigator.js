import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { FontAwesome5, Fontisto } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserSuccess } from '../redux/slices/userSlice';
import { clearCampaignSuccess } from '../redux/slices/campaignSlice';
import { MonsterNavigator } from './monsterNavigator';
import { CampaignNavigator } from './campaignNavigator';
import { ProfileNavigator } from './profileNavigator';
import IconButton from '../components/IconButton';

const AppTabs = createBottomTabNavigator();
export const TabNavigator = () => {
	const theme = useSelector((state) => state.theme);
	const { user } = useSelector((state) => state.user);
	const userSuccess = useSelector((state) => state.user.success);
	const campaignSuccess = useSelector((state) => state.campaign.success);
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

			const handlePress = () => {
				if (route.name === 'Monsters') {
					navigation.navigate('Monsters', { screen: 'MonsterList' });
				} else if (route.name === 'Campaigns') {
					navigation.navigate('Campaigns', { screen: 'CampaignList' });
				} else {
					navigation.navigate(route.name);
				}
			};

			if (IconComponent) {
				return (
					<IconButton onPress={handlePress}>
						<IconComponent
							name={iconName}
							size={size}
							color={color}
							focused={focused}
						/>
					</IconButton>
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
			gestureEnabled: false,
			swipeEnabled: false,
		};
	};

	const dismissSnackBar = () => {
		setIsVisible(false);
	};

	const handleUserSuccess = useCallback(() => {
		if (userSuccess) {
			setIsVisible(true);

			setTimeout(() => {
				dispatch(clearUserSuccess());
				setIsVisible(false);
			}, 4000);
		}
	}, [userSuccess, dispatch]);

	const handleCampaignSuccess = useCallback(() => {
		if (campaignSuccess) {
			setIsVisible(true);

			setTimeout(() => {
				dispatch(clearCampaignSuccess());
				setIsVisible(false);
			}, 4000);
		}
	}, [campaignSuccess, dispatch]);

	useEffect(() => {
		handleUserSuccess();
	}, [handleUserSuccess]);

	useEffect(() => {
		handleCampaignSuccess();
	}, [handleCampaignSuccess]);

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
				{userSuccess ? userSuccess : campaignSuccess && campaignSuccess}
			</Snackbar>
		</>
	);
};
