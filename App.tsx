import React from "react";
import Header from "./components/Header";
import { FlatList, Text, View, StyleSheet } from "react-native"

// 1. Dados da lista
const tarefas = [
  { id: "1", titulo: "Estudar React Native" },
  { id: "2", titulo: "Criar primeira tela" },
  { id: "3", titulo: "Montar lista de tarefas" }
]

export default function App() {
  // 2. Função para renderizar cada item
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.titulo}</Text>
    </View>
  )

  return (
  <View style={styles.container}>
      <Header />
      <Text style={styles.subTitulo}>Minhas Tarefas:</Text>
      <FlatList
        data={tarefas} // 3. Lista de dados
        renderItem={renderItem} // 4. Como cada item aparece
        keyExtractor={item => item.id} // 5. Chave única
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "left",
    paddingLeft: 10
  },
  item: {
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  itemText: {
    fontSize: 18,
    textAlign: 'left',
    paddingLeft: 20
  }
});