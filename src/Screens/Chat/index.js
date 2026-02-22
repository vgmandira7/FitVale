import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_IP } from "../../Services/ipConfig"; // Certifique-se de que a URL esteja correta
import styleClaro from './styleClaro';
import styleEscuro from './styleEscuro';
import fotoSistema from '../../../assets/fotoSistema.png'

const Chat = ({ navigation }) => {
  const [dados, setDados] = useState([]); // Dados dos usuários que iniciaram conversas
  const [usuariosConversasIniciadas, setUsuariosConversasIniciadas] = useState([]); // Informações completas dos usuários
  const [imagem, setImagem] = useState(""); // Imagem do usuário atual
  const [focusedButton, setFocusedButton] = useState('conversas'); // Botão ativo
  const [themeStyle, setThemeStyle] = useState(styleClaro);

  // Função para listar os IDs dos usuários que iniciaram conversas
  async function listarDados() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;
      const url = `${API_IP}/pam3etim/apireact/Chat/chat/listar_id.php?id=${userId}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) setDados(data.result);
    } catch (error) {
      console.log('Erro ao listar dados: ' + error);
    }
  }

  // Função para enviar os IDs para Conversas_iniciadas.php e obter Nome e Imagem dos usuários
  async function enviarConversasIniciadas() {
    try {
      if (dados.length === 0) return;
  
      // Verificar se os dados contêm idPersonal ou idUsuario
      const ids = dados.map(item => item.idPersonal || item.idUsuario).join(',');
  
      const url = `${API_IP}/pam3etim/apireact/Chat/chat/Conversas_iniciadas.php?ids=${ids}`;
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.success) setUsuariosConversasIniciadas(data.result);
    } catch (error) {
      console.log('Erro ao enviar dados: ' + error);
    }
  }
  

  // useEffect para buscar os dados quando o componente monta
  useEffect(() => {
    listarDados();
    buscarImagemPerfil();
  }, []);

  // useEffect para chamar enviarConversasIniciadas assim que os dados estiverem disponíveis
  useEffect(() => {
    if (dados.length > 0) enviarConversasIniciadas();
  }, [dados]);

  // Polling: Atualiza os dados periodicamente
  useEffect(() => {
    const intervalo = setInterval(() => {
      listarDados();
      enviarConversasIniciadas();
    }, 5000); // Atualiza a cada 5 segundos
    return () => clearInterval(intervalo);
  }, []);


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


  // Função para renderizar cada item (usuário)
  const renderUsuario = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatView', { emoji: "😀" })}
      style={{ flexDirection: "row", marginTop: 15 }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: item.Imagem || "default-image-url" }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={themeStyle.NomeContato}>{item.Nome}</Text>
      </View>
    </TouchableOpacity>
  );

  // Função para mudar o foco dos botões
  const handleButtonPress = (button) => {
    setFocusedButton(button);
  };


  async function buscarImagemPerfil() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;
  
      const url = `${API_IP}/pam3etim/apireact/GetProfile.php`; // Endereço PHP que retorna os dados do usuário
  
      // Alterar para enviar como 'application/x-www-form-urlencoded'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Correto para enviar dados via POST
        },
        body: `user_id=${userId}`, // Corpo da requisição com os parâmetros
      });
  
      const data = await response.json();
  
      if (data.Imagem) {
        setImagem(data.Imagem); // Atualiza a imagem do perfil do usuário
      } else {
        setImagem('http://192.168.1.73/pam3etim/apireact/img/perfilMurilo.png'); // Imagem padrão
      }
    } catch (error) {
      console.log('Erro ao buscar a imagem do perfil: ' + error);
    }
  }
  



  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.Navbar}>
        <View>
          <Text style={themeStyle.textoNav}>Chat</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image style={themeStyle.ProfileImage} source={{ uri: imagem }} />
        </TouchableOpacity>
      </View>

      <View style={themeStyle.conteudo}>
        <View style={themeStyle.iconesCima}>
          <Text style={themeStyle.textAtividade}>
            Atividade
          </Text>
        </View>

        <View style={themeStyle.botoesConversas}>
          <TouchableOpacity
            style={focusedButton === 'conversas' ? themeStyle.conversasFoco : themeStyle.conversasDesfoco}
            onPress={() => handleButtonPress('conversas')}
          >
            <Text style={{ alignSelf: "center", color: "#fff", fontWeight: "bold", fontSize: 14 }}>
              Conversas ({dados.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={focusedButton === 'sistema' ? themeStyle.conversasFoco : themeStyle.conversasDesfoco}
            onPress={() => handleButtonPress('sistema')}
          >
            <Text style={{ alignSelf: "center", color: "#fff", fontWeight: "bold", fontSize: 14 }}>
              Sistema
            </Text>
          </TouchableOpacity>
        </View>

        {/* Views condicionais para o conteúdo baseado no botão em foco */}
        {focusedButton === 'conversas' && (
          <View style={themeStyle.CardConversas}>
            {usuariosConversasIniciadas.length > 0 ? (
              <FlatList
                data={usuariosConversasIniciadas}
                keyExtractor={(item) => String(item.CodUsuario)}
                renderItem={renderUsuario}
              />
            ) : (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>
                Nenhum dado encontrado.
              </Text>
            )}
          </View>
        )}

        {focusedButton === 'sistema' && (
          <View style={themeStyle.CardSistema}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChatView', { emoji: "😀" })}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image
                style={themeStyle.fotoPerfil}
                source={fotoSistema}
              />
              <View style={themeStyle.NomePerfil}>
                <Text style={themeStyle.textFitVale}>FitVale</Text>
              </View>
              <Text style={{ color: "#C0BEBE", marginLeft: 90, fontWeight: "bold" }}>23:19</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Chat;
