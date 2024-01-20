import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './navigation/appNavigator';
import {
	useFonts as useAlegreya,
	AlegreyaSC_400Regular,
	AlegreyaSC_400Regular_Italic,
	AlegreyaSC_500Medium,
	AlegreyaSC_500Medium_Italic,
	AlegreyaSC_700Bold,
	AlegreyaSC_700Bold_Italic,
	AlegreyaSC_800ExtraBold,
	AlegreyaSC_800ExtraBold_Italic,
	AlegreyaSC_900Black,
	AlegreyaSC_900Black_Italic,
} from '@expo-google-fonts/alegreya-sc';
import {
	useFonts as useCreepster,
	Creepster_400Regular,
} from '@expo-google-fonts/creepster';
import {
	useFonts as useNosifer,
	Nosifer_400Regular,
} from '@expo-google-fonts/nosifer';

const DNDCompanion = () => {
	const [alegreyaLoaded] = useAlegreya({
		AlegreyaSC_400Regular,
		AlegreyaSC_400Regular_Italic,
		AlegreyaSC_500Medium,
		AlegreyaSC_500Medium_Italic,
		AlegreyaSC_700Bold,
		AlegreyaSC_700Bold_Italic,
		AlegreyaSC_800ExtraBold,
		AlegreyaSC_800ExtraBold_Italic,
		AlegreyaSC_900Black,
		AlegreyaSC_900Black_Italic,
	});

	const [creepsterLoaded] = useCreepster({
		Creepster_400Regular,
	});

	const [nosiferLoaded] = useNosifer({
		Nosifer_400Regular,
	});

	if (!alegreyaLoaded || !creepsterLoaded || !nosiferLoaded) return null;

	return (
		<NavigationContainer>
			<AppNavigator />
		</NavigationContainer>
	);
};

export default DNDCompanion;
