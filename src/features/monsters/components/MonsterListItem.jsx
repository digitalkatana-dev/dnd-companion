import { StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem } from '@rneui/themed';
import { capitalizeWords } from '../../../util/helpers';

const MonsterListItem = ({ item, onPress }) => {
	const styles = StyleSheet.create({
		listItem: {
			backgroundColor: 'transparent',
		},
		title: {
			color: 'brown',
			fontFamily: 'Creepster_400Regular',
		},
	});

	return (
		<ListItem containerStyle={styles.listItem} onPress={onPress} bottomDivider>
			<Avatar rounded source={{ uri: item.img_main }} />
			<ListItem.Content>
				<ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
				<ListItem.Subtitle>{`${item.type}   ${capitalizeWords(
					item.alignment
				)}`}</ListItem.Subtitle>
			</ListItem.Content>
			<ListItem.Chevron color='brown' />
		</ListItem>
	);
};

export default MonsterListItem;
