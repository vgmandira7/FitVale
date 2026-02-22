import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./style";
import { API_IP } from "../../Services/ipConfig"



export default function Login({ navigation }) {
  const api = `${API_IP}/pam3etim/apireact/`;
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function login() {
    const obj = { email, senha };
    try {
      const res = await axios.post(api + 'Login.php', obj);
      console.log('Resposta da API:', res.data);

      if (res.data.success === false) {
        mensagemDadosIncorretos();
      } else if (res.data.success === true) {
        await AsyncStorage.setItem('profileImage', res.data.imagem_perfil);
        console.log('Imagem armazenada no AsyncStorage:', res.data.imagem_perfil);
        await AsyncStorage.setItem('userType', res.data.tipo_usuario);
        await AsyncStorage.setItem('userId', res.data.cod_aluno.toString()); // Armazena o ID do usuário

        

        

        if (res.data.tipo_usuario === 'aluno') {
          if(res.data.status_pagamento === 'pago' || res.data.status_pagamento === 'pendente'){
          navigation.navigate('Home');
          } else {
            

            Alert.alert(
              "Ops! Seu acesso está temporariamente suspenso",
              "Notamos que há um pagamento vencido em sua conta. Para continuar aproveitando todos os benefícios do nosso aplicativo, regularize sua situação. Caso precise de ajuda, nossa equipe está à disposição para auxiliá-lo! Obrigado por estar com a gente.\n\n",
              [{ text: "Entendi", onPress: () => console.log("Alerta fechado") }]
            );

          }





        } else if (res.data.tipo_usuario === 'instrutor') {
          if(res.data.status_pagamento === 'pago' || res.data.status_pagamento === 'pendente'){
            navigation.navigate("WorkoutSolicitation");
          }else {
            Alert.alert("Nenhum treino encontrado");
          }
        } else {
          Alert.alert("Erro", "Tipo de usuário desconhecido");
        }
      } else {
        Alert.alert("Erro", "Ocorreu um erro inesperado");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro na requisição", error.message);
    }
  }





  const mensagemDadosIncorretos = () =>
    Alert.alert(
      "Erro ao Logar",
      "Dados Incorretos",
      [
        { text: "OK" }
      ],
      { cancelable: true }
    );

  return (
    <View style={styles.container}>
      <View style={styles.layoutBack}>
        <View style={styles.layoutIconBack}>
          <TouchableOpacity style={styles.layoutButton}></TouchableOpacity>
        </View>
        <View style={styles.layoutTextBack}>
          <Text style={styles.textBack}>Faça login em sua conta</Text>
        </View>
        <View style={styles.layoutHome}>
          <TextInput
            style={styles.textInputEmail}
            placeholder="Insira seu e-mail"
            placeholderTextColor="#fff" // Cor do placeholder
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.textInputSenha}
            secureTextEntry={true}
            placeholder="Insira sua senha"
            placeholderTextColor="#fff" // Cor do placeholder
            value={senha}
            onChangeText={(senha) => setSenha(senha)}
          />
        </View>
        <Text style={styles.TextSenhaEsquece}>Esqueceu a senha?</Text>
        <View style={styles.layoutBotaoLogin}>
          <TouchableOpacity style={styles.BotaoLogin} onPress={login}>
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonVerify}></View>
        <Text style={styles.TextLembre}>Lembrar-me</Text>
      </View>
    </View>
  );
}
