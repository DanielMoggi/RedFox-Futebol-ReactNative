import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const correctUsername = 'usuario';
    const correctPassword = 'senha';

    if (username === correctUsername && password === correctPassword) {
      navigation.navigate('Home');
    } else {
      alert('Login failed. Please check your username and password.');
    }
  };

  const handleCadastro = () => {
    navigation.navigate('Cadastro');
  };

  // Função para verificar se o botão de Login deve estar habilitado
  const isLoginButtonDisabled = () => {
    return !(username.trim() && password.trim());
  };

  return (
    <ImageBackground
      source={require('./img/estadio.jpg')}
      style={styles.imageBackground}
    >
      <View style={styles.bodyContainer}>
        <View style={styles.loginContainer}>
          <View style={styles.profileImage}>
            <Image
              style={styles.roundedImage}
              source={require('./img/pngfind.com-bite-mark-png-631239.png')}
            />
          </View>

          <View style={styles.loginCard}>
            <Text style={styles.loginTitle}>Login</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                placeholder="Usuário"
                value={username}
                onChangeText={(text) => setUsername(text)}
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
                { backgroundColor: isLoginButtonDisabled() ? '#ccc' : '#27ae60' },
              ]}
              onPress={handleLogin}
              disabled={isLoginButtonDisabled()}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.CadastroButton} onPress={handleCadastro}>
              <Text style={styles.CadastroButtonText}>
                Clique aqui para criar uma conta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    justifyContent: 'center',
    height: '80%',
    width: '100%',
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    justifyContent: 'center',
    alignItems: 'center',
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
    resizeMode: 'cover',
  },
  loginCard: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    padding: 30,
    width: 350,
  },
  loginTitle: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputField: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    backgroundColor: '#dcdcdc',
    borderRadius: 5,
    marginBottom: 15,
    color: 'grey',
  },
  loginButton: {
    backgroundColor: '#27ae60',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  CadastroButton: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  CadastroButtonText: {
    color: 'blue',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
