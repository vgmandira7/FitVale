import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importa a biblioteca de ícones
import estrelas from "../../../assets/estrelas_feedback.png";
import FitValeLogo from "../../../assets/FitValeLogo.png";
import Sininho from "../../../assets/Sininho.png";
import styles from './style'; // Importe os estilos do novo arquivo
import { API_IP } from "../../Services/ipConfig";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Certifique-se de ter este pacote instalado

export default function App({ navigation }) {
  const [feedback, setFeedback] = useState(''); // Estado para armazenar o texto do feedback
  const [estrelas, setEstrelas] = useState(0);  // Estado para armazenar a quantidade de estrelas
  const [imagem, setImagem] = useState(null);   // Estado para a URL da imagem de perfil

  const enviarFeedback = () => {
    // URL do script PHP
    const url = `${API_IP}/pam3etim/apireact/PostFeedback.php`;

    // Dados a serem enviados para o servidor
    const dados = new FormData();
    dados.append('feedback', feedback);
    dados.append('estrelas', estrelas);

    // Envia os dados para o servidor usando fetch
    fetch(url, {
      method: 'POST',
      body: dados,
    })
      .then(response => response.text())
      .then(responseText => {
        Alert.alert('Feedback enviado', 'Obrigado pelo seu feedback!');
        setFeedback(''); // Limpa o campo de feedback após o envio
        setEstrelas(0);  // Reseta as estrelas após o envio
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Ocorreu um erro ao enviar seu feedback. Tente novamente mais tarde.');
      });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          console.error('ID do usuário não encontrado');
          return;
        }

        const response = await fetch(`${API_IP}/pam3etim/apireact/GetProfile.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `user_id=${userId}`,
        });

        const data = await response.json();
        if (!data.error) {
          setImagem(data.Imagem); // Define a URL da imagem no estado
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    };
    fetchUserInfo();
  }, []);

  // Função para renderizar as estrelas
  const renderEstrelas = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setEstrelas(star)}>
            <Text style={{ fontSize: 40, color: star <= estrelas ? '#FFD700' : '#CCCCCC' }}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.NavBar}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={{ width: 50, height: 50, borderRadius: 25, marginEnd: 92 }} />
        ) : (
          <Image source={FitValeLogo} style={{ marginEnd: 92, alignSelf: 'center' }} />
        )}
        <Image source={FitValeLogo} style={{ marginEnd: 92, alignSelf: 'center' }} />
        <Image source={Sininho} style={{ alignSelf: 'center' }} />
      </View>

      {/* Botão de Voltar */}
      <TouchableOpacity 
        style={{ marginLeft: 25, marginTop: 25 }}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      {/* parte das mensagens */}
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackTitle}>Agradecemos seu feedback</Text>
        <Text style={styles.feedbackText}>
          Estamos sempre em busca de maneiras de 
          melhorar sua experiência. Por favor, reserve um 
          momento para evoluir e diga-nos o que você 
          pensa.
        </Text>

        {/* Componente de estrelas */}
        {renderEstrelas()}

        <TextInput
          style={styles.feedbackBox}
          placeholder="O que podemos fazer para melhorar sua experiência?"
          placeholderTextColor="#696969"
          onChangeText={text => setFeedback(text)}
          value={feedback}
          multiline={true} // Permite várias linhas
          textAlignVertical="top" // Alinha o texto no topo
        />

        {/* Botão */}
        <TouchableOpacity style={styles.submitButton} onPress={enviarFeedback}>
          <Text style={styles.submitButtonText}>Enviar meu feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
