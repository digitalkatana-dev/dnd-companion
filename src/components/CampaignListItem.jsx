import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, ListItem } from '@rneui/themed';
import { useSelector } from 'react-redux';
import IconButton from '../components/IconButton';

const CampaignListItem = ({
	disabled,
	variant,
	item,
	itemStyle,
	titleStyle,
	onPress,
	optionPress,
}) => {
	const theme = useSelector((state) => state.theme);

	const styles = StyleSheet.create({});

	if (variant === 'empty') {
		return (
			<TouchableOpacity onPress={onPress}>
				<ListItem>
					<ListItem.Content>
						<ListItem.Title>No Campaigns...</ListItem.Title>
					</ListItem.Content>
				</ListItem>
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity disabled={disabled} onPress={onPress}>
			<ListItem containerStyle={itemStyle} bottomDivider>
				<ListItem.Content>
					<ListItem.Title style={titleStyle}>{item.name}</ListItem.Title>
				</ListItem.Content>
				{variant === 'profile' && (
					<IconButton onPress={optionPress}>
						<Icon
							name='ellipsis-vertical-circle'
							type='ionicon'
							color={theme.brand}
						/>
					</IconButton>
				)}
			</ListItem>
		</TouchableOpacity>
	);
};

export default CampaignListItem;
