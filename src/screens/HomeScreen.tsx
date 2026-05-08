import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';

const STORAGE_KEY = '@taskapp:tarefas';

export default function HomeScreen({ navigation }: any) {
  const [tarefas, setTarefas] = useState([
    { id: '1', titulo: 'Estudar React Native' },
    { id: '2', titulo: 'Criar primeira tela' },
    { id: '3', titulo: 'Montar lista de tarefas' },
  ]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  useEffect(() => {
    salvarTarefas();
  }, [tarefas]);

  const carregarTarefas = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);

      if (dadosSalvos) {
        setTarefas(JSON.parse(dadosSalvos));
      }
    } catch (error) {
      console.log('Erro ao carregar tarefas:', error);
    }
  };

  const salvarTarefas = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    } catch (error) {
      console.log('Erro ao salvar tarefas:', error);
    }
  };

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