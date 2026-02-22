import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Menu, Divider, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Perfil from "../../../assets/Perfil.png";
import styles from './style'; // Importe os estilos do novo arquivo
import { API_IP } from "../../Services/ipConfig";

const PagamentosScreen = ({ navigation }) => {
  const [visibleMenus, setVisibleMenus] = useState({});
  const [instrutores, setInstrutores] = useState([]);
  const [userId, setUserId] = useState(null); // Estado para armazenar o ID do usuário logado

  // Função para obter o ID do usuário logado
  const fetchUserId = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
    } catch (error) {
      console.error('Erro ao obter o ID do usuário:', error);
    }
  };

  // Abrir e fechar menus
  const openMenu = (instrutorId) => {
    setVisibleMenus((prev) => ({ ...prev, [instrutorId]: true }));
  };
  const closeMenu = (instrutorId) => {
    setVisibleMenus((prev) => ({ ...prev, [instrutorId]: false }));
  };


  async function listUserData() {

    try {
      const userID = await AsyncStorage.getItem('userId');
      const res = await api.get(`appChat/usuarios/listar_id.php?id=${userID}`);
      setUserData(res.data);

    } catch (error) {
      console.log("Erro ao Listar " + error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);

    }
  }


  // Fetch dos instrutores
  useEffect(() => {
    const fetchInstrutores = async () => {
      try {
        const response = await fetch(`${API_IP}/pam3etim/apireact/ListarUsuarios.php`);
        const data = await response.json();
        setInstrutores(data);
      } catch (error) {
        console.error('Erro ao buscar instrutores:', error);
      }
    };

    fetchInstrutores();
    fetchUserId();
    listUserData(); 
    
  }, []);

  // Formatar nome
  const formatarNome = (nome) => {
    const preposicoes = ["de", "da", "do", "das", "dos", "e"];
    const nomes = nome.split(" ").filter((palavra) => !preposicoes.includes(palavra.toLowerCase()));
    return nomes.slice(0, 2).join(" ");
  };

  // Calcular idade
  const calcularIdade = (dataNasc) => {
    const nascimento = new Date(dataNasc);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  






  // Criar ou abrir chat
  const getChannelName = (userId1, userId2) => {
    const ids = [userId1, userId2].sort();
    return `chat_${ids[0]}_${ids[1]}`;
  };

  const createChannel = async (userID, otherUserID) => {
    const channelName = getChannelName(userID, otherUserID);
    try {
      // Verificando se o canal já existe
      let res = await fetch(`${API_IP}/pam3etim/apireact/Chat/chat/listar.php`);
      let channels = await res.json();
      
      const channelExists = Array.isArray(channels.result) && channels.result.some(channel => channel.channelName === channelName);
  
      if (!channelExists) {
        await fetch(`${API_IP}/pam3etim/apireact/Chat/chat/add.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            channelName: channelName, 
            userID: userID, 
            guiaID: otherUserID 
          }),
        });
      }
    } catch (error) {
      console.error('Erro ao criar/verificar canal:', error);
    }
  };
  

  const handleChatPress = async (instrutor) => {
    if (!userId) {
      Alert.alert('Erro', 'ID do usuário não encontrado. Faça login novamente.');
      return;
    }
  
    try {
      const channelName = getChannelName(userId, instrutor.CodAluno);
      await AsyncStorage.setItem('@channelName', channelName);
      await createChannel(userId, instrutor.CodAluno);
      await AsyncStorage.setItem('@userChatName', instrutor.Nome);
      navigation.navigate('ChatView');  // Navega para a tela de chat
    } catch (error) {
      Alert.alert('Erro ao configurar o chat', error.message);
    }
  };
  

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.Navbar}>
          <Text style={styles.textoNav}>Personal</Text>
          <FontAwesome5 onPress={() => navigation.navigate('Chat')} style={styles.comment} name="comment" size={30} color={"#fff"} />
          <Image source={Perfil} />
        </View>

        <View style={styles.conteudo}>
          <Text style={styles.texto}>Lista de Personais disponíveis</Text>

          {instrutores.map((instrutor) => (
            <TouchableOpacity key={instrutor.CodAluno} style={styles.fundoCard}
              onPress={() => handleChatPress(instrutor)}
            >
              <Image style={styles.fotocard} source={{ uri: instrutor.Imagem || Perfil }} />
              <View style={styles.textosCard}>
                <Text style={styles.texto}>{formatarNome(instrutor.Nome)}</Text>
                <Text style={styles.textoSecundario}>Idade: {calcularIdade(instrutor.DataNasc)}</Text>
                <Text style={styles.textoRoxo}>Email: {instrutor.Email}</Text>
              </View>

              <Menu
                visible={visibleMenus[instrutor.CodAluno]}
                onDismiss={() => closeMenu(instrutor.CodAluno)}
                anchor={
                  <TouchableOpacity onPress={() => openMenu(instrutor.CodAluno)}>
                    <FontAwesome5 name="ellipsis-v" size={20} color="#fff" />
                  </TouchableOpacity>
                }
              >
                <Divider />
                <Menu.Item onPress={() => { handleChatPress(instrutor); closeMenu(instrutor.CodAluno); }} title="Chat" />
              </Menu>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Provider>
  );
};

export default PagamentosScreen;
