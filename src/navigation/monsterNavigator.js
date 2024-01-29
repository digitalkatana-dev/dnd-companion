import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccess } from '../redux/slices/campaignSlice';
import MonsterListScreen from '../features/monsters/screens/MonsterListScreen';
import MonsterDetailScreen from '../features/monsters/screens/MonsterDetailScreen';

const MonsterStack = createNativeStackNavigator();
export const MonsterNavigator = () => {
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
			<MonsterStack.Navigator screenOptions={{ headerShown: false }}>
				<MonsterStack.Screen name='MonsterList' component={MonsterListScreen} />
				<MonsterStack.Screen
					name='MonsterDetail'
					component={MonsterDetailScreen}
				/>
			</MonsterStack.Navigator>
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
