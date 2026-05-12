import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

type TaskItemProps = {
  titulo: string;
  concluida: boolean;
  onConcluir: () => void;
  onExcluir: () => void;
  onEditar: () => void;
};

export default function TaskItem({
  titulo,
  concluida,
  onConcluir,
  onExcluir,
  onEditar,
}: TaskItemProps) {
  return (
    <View style={styles.item}>
      <Text style={[styles.itemText, concluida && styles.concluida]}>
        {titulo}
      </Text>

      <View style={styles.actions}>
        <Button title="Editar" onPress={onEditar} />
        <Button
          title={concluida ? 'Desfazer' : 'Concluir'}
          onPress={onConcluir}
        />
        <Button title="Excluir" onPress={onExcluir} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  concluida: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
});