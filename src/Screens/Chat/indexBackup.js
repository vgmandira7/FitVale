import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import chat from "../../../assets/chat.png";
import perfil from "../../../assets/Perfil.png"; // Imagem padrão caso não haja uma do banco de dados
// import themeStyle from './style'; // Importe os estilos do novo arquivo
import fotoSistema from "../../../assets/fotoSistema.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleClaro from './styleClaro';
import styleEscuro from './styleEscuro';
import { API_IP } from "../../Services/ipConfig"

const Chat = ({ navigation }) => {
  const [dados, setDados] = useState([]); // Estado para armazenar os dados
  const [focusedButton, setFocusedButton] = useState('conversas'); // Estado para controlar o botão em foco
  const[imagem, setImagem] = useState("");
  const [themeStyle, setThemeStyle] = useState(styleClaro);

  // Função para buscar os dados do PHP
  async function listarDados() {
    try {
      
      const response = await fetch(`${API_IP}/pam3etim/apireact/ListarUsuarios.php`);
      const data = await response.json(); // Converte o response em JSON
      setDados(Array.isArray(data) ? data : []); // Verifica se 'data' é um array
    } catch (error) {
      console.log('Erro ao listar dados: ' + error);
    }
  }

  // useEffect para buscar os dados quando o componente monta
  useEffect(() => {

    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_id');  // Obtém o ID do usuário do AsyncStorage
        const response = await fetch(`${API_IP}pam3etim/apireact/GetProfile.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `user_id=${userId}`,  // Envia o ID do usuário
        });
        const data = await response.json();
        if (!data.error) {
          setImagem(data.Imagem);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    };

    fetchUserInfo();
    listarDados();
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
        style={themeStyle.ProfileImage} 
        source={{ uri: item.Imagem}} // Verifica se há uma imagem no banco de dados, caso contrário usa a padrão
      />
      <View style={themeStyle.NomePerfil}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{item.Nome}</Text>
      </View>
      <Text style={{ color: "#C0BEBE", marginLeft: 90, fontWeight: "bold" }}>23:19</Text>
    </TouchableOpacity>
  );

  // Função para mudar o foco dos botões
  const handleButtonPress = (button) => {
    setFocusedButton(button);
  };

  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.Navbar}>

        <View >
        <Text style={themeStyle.textoNav}>Chat</Text>
        </View>

        <TouchableOpacity  onPress={() => navigation.navigate("Profile")} >
        <Image style={themeStyle.ProfileImage} source={{ uri: imagem }} />
        </TouchableOpacity>
      </View>

      <View style={themeStyle.conteudo}>
        <View style={themeStyle.iconesCima}>
          <Text style={{ alignSelf: "center", color: "#fff", fontWeight: "bold", fontSize: 16 }}>Atividade</Text>
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

        {/* Views Condicionais para o conteúdo baseado no botão em foco */}
        {focusedButton === 'conversas' && (
          <View style={themeStyle.CardConversas}>
            {dados.length > 0 ? (
              <FlatList
                data={dados}
                keyExtractor={(item) => String(item.CodUsuario)} // Verifica e converte o CodUsuario para string
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
            style={{ flexDirection: "row", alignItems: "center" }}>
            
            <Image 
              style={themeStyle.fotoPerfil} 
              source={fotoSistema} // Verifica se há uma imagem no banco de dados, caso contrário usa a padrão
            />

            <View style={themeStyle.NomePerfil}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>FitVale </Text>
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
