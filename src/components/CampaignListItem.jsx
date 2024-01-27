import { StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { addOrRemoveMonster } from '../redux/slices/campaignSlice';

const CampaignListItem = ({ variant, item, monster, onClose, navigation }) => {
	const theme = useSelector((state) => state.theme);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handlePress = () => {
		if (variant === 'empty') {
			navigation.navigate('Campaigns');
		} else {
			const data = {
				campaignId: item._id,
				monster,
				user: user._id,
			};
			dispatch(addOrRemoveMonster(data));
		}
		onClose();
	};

	const styles = StyleSheet.create({});

	if (variant === 'empty') {
		return (
			<TouchableOpacity onPress={handlePress}>
				<ListItem>
					<ListItem.Content>
						<ListItem.Title>No Campaigns...</ListItem.Title>
					</ListItem.Content>
				</ListItem>
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity onPress={handlePress}>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>{item.name}</ListItem.Title>
				</ListItem.Content>
			</ListItem>
		</TouchableOpacity>
	);
};

export default CampaignListItem;
