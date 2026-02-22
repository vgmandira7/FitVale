import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { API_IP } from "../../../Services/ipConfig"

export default function App() {
    const navigation = useNavigation();
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSolicitacoes = async () => {
            try {
                const response = await fetch(`${API_IP}/pam3etim/apireact/GetRequests.php`);
                const data = await response.json();
                
                console.log(data); // Verifique o que está retornando da API

                if (data.success) {
                    // Verifique se a propriedade é 'solicitacoes' ou se tem outro nome
                    setSolicitacoes(data.solicitacoes); 
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Erro ao buscar solicitações:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSolicitacoes();
    }, []);

    if (loading) {
        return <Text style={styles.loadingText}>Carregando...</Text>; // Loading enquanto os dados são carregados
    }

    return (
        <View style={styles.container}>
            <View style={styles.Navbar}>
                <Text style={styles.textoNav}>Solicitações de Fichas de Treinos</Text>
                <FontAwesome5 style={styles.comment} name="comment" size={30} color={"#fff"} onPress={() => navigation.navigate('Chat')} />
            </View>

            <View style={{ alignItems: "center" }}>
                {/* Verificação para garantir que existam solicitações antes de renderizar */}
                {solicitacoes && solicitacoes.length > 0 ? (
                    solicitacoes.map((solicitacao, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.CardAlunos}
                            onPress={() => navigation.navigate('WorkoutMontage', { alunoId: solicitacao.CodAluno })} // Navega para a tela de montagem de treino
                        >
                            <View style={{ marginEnd: 25, marginLeft: 25 }}>
                                <Image source={{ uri: solicitacao.Imagem }} style={styles.ProfileImage} />
                            </View>
                            <View>
                                <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>{solicitacao.Nome || 'Nome não disponível'}</Text>
                                <Text style={{ fontWeight: "bold", fontSize: 11, color: "#C0BEBE" }}>
                                    Data de Emissão: {solicitacao.data_emissao ? new Date(solicitacao.data_emissao).toLocaleDateString() : 'Data não disponível'}
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("ResponseTechnicalSheet")}>
                                    <Text style={{ fontWeight: "bold", fontSize: 11, color: "#6A11F5" }}>Ver mais</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={{ color: '#fff' }}>Nenhuma solicitação encontrada.</Text> // Mensagem caso não tenha solicitações
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#18191E',
    },
    Navbar: {
        backgroundColor: "#6A11F5",
        width: "100%",
        height: 107,
        padding: 25,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    textoNav: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        width: 70,
        flex: 1,
        justifyContent: "flex-start",
    },
    CardAlunos: {
        width: 345,
        height: 98,
        backgroundColor: "#242529",
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
    },
    ProfileImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    loadingText: {
        color: "#fff",
        textAlign: "center",
        marginTop: 50,
    },
});
