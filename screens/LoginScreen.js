import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useSetRecoilState } from "recoil";
import api from "../services/api";
import { userState } from "../services/recoilAuth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("daniel@daniel.com");
  const [password, setPassword] = useState("Americana2005");
  const [errorMsg, setErrorMsg] = useState(null);

  const setUser = useSetRecoilState(userState);

  class LoginApi {
    async login(email, password) {
      try {
        console.info("Posting");
        const { data } = await api.post("/token/", {
          email,
          password,
        });

        console.log(data);
        return Promise.resolve(data);
      } catch (error) {
        console.log(error);
        return Promise.error(error);
      }
    }
  }

  const login = async () => {
    try {
      console.log("login", email, password);
      const data = await new LoginApi().login(email, password);
      console.log("data", data);
      setUser({
        loggedIn: true,
        access: data.access,
        refresh: data.refresh,
      });
      setEmail("");
      setPassword("");
      setErrorMsg(null);
      await SecureStore.setItemAsync("access", data.access);

      navigation.navigate("Home");
    } catch (error) {
      setUser({ loggedIn: false, access: null, refresh: null });
      setErrorMsg("Email ou senha inválidos!");
      await SecureStore.deleteItemAsync("access");
    }
  };

  const handleCadastro = () => {
    navigation.navigate("Cadastro");
  };

  // Função para verificar se o botão de Login deve estar habilitado
  const isLoginButtonDisabled = () => {
    return !(email.trim() && password.trim());
  };

  return (
    <ImageBackground
      source={require("./img/estadio.jpg")}
      style={styles.imageBackground}
    >
      <View style={styles.bodyContainer}>
        <View style={styles.loginContainer}>
          <View style={styles.profileImage}>
            <Image
              style={styles.roundedImage}
              source={require("./img/pngfind.com-bite-mark-png-631239.png")}
            />
          </View>

          <View style={styles.loginCard}>
            <Text style={styles.loginTitle}>Login</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                {
                  backgroundColor: isLoginButtonDisabled() ? "#ccc" : "#27ae60",
                },
              ]}
              onPress={login}
              disabled={isLoginButtonDisabled()}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={{ color: "#FFFF" }}>{errorMsg}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    justifyContent: "center",
    height: "80%",
    width: "100%",
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  roundedImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
  },
  loginCard: {
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    padding: 30,
    width: 350,
  },
  loginTitle: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputField: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    marginBottom: 15,
    color: "grey",
  },
  loginButton: {
    backgroundColor: "#27ae60",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  CadastroButton: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  CadastroButtonText: {
    color: "blue",
    fontSize: 10,
    textAlign: "center",
  },
});
