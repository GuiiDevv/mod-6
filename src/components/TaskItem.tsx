import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
	titulo: string;
};

export default function TaskItem({ titulo }: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>{titulo}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 12,
		marginBottom: 8,
		backgroundColor: '#f9f9f9',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#eee',
	},
	titulo: {
		fontSize: 16,
	},
});
