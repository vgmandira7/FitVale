import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import chat from "../../../../assets/chat.png";
import perfil from "../../../../assets/perfilFlavia.png";
import { API_IP } from "../../../Services/ipConfig"

const TechnicalSheet2 = ({ navigation, route }) => {
  const { formData } = route.params; // Recebe os dados da primeira tela

  const [additionalData, setAdditionalData] = useState({
    preferencia: '',
    restricoes: '',
    habitos: '',
    nivelCondicionamento: '',
    comentarios: ''
  });

  const handleEnviar = async () => {
    const { preferencia, restricoes, habitos, nivelCondicionamento, comentarios } = additionalData;

    // Verificando se todos os campos estão preenchidos
    if (!preferencia || !restricoes || !habitos || !nivelCondicionamento || !comentarios) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const combinedData = {
      ...formData, // Inclui os dados da primeira parte
      preferencia,
      restricoes,
      habitos,
      nivelCondicionamento,
      comentarios
    };

    try {
      const response = await fetch(`${API_IP}/pam3etim/apireact/FormularioParte2.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(combinedData)
      });

      const result = await response.json();

      if (result.success) {
        navigation.navigate('waitingScreen');
      } else {
        Alert.alert('Erro', result.message || 'Ocorreu um erro inesperado.');
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Não foi possível enviar os dados. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Navbar}>
        <Text style={styles.textoNav}>Ficha Técnica</Text>
        <Image style={styles.chat} source={chat} />
        <Image style={styles.perfil} source={perfil} />
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.textoTitulo}>Perguntas adicionais:</Text>

        <Text style={styles.textoPerguntas}>Você tem alguma preferência por tipos específicos de exercícios?</Text>
        <TextInput
          style={styles.input}
          value={additionalData.preferencia}
          onChangeText={(text) => setAdditionalData({ ...additionalData, preferencia: text })}
          underlineColorAndroid="transparent"
        />

        <Text style={styles.textoPerguntas}>Você possui alguma restrição alimentar?</Text>
        <TextInput
          style={styles.input}
          value={additionalData.restricoes}
          onChangeText={(text) => setAdditionalData({ ...additionalData, restricoes: text })}
          underlineColorAndroid="transparent"
        />

        <Text style={styles.textoPerguntas}>Você fuma ou consome álcool regularmente?</Text>
        <TextInput
          style={styles.input}
          value={additionalData.habitos}
          onChangeText={(text) => setAdditionalData({ ...additionalData, habitos: text })}
          underlineColorAndroid="transparent"
        />

        <Text style={styles.textoPerguntas}>Qual é o seu nível de condicionamento físico atual?</Text>
        <TextInput
          style={styles.input}
          value={additionalData.nivelCondicionamento}
          onChangeText={(text) => setAdditionalData({ ...additionalData, nivelCondicionamento: text })}
          underlineColorAndroid="transparent"
        />

        <Text style={styles.textoPerguntas}>Você tem algum outro comentário ou informação relevante que gostaria de compartilhar?</Text>
        <TextInput
          style={styles.input}
          value={additionalData.comentarios}
          onChangeText={(text) => setAdditionalData({ ...additionalData, comentarios: text })}
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity onPress={handleEnviar} style={styles.botao}>
          <Text style={styles.textoBotao}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#18191E',
  },
  Navbar: {
    width: 393,
    height: 107,
    backgroundColor: "#6A11F5",
    justifyContent: "center",
    padding: 25
  },
  conteudo: {
    backgroundColor: "#c",
    height: 935,
    marginTop: 50,
    padding: 25,
  },
  textoTitulo: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff"
  },
  textoPerguntas: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#C0BEBE",
    marginTop: 11
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#fff',
    color: "#fff",
    fontWeight: "bold"
  },
  botao: {
    width: 237,
    height: 35,
    borderRadius: 50,
    backgroundColor: "#6a11f5",
    alignSelf: "center",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  textoBotao: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff"
  },
  textoNav: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    top: 54
  },
  chat: {
    width: 40,
    height: 40,
    left: 225,
    top: 20
  },
  perfil: {
    width: 53,
    height: 53,
    left: 285,
    top: -25
  }  
});

export default TechnicalSheet2;
