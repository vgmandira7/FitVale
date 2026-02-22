import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleClaro from './styleClaro';
import styleEscuro from './styleEscuro';
import { API_IP } from "../../../Services/ipConfig";
import axios from 'axios';

const Treinos = ({ navigation }) => {
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [themeStyle, setThemeStyle] = useState(styleClaro);
  const api = `${API_IP}/pam3etim/apireact/`;

  useEffect(() => {
    async function fetchTreinos() {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Pega o ID do usuário logado
        const response = await axios.get(`${api}GetTreino.php?userId=${userId}`);

        if (response.data && response.data.success) {
          setTreinos(response.data.treinos); // Atualiza o estado com os treinos
        } else {
          Alert.alert("Nenhum treino encontrado", response.data.message || "Erro ao buscar treinos.");
        }
      } catch (error) {
        console.error("Erro ao buscar treinos:", error);
        Alert.alert("Erro", "Erro ao buscar treinos no banco de dados.");
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    }

    fetchTreinos();
  }, []);

  // Função para navegar para a tela de exercícios de um treino específico
  const handleTreinoPress = (treino) => {
    navigation.navigate('Exercises', { treino });
  };

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

  // Renderização condicional: se estiver carregando, mostra uma mensagem, se não, verifica se há treinos
  return (
    <View style={themeStyle.container}>
      {loading ? (
        <Text style={themeStyle.loadingText}>Carregando...</Text> // Exibe enquanto carrega
      ) : (
        <ScrollView>

          <Text style={themeStyle.TreinosText}>Treinos Cadastrados</Text>
          {treinos.length > 0 ? (
            // Se há treinos cadastrados, mostra a lista
            treinos.map((treino, index) => (
              <TouchableOpacity
                key={index}
                style={themeStyle.especificacoesCard}
                onPress={() => handleTreinoPress(treino)}
              >
                <View>
                  <Text style={themeStyle.treinoNome}>{treino.nome_treino}</Text>
                </View>

                <View style={{ marginLeft: 15, alignSelf: "center", justifyContent: "space-between" }}>
                  <Text style={themeStyle.GrupoMuscularTitulo}>Grupo Muscular: </Text>
                  <Text style={themeStyle.grupoMuscular}>{treino.grupo_muscular}</Text>
                </View>

                {/* Exibe o número de exercícios */}
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text style={themeStyle.numeroExercicios}>{treino.total_exercicios}</Text>
                  <Text style={themeStyle.textExercicios}>Exercícios</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={themeStyle.noTreinoContainer}>
              <Text style={themeStyle.noTreinoText}>Nenhum treino encontrado</Text>
              <TouchableOpacity
                style={themeStyle.createButton}
                onPress={() => navigation.navigate('WorkoutMontageAluno')} // Navega para a tela de criação de treino
              >
                <Text style={themeStyle.createButtonText}>Criar Novo Treino</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={themeStyle.createButton}
                onPress={() => navigation.navigate('TechnicalSheet')} // Navega para a tela de criação de treino
              >
                <Text style={themeStyle.createButtonText}>Emitir Ficha de Treino</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Treinos;
