import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import chat from "../../../../assets/chat.png";
import perfil from "../../../../assets/perfilFlavia.png";


const TechnicalSheet1 = ({ navigation }) => {
  const [formData, setFormData] = useState({
    altura: '',
    peso: '',
    objetivos: '',
    diasTreino: '',
    experiencia: ''
  });

  const handleProximo = () => {
    const { altura, peso, objetivos, diasTreino, experiencia } = formData;

    // Verificando se todos os campos estão preenchidos
    if (!altura || !peso || !objetivos || !diasTreino || !experiencia) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Navega para a próxima tela passando o formData
    navigation.navigate('TechnicalSheet2', { formData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.Navbar}>
        <Text style={styles.textoNav}>Ficha Técnica</Text>
        <Image style={styles.chat} source={chat} />
        <Image style={styles.perfil} source={perfil} />
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.textoTitulo}>Perguntas necessárias para emissão de ficha de treino:</Text>

        <Text style={styles.textoPerguntas}>Sua Altura(cm)</Text>
        <TextInput
          style={styles.input}
          value={formData.altura}
          onChangeText={(text) => setFormData({ ...formData, altura: text })}
          underlineColorAndroid="transparent"
        />

        <Text style={styles.textoPerguntas}>Seu Peso(kg)</Text>
        <TextInput
          style={styles.input}
          value={formData.peso}
          onChangeText={(text) => setFormData({ ...formData, peso: text })}
          underlineColorAndroid="transparent"
        />

        <Text style={styles.textoPerguntas}>Quais são seus objetivos de condicionamento físico (perda de peso, ganho de massa, etc.)</Text>
        <TextInput
          style={styles.input}
          value={formData.objetivos}
          onChangeText={(text) => setFormData({ ...formData, objetivos: text })}
          underlineColorAndroid="transparent"
        />

        <Text style={styles.textoPerguntas}>Quantos dias na semana está disposto a se dedicar ao treino?</Text>
        <TextInput
          style={styles.input}
          value={formData.diasTreino}
          onChangeText={(text) => setFormData({ ...formData, diasTreino: text })}
          underlineColorAndroid="transparent"
        />

        <Text style={styles.textoPerguntas}>Você já teve alguma experiência prévia com treinamento físico? Se sim, por favor, descreva brevemente.</Text>
        <TextInput
          style={styles.input}
          value={formData.experiencia}
          onChangeText={(text) => setFormData({ ...formData, experiencia: text })}
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity onPress={handleProximo} style={styles.botao}>
          <Text style={styles.textoBotao}>Próximo</Text>
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

export default TechnicalSheet1;
