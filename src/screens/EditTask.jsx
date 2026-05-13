import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = '@taskapp:tarefas';

export default function EditTask({ route, navigation }) {
    const tarefa = route.params?.tarefa;
    const [titulo, setTitulo] = useState(tarefa?.titulo ?? '');

    const salvarEdicao = async () => {
        const tituloLimpo = titulo.trim();

        if (!tarefa) {
            Alert.alert('Erro', 'Tarefa nao encontrada para edicao.');
            return;
        }

        if (tituloLimpo === '') {
            Alert.alert('Atencao', 'Digite o titulo da tarefa.');
            return;
        }

        try {
            const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
            const tarefas = dadosSalvos ? JSON.parse(dadosSalvos) : [];

            const tarefasAtualizadas = tarefas.map((item) =>
                item.id === tarefa.id ? { ...item, titulo: tituloLimpo } : item
            );

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tarefasAtualizadas));
            navigation.goBack();
        } catch (error) {
            console.log('Erro ao editar tarefa:', error);
            Alert.alert('Erro', 'Nao foi possivel salvar a edicao.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar tarefa</Text>

            <TextInput
                style={styles.input}
                placeholder="Digite o novo titulo"
                value={titulo}
                onChangeText={setTitulo}
            />

            <TouchableOpacity style={styles.botaoSalvar} onPress={salvarEdicao} activeOpacity={0.8}>
                <Text style={styles.botaoSalvarTexto}>Salvar alteracoes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    botaoSalvar: {
        borderWidth: 1,
        borderColor: '#2563eb',
        borderRadius: 8,
        backgroundColor: '#eef4ff',
        alignItems: 'center',
        paddingVertical: 12,
    },
    botaoSalvarTexto: {
        color: '#1d4ed8',
        fontWeight: '700',
    },
});
