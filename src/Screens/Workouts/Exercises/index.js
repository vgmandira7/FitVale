import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Switch, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa o hook de navegação
import { FontAwesome } from '@expo/vector-icons'; // Importa os ícones do FontAwesome
import styles from "./style";
import SupinoRetoComBarra from "../../../../assets/SupinoRetoComBarra.png"

// URL da imagem padrão caso o image_text esteja vazio ou inválido
const defaultImage = 'https://via.placeholder.com/410x280.png?text=No+Image';

const Exercicios = ({ route }) => {
  const { treino } = route.params;
  const navigation = useNavigation(); // Inicializa a navegação

  // Estado para armazenar o estado do switch para cada exercício individualmente
  const [switchStates, setSwitchStates] = useState(
    treino.exercicios.map(() => false) // Inicializa com 'false' para cada exercício
  );

  // Função para alternar o estado do switch individualmente
  const toggleSwitch = (index) => {
    let updatedSwitchStates = [...switchStates];  // Faz uma cópia do estado atual
    updatedSwitchStates[index] = !updatedSwitchStates[index];  // Inverte o estado do switch do índice clicado
    setSwitchStates(updatedSwitchStates);  // Atualiza o estado
  };

  // Verifica se o treino possui uma imagem válida, caso contrário, usa uma imagem padrão
  const imageUri = treino.image_text && treino.image_text.trim() !== '' ? treino.image_text : defaultImage;

  return (
    <ScrollView style={styles.container}>
      {/* Usa a imagem do banco de dados ou a imagem padrão */}
      <ImageBackground
        style={{ width: '100%', height: 280, justifyContent: "flex-start" }}
        source={{ uri: imageUri }}
      >
        {/* Botão de voltar com setinha */}
        <TouchableOpacity 
          style={{ marginLeft: 25, marginTop: 45 }} // Ajuste a posição conforme necessário
          onPress={() => navigation.goBack()} // Volta para a tela anterior
        >
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={{ marginLeft: 25 }}>
          {/* <Text style={{ color: '#fff' }}>Objetivo: </Text> */}
        </View>

        <View style={{ flexDirection: "row", marginLeft: 25 }}>
          {/* <Text style={{ color: "#C0BEBE", fontWeight: "bold" }}>Exercícios: </Text> */}
          {/* <Text style={{ color: "#C0BEBE", fontWeight: "bold" }}>Duração: </Text> */}
        </View>
      </ImageBackground>

      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text style={styles.treinoTitle}>{treino.nome_treino}</Text>
          <Text style={styles.GrupoMuscle}> - {treino.grupo_muscular}</Text>
        </View>

        <ScrollView>
          {treino.exercicios.map((exercicio, index) => (
            <View key={index} style={styles.cardTreino}>
              <Image source={SupinoRetoComBarra} style={styles.exercicioImage} />

              {/* Coluna com informações do exercício */}
              <View style={{ flexDirection: "column", marginLeft: 20 }}>
                <View style={{ marginBottom: 7 }}>
                  <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{exercicio.nome_exercicio}</Text>
                </View>

                {/* Linha com detalhes: séries, repetições e carga */}
                <View style={{ flexDirection: "row" }}>
                  {/* Coluna - Séries */}
                  <View style={{ flexDirection: "column", marginEnd: 20 }}>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{exercicio.series}</Text>
                    <Text style={{ color: "#C0BEBE", fontWeight: "bold", fontSize: 12 }}>Séries</Text>
                  </View>

                  {/* Coluna - Repetições */}
                  <View style={{ flexDirection: "column", marginEnd: 20 }}>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>x{exercicio.repeticoes}</Text>
                    <Text style={{ color: "#C0BEBE", fontWeight: "bold", fontSize: 12 }}>Repetições</Text>
                  </View>

                  {/* Coluna - Carga */}
                  <View style={{ flexDirection: "column", marginEnd: 5 }}>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{exercicio.carga}Kg</Text>
                    <Text style={{ color: "#C0BEBE", fontWeight: "bold", fontSize: 12 }}>Carga</Text>
                  </View>

                  {/* Switch para cada exercício */}
                  <View>
                    <Switch
                      value={switchStates[index]}  // O switch se refere ao estado do índice específico
                      onValueChange={() => toggleSwitch(index)}  // Alterna o estado do índice específico
                      thumbColor={switchStates[index] ? "#6a11f5" : "#6a11f5"}
                      trackColor={{ false: "#C0BEBE", true: "#4E11AE" }}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

export default Exercicios;
