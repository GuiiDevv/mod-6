import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
	titulo: string;
	onDelete: () => void;
};

export default function TaskItem({ titulo, onDelete }: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>{titulo}</Text>
			<TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
				<Text style={styles.deleteButtonText}>Excluir</Text>
			</TouchableOpacity>
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	titulo: {
		fontSize: 16,
	},
	deleteButton: {
		backgroundColor: '#ef4444',
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 6,
	},
	deleteButtonText: {
		color: '#fff',
		fontWeight: '600',
	},
});
