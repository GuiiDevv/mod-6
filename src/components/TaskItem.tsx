import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type TaskItemProps = {
  titulo: string;
  concluida: boolean;
  prioridade: 'alta' | 'media' | 'baixa';
  onConcluir: () => void;
  onExcluir: () => void;
  onEditar: () => void;
};

export default function TaskItem({
  titulo,
  concluida,
  prioridade,
  onConcluir,
  onExcluir,
  onEditar,
}: TaskItemProps) {
  return (
    <View style={styles.item}>
      <View style={styles.contentCard}>
        <Text style={[styles.itemText, concluida && styles.concluida]}>
          {titulo}
        </Text>
        <Text style={styles.prioridade}>prioridade: {prioridade}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.botaoEditar} onPress={onEditar} activeOpacity={0.8}>
          <Text style={styles.botaoTexto}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoConcluir} onPress={onConcluir} activeOpacity={0.8}>
          <Text style={styles.botaoTexto}>{concluida ? 'Desfazer' : 'Concluir'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoExcluir} onPress={onExcluir} activeOpacity={0.8}>
          <Text style={styles.botaoTexto}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    backgroundColor: '#dfdada',
    marginBottom: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 17,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  contentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 8,
  },
  prioridade: {
    fontSize: 9,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
    color: '#374151',
    textTransform: 'uppercase',
    right: 3,
    position: 'absolute',
    top: 1,
  },
  concluida: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  botaoEditar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ffbb00',
    borderRadius: 6,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f6c71e',
  },
  botaoConcluir: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#16a34a',
    borderRadius: 6,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#3ec577',
  },
  botaoExcluir: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dc2626',
    borderRadius: 6,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#dd6060',
  },
  botaoTexto: {
    fontSize: 14,
    fontWeight: '600',
  },
});