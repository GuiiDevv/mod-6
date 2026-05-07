import React from 'react';
import { FlatList, Text, View, StyleSheet, Button } from 'react-native';
import TaskItem from '../components/TaskItem';

const tarefas = [
  { id: '1', titulo: 'Estudar React Native' },
  { id: '2', titulo: 'Criar primeira tela' },
  { id: '3', titulo: 'Montar lista de tarefas' },
];

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas tarefas</Text>

      <Button
        title="Adicionar tarefa"
        onPress={() => navigation.navigate('NewTask')}
      />

      <FlatList
        data={tarefas}
        renderItem={({ item }) => <TaskItem titulo={item.titulo} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    marginTop: 16,
    paddingBottom: 20,
  },
});