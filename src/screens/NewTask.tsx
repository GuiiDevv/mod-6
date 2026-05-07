import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewTask() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de nova tarefa</Text>
      <Text>Aqui vamos criar o formulário na próxima aula.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
});