import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleClaro from './styleClaro';
import styleEscuro from './styleEscuro';
import { API_IP } from "../../Services/ipConfig"

const Perfil = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [imagem, setImagem] = useState('');
  const [themeStyle, setThemeStyle] = useState(styleClaro);

  // Carrega as informações do usuário
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const response = await fetch(`${API_IP}/pam3etim/apireact/GetProfile.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `user_id=${userId}`,
        });
        const data = await response.json();
        if (!data.error) {
          setNome(data.Nome);
          setEmail(data.Email);
          setImagem(data.Imagem);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    };
    fetchUserInfo();
  }, []);

  // Carrega o tema ao abrir o aplicativo
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      setThemeStyle(storedTheme === 'escuro' ? styleEscuro : styleClaro);
    };
    loadTheme();

    // Adiciona um listener para quando o AsyncStorage for alterado
    const themeListener = navigation.addListener('focus', () => {
      loadTheme(); // Recarrega o tema sempre que a tela ganhar foco
    });

    return themeListener;
  }, [navigation]);

  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.NavBar}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 25 }}>
            <Image source={{ uri: imagem }} style={themeStyle.ProfileImage} />
          </View>
          
          <View style={{ marginLeft: 20, alignSelf: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: "#fff" }}>{nome}</Text>
            <Text style={themeStyle.sectionText}>{email}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={themeStyle.scrollViewContent}>
        <View style={themeStyle.MinhaConta}>
          <Text style={themeStyle.textProfile}>Minha Conta</Text>
          <View style={themeStyle.section}>
            <Text style={themeStyle.sectionText}>Conta & Segurança</Text>
          </View>
          <View style={themeStyle.section}>
            <Text style={themeStyle.sectionText}>Endereço</Text>
          </View>
        </View>
        <View style={themeStyle.Definicao}>
          <Text style={themeStyle.textProfile}>Definição</Text>
          <TouchableOpacity style={themeStyle.section} onPress={() => navigation.navigate('Themes')}>
            <Text style={themeStyle.sectionText}>Temas</Text>
          </TouchableOpacity>
          <View style={themeStyle.section}>
            <Text style={themeStyle.sectionText}>Configurações de Privacidade</Text>
          </View>
          <View style={themeStyle.section}>
            <Text style={themeStyle.sectionText}>Idioma/Linguagem</Text>
            <Text style={themeStyle.subSectionText}>Português Brasil</Text>
          </View>
        </View>

        <View style={themeStyle.Suporte}>
          <Text style={themeStyle.textProfile}>Suporte</Text>
          <View style={themeStyle.section}>
            <Text style={themeStyle.sectionText}>Central de Ajuda</Text>
          </View>
          <TouchableOpacity style={themeStyle.section} onPress={() => navigation.navigate('Feedback')}>
            <Text style={themeStyle.sectionText}>Feedback</Text>
          </TouchableOpacity>
          <View style={themeStyle.section}>
            <Text style={themeStyle.sectionText}>Sobre</Text>
          </View>
        </View>

        <TouchableOpacity style={themeStyle.botaoSair} onPress={() => navigation.navigate('Login')}>
          <Text style={{color: "#fff", fontWeight: "bold", fontSize: 13}}>Sair</Text>
        </TouchableOpacity>
        <Text style={{color: "#000", alignSelf: "center", fontSize: 10}}>FitVale v1.0.1</Text>
      </ScrollView>
    </View>
  );
};

export default Perfil;
