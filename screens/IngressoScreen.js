import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";

const IngressoScreen = () => {
  const navigation = useNavigation();

  const handleComprarIngresso = () => {
    navigation.navigate("Ingresso");
  };

  const [ticketQuantity, setTicketQuantity] = useState({
    padrao: 0,
    vip: 0,
    premium: 0,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const handleSelectTicket = (price, type) => {
    const newQuantity = { ...ticketQuantity };
    newQuantity[type] += 1;
    setTicketQuantity(newQuantity);

    const newTotal = Object.keys(newQuantity).reduce(
      (acc, ticketType) =>
        acc + selectedPrices[ticketType].price * newQuantity[ticketType],
      0
    );
    setTotalPrice(newTotal);
  };

  const decrementQuantity = (type) => {
    if (ticketQuantity[type] > 0) {
      const newQuantity = { ...ticketQuantity };
      newQuantity[type] -= 1;
      setTicketQuantity(newQuantity);

      const newTotal = Object.keys(newQuantity).reduce(
        (acc, ticketType) =>
          acc + selectedPrices[ticketType].price * newQuantity[ticketType],
        0
      );
      setTotalPrice(newTotal);
    }
  };

  const selectedPrices = {
    padrao: {
      price: 50,
      description: "Ingresso Padrão - Assentos comuns",
    },
    vip: {
      price: 100,
      description: "Ingresso VIP - Assentos privilegiados",
    },
    premium: {
      price: 150,
      description: "Ingresso Premium - Melhores assentos e benefícios extras",
    },
  };

  const [items, setItems] = useState(selectedPrices);

  const handleAdicionarAoCarrinho = async () => {
    try {
      const response = await api.post("/ingressos/", {
        partida: 1,
        preco: totalPrice,
      });

      if (response.data) {
        console.log(response.data);
        console.log("Ingresso created successfully!");
        navigation.navigate("Historico");
      } else {
        console.log("Failed to create ingresso");
      }
    } catch (error) {
      console.log("Error creating ingresso:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compra de Ingresso</Text>
      <View style={styles.ticketContainer}>
        <Text style={styles.ticketTitle}>Escolha o tipo de ingresso:</Text>
        {Object.keys(selectedPrices).map((type) => (
          <View style={styles.ticketOptionContainer} key={type}>
            <TouchableOpacity
              style={styles.ticketOption}
              onPress={() =>
                handleSelectTicket(selectedPrices[type].price, type)
              }
            >
              <Text style={styles.optionText}>Ingresso {type}</Text>
              <Text
                style={styles.optionPrice}
                onPress={() =>
                  handleSelectTicket(selectedPrices[type].price, type)
                }
              >
                R$ {selectedPrices[type].price}
              </Text>
              <Text style={styles.optionDescription}>
                {selectedPrices[type].description}
              </Text>
            </TouchableOpacity>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => decrementQuantity(type)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{ticketQuantity[type]}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  handleSelectTicket(selectedPrices[type].price, type)
                }
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Text style={styles.totalGeral}>Total Geral: R$ {totalPrice}</Text>
        <TouchableOpacity
          style={[
            styles.confirmPurchaseButton,
            { backgroundColor: totalPrice > 0 ? "#28a745" : "#ccc" },
          ]}
          onPress={handleAdicionarAoCarrinho}
          disabled={totalPrice <= 0}
        >
          <Text style={styles.confirmPurchaseButtonText}>Confirmar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  ticketContainer: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  ticketTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  ticketOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  ticketOption: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  optionPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#800000",
  },
  optionDescription: {
    fontSize: 14,
    color: "#888",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#007BFF",
    borderRadius: 15,
    padding: 10,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  totalGeral: {
    paddingBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  confirmPurchaseButton: {
    backgroundColor: "#28a745",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  confirmPurchaseButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  addToCartButton: {
    backgroundColor: "#28a745",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default IngressoScreen;
