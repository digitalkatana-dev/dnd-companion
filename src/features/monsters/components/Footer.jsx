import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const Footer = () => {
	const { loading } = useSelector((state) => state.monster);

	if (!loading) return null;

	return (
		<View
			style={{
				paddingVertical: 20,
				borderTopWidth: 1,
				borderColor: '#CED0CE',
			}}
		>
			<ActivityIndicator animating size='large' />
		</View>
	);
};

export default Footer;

const styles = StyleSheet.create({});
