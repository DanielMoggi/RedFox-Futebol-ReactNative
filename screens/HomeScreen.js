import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import LupaIcon from "./img/pngwing.com.png";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [jogosDaSemana, setJogosDaSemana] = useState([]);

  const handleComprarIngresso = () => {
    navigation.navigate("Ingresso");
  };

  const handleHistorico = () => {
    navigation.navigate("Historico");
  };

  const screenWidth = Dimensions.get("window").width;

  // Lista de partidas (pode ser obtida de uma API, banco de dados, etc.)
  const jogosIniciais = [
    { time1: "Botafogo", time2: "Flamengo", horario: "15:00" },
    // Adicione mais partidas conforme necessário
  ];

  useEffect(() => {
    // Embaralha os jogos aleatoriamente
    const shuffledJogos = [...jogosIniciais].sort(() => Math.random() - 0.5);
    setJogosDaSemana(shuffledJogos);
  }, []);

  // Mapeia o nome do time para o caminho da imagem
  const getImagemTime = (nomeTime) => {
    switch (nomeTime) {
      case "Botafogo":
        return require("./img/Botafogo.png");
      case "Flamengo":
        return require("./img/Flamengo.png");

      default:
      // Se o nome do time não corresponder a nenhum dos casos, retorne uma imagem padrão ou lide com isso conforme necessário
    }
  };

  // Filtra as partidas com base no texto de pesquisa
  const jogosFiltrados = jogosDaSemana.filter(
    (jogo) =>
      jogo.time1.toLowerCase().includes(searchText.toLowerCase()) ||
      jogo.time2.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.menu}>
        <Text style={styles.menuItem}>logo</Text>
        <View style={styles.searchBar}>
          <Image source={LupaIcon} style={styles.lupaIcon} />
          <TextInput
            placeholder="Buscar"
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        <View style={styles.handleHistorico}>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={handleHistorico}
          >
            <Image
              style={styles.roundedImage}
              source={require("./img/pngfind.com-bite-mark-png-631239.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Jogos da semana</Text>
        {jogosFiltrados.map((jogo, index) => (
          <View key={index} style={styles.imageRow}>
            <View style={styles.column}>
              <Image source={getImagemTime(jogo.time1)} style={styles.image} />
              <Text style={styles.imageText}>{jogo.time1}</Text>

              <Text style={styles.vsText}>VS</Text>
              <Image source={getImagemTime(jogo.time2)} style={styles.image} />
              <Text style={styles.imageText}>{jogo.time2}</Text>

              <Text
                style={styles.horarioText}
              >{`Horário: ${jogo.horario}`}</Text>

              <TouchableOpacity
                style={styles.compraButton}
                onPress={handleComprarIngresso}
              >
                <Text style={styles.compraButtonText}>Comprar ingresso</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  menuItem: {
    padding: 20,
    color: "#fff",
    fontSize: 18,
    marginRight: 10,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  lupaIcon: {
    width: 20,
    height: 20,
    tintColor: "#000",
  },
  searchInput: {
    borderColor: "transparent",
    padding: 5,
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
    paddingVertical: 30,
  },
  contentText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: 5,
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", // Alinha o texto com as imagens
    padding: 10,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  imageText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  vsText: {
    fontSize: 18,
    color: "#000",
    marginVertical: 5,
  },
  horarioText: {
    fontSize: 14,
    color: "#000",
    marginVertical: 5,
  },
  compraButton: {
    backgroundColor: "#800000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  compraButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  roundedButton: {
    backgroundColor: "transparent",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  roundedImage: {
    width: 30,
    height: 30,
  },
  handleHistorico: {
    padding: 10,
  },
});

export default HomeScreen;
