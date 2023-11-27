import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Fragment } from "react";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import CadastroScreen from "./screens/CadastroScreen";
import IngressoScreen from "./screens/IngressoScreen";
import HistoricoScreen from "./screens/HistoricoScreen";
const Stack = createStackNavigator();

const App = () => {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <Fragment>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen name="Ingresso" component={IngressoScreen} />
            <Stack.Screen name="Historico" component={HistoricoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Fragment>
    </RecoilRoot>
  );
};

export default App;
