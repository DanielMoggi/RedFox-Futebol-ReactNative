import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Historico = () => {
  const historicoData = [
    { id: '1', texto: 'Item 1', preco: 'R$ 50,00' },
    { id: '2', texto: 'Item 2', preco: 'R$ 30,00' },
    { id: '3', texto: 'Item 3', preco: 'R$ 20,00' },
  ];

  const calcularTotal = () => {
    return historicoData.reduce((total, item) => total + parseFloat(item.preco.replace('R$', '').replace(',', '.')), 0).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.profileIconContainer}>
        <Ionicons name="receipt" size={24} color="#555" style={styles.profileIcon} />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemText}>{item.texto}</Text>
        <Text style={styles.itemPreco}>{item.preco}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <Ionicons name="trash-bin" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Compras</Text>
      <FlatList
        data={historicoData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Gasto:</Text>
        <Text style={styles.totalValue}>{`R$ ${calcularTotal()}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  profileIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  profileIcon: {
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemPreco: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
  removeButton: {
    marginLeft: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    color: 'green',
  },
});

export default Historico;
