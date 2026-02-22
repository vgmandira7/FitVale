import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import styles from './style';
import Claro from "../../../../assets/Claro.png";
import Escuro from "../../../../assets/Escuro.png";
import { FontAwesome } from '@expo/vector-icons'; // Importa a biblioteca de ícones

const Themes = ({ navigation }) => {
  const [checked, setChecked] = useState(null); // Estado inicial como null

  // Função para carregar o tema salvo do AsyncStorage
  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setChecked(savedTheme); // Define o tema salvo como o estado inicial
      } else {
        setChecked('claro'); // Se não houver tema salvo, o padrão será 'claro'
      }
    } catch (error) {
      console.error('Erro ao carregar o tema:', error);
    }
  };

  useEffect(() => {
    loadTheme(); // Carrega o tema salvo quando o componente é montado
  }, []);

  const setTheme = async (theme) => {
    try {
      await AsyncStorage.setItem('theme', theme); // Salva o tema no AsyncStorage
      navigation.goBack(); // Volta para a tela anterior (Perfil)
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  // Atualiza o tema quando o usuário seleciona uma opção
  const handleThemeChange = (theme) => {
    setChecked(theme);
    setTheme(theme); // Chama a função para salvar o tema e voltar para a tela anterior
  };

  return (
    <View style={styles.container}>
      <View style={styles.NavBar}>
      <TouchableOpacity 
      style={{marginLeft: 25, marginTop: 25}}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="arrow-left" size={24} color="#fff" />
        
      </TouchableOpacity>

      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 25, marginTop: 90 }}>
        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: 118, height: 226.9 }} source={Claro} />
          <Text style={{ alignSelf: 'center', marginTop: 20, fontWeight: 'bold', fontSize: 17 }}>Claro</Text>
          {/* RadioButton abaixo do texto */}
          <RadioButton
            value="claro"
            status={checked === 'claro' ? 'checked' : 'unchecked'}
            onPress={() => handleThemeChange('claro')}
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: 118, height: 226 }} source={Escuro} />
          <Text style={{ alignSelf: 'center', marginTop: 20, fontWeight: 'bold', fontSize: 17 }}>Escuro</Text>
          {/* RadioButton abaixo do texto */}
          <RadioButton
            value="escuro"
            status={checked === 'escuro' ? 'checked' : 'unchecked'}
            onPress={() => handleThemeChange('escuro')}
          />
        </View>
      </View>
    </View>
  );
};

export default Themes;
