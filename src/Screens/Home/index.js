import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_IP } from "../../Services/ipConfig";

import styleHero from './styleEscuro';
import inicialImage from "../../../assets/inicialImage.png";

const HomeScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState('');
  const [instrutores, setInstrutores] = useState([]); // AGORA VEM DO BANCO


    // DEPOIMENTOS DOS ALUNOS (IGUAL DA IMAGEM)
  const depoimentos = [
    {
      id: 1,
      nome: "Marcos P.",
      texto:
        "Melhor academia que já frequentei! Os instrutores são muito atenciosos e os treinos são excelentes.",
      tempo: "2 semanas atrás",
    },
    {
      id: 2,
      nome: "Fernanda L.",
      texto:
        "Em 3 meses já senti uma diferença enorme no meu corpo e na minha disposição. Super recomendo!",
      tempo: "1 mês atrás",
    },
    {
      id: 3,
      nome: "Lucas R.",
      texto:
        "Ambiente incrível, equipamentos novos e profissionais de primeira. Nota 10!",
      tempo: "3 semanas atrás",
    },
  ];
  // TREINOS (mantido igual)
  const treinos = [
    {
      id: 1,
      titulo: "Treino de Força",
      descricao: "Foco em hipertrofia e ganho de massa muscular",
      nivel: "Intermediário",
      tempo: "60 min",
      kcal: "450 kcal",
    },
    {
      id: 2,
      titulo: "HIIT Cardio",
      descricao: "Alta intensidade para queimar gordura rapidamente",
      nivel: "Avançado",
      tempo: "30 min",
      kcal: "380 kcal",
    },
    {
      id: 3,
      titulo: "Full Body",
      descricao: "Treino completo para todo o corpo em uma sessão",
      nivel: "Iniciante",
      tempo: "50 min",
      kcal: "400 kcal",
    },
    {
      id: 4,
      titulo: "Core & Abs",
      descricao: "Fortalecimento do core e definição abdominal",
      nivel: "Todos os níveis",
      tempo: "25 min",
      kcal: "200 kcal",
    },
  ];

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');

        if (!userId) return;

        const response = await fetch(
          `${API_IP}/pam3etim/apireact/GetProfile.php`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `user_id=${encodeURIComponent(userId)}`,
          }
        );

        const data = await response.json();

        if (!data.error) {
          setNome(data.Nome);
          setImagem(data.Imagem);
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    const fetchInstrutores = async () => {
      try {
        const response = await fetch(
          `${API_IP}/pam3etim/apireact/GetInstrutores.php`
        );

        const data = await response.json();
        setInstrutores(data);
      } catch (error) {
        console.error('Erro ao buscar instrutores:', error);
      }
    };

    fetchUserInfo();
    fetchInstrutores();
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "#020617" }}
      showsVerticalScrollIndicator={false}
    >
      {/* ================= HERO ================= */}
      <View style={styleHero.heroContainer}>
        <Image
          source={inicialImage}
          style={styleHero.backgroundImage}
        />

        <View style={styleHero.overlay} />

        <View style={styleHero.content}>
          <Text style={styleHero.smallText}>
            SUA EVOLUÇÃO COMEÇA AQUI
          </Text>

          <Text style={styleHero.title}>
            Transforme seu{" "}
            <Text style={styleHero.highlight}>corpo</Text> e {"\n"}
            sua <Text style={styleHero.highlight}>mente</Text>
          </Text>

          <Text style={styleHero.subtitle}>
            Treinos personalizados, instrutores qualificados e uma comunidade
            que te motiva a ir além.
          </Text>

          <View style={styleHero.buttonContainer}>
            <TouchableOpacity
              style={styleHero.primaryButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styleHero.primaryButtonText}>
                Comece Agora
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styleHero.secondaryButton}
              onPress={() => navigation.navigate('Treinos')}
            >
              <Text style={styleHero.secondaryButtonText}>
                Ver Treinos
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* ================= FIM HERO ================= */}

      {/* ================= INSTRUTORES (DINÂMICO DO BANCO) ================= */}
      <View style={styleHero.instrutoresSection}>
        <Text style={styleHero.instrutoresTitulo}>
          Nossos <Text style={styleHero.highlight}>Instrutores</Text>
        </Text>

        <Text style={styleHero.instrutoresSubtitulo}>
          Profissionais certificados prontos para te guiar na sua jornada.
        </Text>

        <View style={styleHero.cardsContainer}>
          {instrutores.map((item) => (
            <View key={item.CodAluno} style={styleHero.card}>

              {/* FOTO DO BANCO */}
              {item.Imagem ? (
                <Image
                  source={{ uri: item.Imagem }}
                  style={styleHero.avatarCircle}
                />
              ) : (
                <View style={styleHero.avatarCircle}>
                  <Text style={styleHero.avatarText}>
                    {item.Nome?.substring(0, 2).toUpperCase()}
                  </Text>
                </View>
              )}

              {/* NOME DO BANCO */}
              <Text style={styleHero.nomeInstrutor}>
                {item.Nome}
              </Text>

              {/* EMAIL COMO SUBTITULO (PODE TROCAR DEPOIS) */}
              <Text style={styleHero.especialidade}>
                {item.Email}
              </Text>

              {/* RATING FIXO (PODE VIR DO BANCO DEPOIS) */}
              <Text style={styleHero.rating}>
                ⭐ 5.0
              </Text>

              {/* STATUS PADRÃO */}
              <View style={styleHero.statusDisponivel}>
                <Text style={styleHero.statusTextDisponivel}>
                  Disponível
                </Text>
              </View>

            </View>
          ))}
        </View>
      </View>
      {/* ================= FIM INSTRUTORES ================= */}

      {/* ================= TREINOS ================= */}
      <View style={styleHero.treinosSection}>
        <Text style={styleHero.treinosTitulo}>
          Treinos <Text style={styleHero.highlight}>Pré-Montados</Text>
        </Text>

        <Text style={styleHero.treinosSubtitulo}>
          Escolha entre nossos treinos desenvolvidos por profissionais e comece
          hoje mesmo.
        </Text>

        <View style={styleHero.treinosGrid}>
          {treinos.map((treino) => (
            <TouchableOpacity
              key={treino.id}
              style={styleHero.treinoCard}
              onPress={() => navigation.navigate('Treinos')}
            >
              <View style={styleHero.badgeNivel}>
                <Text style={styleHero.badgeText}>
                  {treino.nivel}
                </Text>
              </View>

              <Text style={styleHero.treinoTitulo}>
                {treino.titulo}
              </Text>

              <Text style={styleHero.treinoDescricao}>
                {treino.descricao}
              </Text>

              <View style={styleHero.treinoInfoRow}>
                <Text style={styleHero.infoText}>
                  ⏱ {treino.tempo}
                </Text>

                <Text style={styleHero.infoText}>
                  🔥 {treino.kcal}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* ================= FIM TREINOS ================= */}
      {/* ================= DEPOIMENTOS DOS ALUNOS ================= */}
      <View style={styleHero.depoimentosSection}>
        <Text style={styleHero.depoimentosTitulo}>
          O que nossos <Text style={styleHero.highlight}>alunos</Text> dizem
        </Text>

        <Text style={styleHero.depoimentosSubtitulo}>
          Histórias reais de transformação e resultados.
        </Text>

        <View style={styleHero.depoimentosContainer}>
          {depoimentos.map((item) => (
            <View key={item.id} style={styleHero.depoimentoCard}>
              
              {/* ESTRELAS */}
              <Text style={styleHero.estrelas}>★★★★★</Text>

              {/* ASPAS DECORATIVAS */}
              <Text style={styleHero.aspas}>”</Text>

              {/* TEXTO DO DEPOIMENTO */}
              <Text style={styleHero.depoimentoTexto}>
                "{item.texto}"
              </Text>

              {/* RODAPÉ DO CARD */}
              <View style={styleHero.depoimentoFooter}>
                <Text style={styleHero.depoimentoNome}>
                  {item.nome}
                </Text>

                <Text style={styleHero.depoimentoTempo}>
                  {item.tempo}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      {/* ================= FIM DEPOIMENTOS ================= */}
    </ScrollView>
  );
};

export default HomeScreen;