import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dolar from "../../../assets/dolar.png";
import ImgPendente from "../../../assets/pendente.png";
import ImgPago from "../../../assets/pago.png";
import ImgVencido from "../../../assets/vencido.png";
import styleClaro from './styleClaro';
import styleEscuro from './styleEscuro';
import { API_IP } from "../../Services/ipConfig"

const PagamentosScreen = ({ navigation }) => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [focusedButton, setFocusedButton] = useState('pendente'); // Botão selecionado
  const [temPendente, setTemPendente] = useState(false);
  const [temPago, setTemPago] = useState(false);
  const [temVencido, setTemVencido] = useState(false);
  const [themeStyle, setThemeStyle] = useState(styleClaro);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          console.error("User ID não encontrado");
          return;
        }

        // Requisição para a API PHP com userId na URL
        const response = await fetch(`${API_IP}/pam3etim/apireact/StatusPayments.php?userId=${userId}`);

        if (!response.ok) {
          throw new Error(`Erro na resposta da rede: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dados recebidos da API:', data);

        // Verificar se há status de pagamento
        setTemPendente(data.some(aluno => aluno.StatusPagamento === 'pendente'));
        setTemPago(data.some(aluno => aluno.StatusPagamento === 'pago'));
        setTemVencido(data.some(aluno => aluno.StatusPagamento === 'vencido'));

        setAlunos(data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setAlunos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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


  const formatarData = (data) => {
    const dataObj = new Date(data);
    return new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(dataObj);
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const filterAlunosByStatus = (status) => {
      return alunos.filter(aluno => aluno.StatusPagamento === status);
    };

    switch (focusedButton) {
      case 'pendente':
        return temPendente ? (
          filterAlunosByStatus('pendente').map((aluno, index) => (
            <View key={index} style={themeStyle.Conteudo}>
              <View style={themeStyle.card}>
                <Image style={themeStyle.ImgPendente} source={ImgPendente} />
                <View style={{ flexDirection: "column" }}>
                  <Text style={themeStyle.text}>Mensalidade Ref: {formatarData(aluno.PagamentoData)}</Text>
                  <Text style={themeStyle.text}>Musculação</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={themeStyle.emptyStateContainer}>
            <View style={themeStyle.emptyStateBox}>
              <Image source={Dolar} />
            </View>
            <Text style={themeStyle.emptyStateText}>Não há nenhum pagamento pendente</Text>
          </View>
        );
      case 'pagos':
        return temPago ? (
          filterAlunosByStatus('pago').map((aluno, index) => (
            <View key={index} style={themeStyle.Conteudo}>
              <View style={themeStyle.card}>
                <Image style={themeStyle.ImgPago} source={ImgPago} />
                <View style={{ flexDirection: "column" }}>
                  <Text style={themeStyle.text}>Mensalidade Ref: {formatarData(aluno.PagamentoData)}</Text>
                  <Text style={themeStyle.text}>Musculação</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={themeStyle.emptyStateContainer}>
            <View style={themeStyle.emptyStateBox}>
              <Image source={Dolar} />
            </View>
            <Text style={themeStyle.emptyStateText}>Não há nenhum pagamento pago</Text>
          </View>
        );
      case 'vencidos':
        return temVencido ? (
          filterAlunosByStatus('vencido').map((aluno, index) => (
            <View key={index} style={themeStyle.Conteudo}>
              <View style={themeStyle.card}>
                <Image style={themeStyle.ImgVencido} source={ImgVencido} />
                <View style={{ flexDirection: "column" }}>
                  <Text style={themeStyle.text}>Mensalidade Ref: {formatarData(aluno.PagamentoData)}</Text>
                  <Text style={themeStyle.text}>Musculação</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={themeStyle.emptyStateContainer}>
            <View style={themeStyle.emptyStateBox}>
              <Image source={Dolar} />
            </View>
            <Text style={themeStyle.emptyStateText}>Não há nenhum pagamento vencido</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={themeStyle.container}>
      <View style={themeStyle.Navbar}>
        <Text style={themeStyle.textoNav}>Pagamentos</Text>
        
        <View style={themeStyle.paymentStatusContainer}>



          <TouchableOpacity 
            onPress={() => setFocusedButton('pendente')} 
            style={[
              themeStyle.butao, 
              focusedButton === 'pendente' && themeStyle.FocuNobutao // Aplica o estilo se estiver focado
            ]}
          >
            <Text style={[themeStyle.paymentOptionText, focusedButton === 'pendente' && themeStyle.activeButtonText]}>
              Pendente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setFocusedButton('pagos')} 
            style={[
              themeStyle.butao, 
              focusedButton === 'pagos' && themeStyle.FocuNobutao // Aplica o estilo se estiver focado
            ]}
          >
            <Text style={[themeStyle.paymentOptionText, focusedButton === 'pagos' && themeStyle.activeButtonText]}>
              Pagos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setFocusedButton('vencidos')} 
            style={[
              themeStyle.butao, 
              focusedButton === 'vencidos' && themeStyle.FocuNobutao // Aplica o estilo se estiver focado
            ]}
          >
            <Text style={[themeStyle.paymentOptionText, focusedButton === 'vencidos' && themeStyle.activeButtonText]}>
              Vencidos
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>

      {renderContent()}
    </View>
  );
};

export default PagamentosScreen;
