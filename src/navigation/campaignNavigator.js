import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccess } from '../redux/slices/campaignSlice';
import CampaignListScreen from '../features/campaigns/screens/CampaignListScreen';
import CampaignDetailsScreen from '../features/campaigns/screens/CampaignDetailsScreen';
import CampaignMonsterScreen from '../features/campaigns/screens/CampaignMonsterScreen';

const CampaignStack = createNativeStackNavigator();
export const CampaignNavigator = () => {
	const theme = useSelector((state) => state.theme);
	const { success } = useSelector((state) => state.campaign);
	const [isVisible, setIsVisible] = useState(false);
	const dispatch = useDispatch();

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
		},
	});

	return (
		<>
			<CampaignStack.Navigator screenOptions={{ headerShown: false }}>
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
