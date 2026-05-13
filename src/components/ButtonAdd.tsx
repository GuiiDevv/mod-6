import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

type ButtonAddProps = {
  onAddTask: () => void;
};

export default function ButtonAdd({ onAddTask }: ButtonAddProps) {
  return (
    <TouchableOpacity style={styles.buttonAdicionar} onPress={onAddTask} activeOpacity={0.8}>
      <Text style={styles.buttonAdicionarTexto}>Adicionar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    buttonAdicionar: {
        width: '29%',
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#000000cd',
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonAdicionarTexto: {
        color: '#ffffff',
        fontWeight: '600',
    },
})