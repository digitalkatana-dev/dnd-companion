import { FlatList, StyleSheet } from 'react-native';
import { Avatar } from '@rneui/themed';
import IconButton from '../../../components/IconButton';

const AvatarList = ({ onPress }) => {
	const generateAvatarData = () => {
		return Array.from({ length: 26 }, (_, index) => {
			const source = `http://6fbf-98-176-78-196.ngrok-free.app/uploads/avatars/avatar_${
				index + 1
			}.jpg`;
			return { id: index.toString(), source };
		});
	};

	const styles = StyleSheet.create({
		avatar: {
			margin: 5,
		},
		columnContainer: {
			justifyContent: 'center',
		},
	});

	return (
		<FlatList
			data={generateAvatarData()}
			renderItem={({ item }) => (
				<IconButton onPress={() => onPress(item)}>
					<Avatar
						size={32}
						rounded
						source={{ uri: item.source }}
						containerStyle={styles.avatar}
					/>
				</IconButton>
			)}
			keyExtractor={(item) => item.id}
			numColumns={8}
			columnWrapperStyle={styles.columnContainer}
			showsVerticalScrollIndicator={false}
		/>
	);
};

export default AvatarList;
