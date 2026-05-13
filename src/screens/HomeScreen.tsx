import React, { useState, useCallback } from 'react';
import { FlatList, Text, TextInput, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import TaskItem from '../components/TaskItem';
import ButtonAdd from '../components/ButtonAdd';


const STORAGE_KEY = '@taskapp:tarefas';

type Prioridade = 'alta' | 'media' | 'baixa';

export type Tarefa = {
  id: string;
  titulo: string;
  concluida: boolean;
  prioridade: Prioridade;
};

export default function HomeScreen({ navigation }: any) {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const carregarTarefas = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);

      if (dadosSalvos) {
        const tarefasSalvas = JSON.parse(dadosSalvos);
        const tarefasNormalizadas: Tarefa[] = tarefasSalvas.map((tarefa: any) => ({
          ...tarefa,
          prioridade: tarefa.prioridade ?? 'media',
        }));
        setTarefas(tarefasNormalizadas);
      } else {
        const listaInicial: Tarefa[] = [
          { id: '1', titulo: 'Estudar React Native', concluida: false, prioridade: 'alta' },
          { id: '2', titulo: 'Criar primeira tela', concluida: false, prioridade: 'media' },
          { id: '3', titulo: 'Montar lista de tarefas', concluida: false, prioridade: 'baixa' },
        ];

        setTarefas(listaInicial);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listaInicial));
      }
    } catch (error) {
      console.log('Erro ao carregar tarefas:', error);
    }
  };

  const salvarTarefas = async (novaLista: Tarefa[]) => {
    try {
      setTarefas(novaLista);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
    } catch (error) {
      console.log('Erro ao salvar tarefas:', error);
    }
  };

  const concluirTarefa = async (id: string) => {
    const novaLista = tarefas.map((tarefa) =>
      tarefa.id === id
        ? { ...tarefa, concluida: !tarefa.concluida }
        : tarefa
    );

    await salvarTarefas(novaLista);
  };

  const excluirTarefa = async (id: string) => {
    const novaLista = tarefas.filter((tarefa) => tarefa.id !== id);
    await salvarTarefas(novaLista);
  };

  const editarTarefa = (tarefa: Tarefa) => {
    navigation.navigate('EditTask', { tarefa });
  };

  useFocusEffect(
    useCallback(() => {
      carregarTarefas();
    }, [])
  );

  const [titulo, setTitulo] = useState('');
  const [prioridade, setPrioridade] = useState<Prioridade>('media');

  const adicionarTarefa = async () => {
    const tituloLimpo = titulo.trim();

    if (tituloLimpo === '') {
      Alert.alert('Atencao', 'Digite o titulo da tarefa.');
      return;
    }
    const novaTarefa: Tarefa = {
      id: Date.now().toString(),
      titulo: tituloLimpo,
      concluida: false,
      prioridade,
    };

    await salvarTarefas([...tarefas, novaTarefa]);
    setTitulo('');
    setPrioridade('media');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardAdicionar}>
        <Text style={styles.title}>Nova tarefa:</Text>
        <TextInput
          style={styles.inputCard}
          placeholder="Digite o título da tarefa"
          value={titulo}
          onChangeText={setTitulo}
        />
        <View style={styles.prioridadeContainer}>
          <Text style={styles.prioridadeLabel}>Prioridade:</Text>
          <View style={styles.prioridadeBotoes}>
            <TouchableOpacity
              style={[styles.prioridadeBotao, prioridade === 'alta' && styles.prioridadeBotaoAtivo]}
              onPress={() => setPrioridade('alta')}
              activeOpacity={0.8}
            >
              <Text style={[styles.prioridadeTexto, prioridade === 'alta' && styles.prioridadeTextoAtivo]}>Alta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.prioridadeBotao, prioridade === 'media' && styles.prioridadeBotaoAtivo]}
              onPress={() => setPrioridade('media')}
              activeOpacity={0.8}
            >
              <Text style={[styles.prioridadeTexto, prioridade === 'media' && styles.prioridadeTextoAtivo]}>Media</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.prioridadeBotao, prioridade === 'baixa' && styles.prioridadeBotaoAtivo]}
              onPress={() => setPrioridade('baixa')}
              activeOpacity={0.8}
            >
              <Text style={[styles.prioridadeTexto, prioridade === 'baixa' && styles.prioridadeTextoAtivo]}>Baixa</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ButtonAdd onAddTask={adicionarTarefa} />
      </View>

      <Text style={styles.subTitle}>Minhas tarefas:</Text>
      <FlatList
        data={tarefas}
        renderItem={({ item }) => (
          <TaskItem
            titulo={item.titulo}
            concluida={item.concluida}
            prioridade={item.prioridade}
            onConcluir={() => concluirTarefa(item.id)}
            onExcluir={() => excluirTarefa(item.id)}
            onEditar={() => editarTarefa(item)}
          />
        )}
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
    backgroundColor: '#000000e9',
  },

  cardAdicionar: {
    borderColor: '#ccc',
    backgroundColor: '#dfdada',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    marginTop: 25,
    width: '100%',
    height: '35%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center', 
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  subTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'#dfdada',

  },

  list: {
    marginTop: 8,
    paddingBottom: 20,
  },

  inputCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    width: '75%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },

  prioridadeContainer: {
    width: '75%',
    marginBottom: 10,
  },

  prioridadeLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },

  prioridadeBotoes: {
    flexDirection: 'row',
    gap: 8,
  },

  prioridadeBotao: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  prioridadeBotaoAtivo: {
    borderColor: '#2563eb',
    backgroundColor: '#eaf1ff',
  },

  prioridadeTexto: {
    color: '#333',
    fontWeight: '600',
  },

  prioridadeTextoAtivo: {
    color: '#1d4ed8',
  },
});
