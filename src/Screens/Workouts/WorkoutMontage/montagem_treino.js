import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import FotoAluno from "../../../../assets/Vitor-Aluno.png";
import adicionar from "../../../../assets/adicionar.png";
import pesquisar from "../../../../assets/Pesquisar.png";
import { useNavigation } from '@react-navigation/native';
import styles from "./style";
import { API_IP } from "../../../Services/ipConfig";

export default function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [exercicios, setExercicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listaExercicios, setListaExercicios] = useState([]); // Estado para armazenar a lista de exercícios selecionados
    const [series, setSeries] = useState(''); // Estado para armazenar as séries
    const [repeticoes, setRepeticoes] = useState(''); // Estado para armazenar as repetições
    const [carga, setCarga] = useState(''); // Estado para armazenar a carga

    const navigation = useNavigation();

    useEffect(() => {
        const fetchexercicios = async () => {
            try {
                const response = await fetch(`${API_IP}/pam3etim/apireact/GetExercicios.php`);
                const data = await response.json();
                console.log('Dados da API:', JSON.stringify(data, null, 2)); // Log completo para inspecionar a resposta formatada

                // Verifique se os exercícios estão no formato correto
                if (Array.isArray(data.exercicios) && data.exercicios.length > 0) {
                    setExercicios(data.exercicios); // Atualiza os exercícios no estado
                } else {
                    console.error('Nenhum exercício encontrado ou formato incorreto.');
                }
            } catch (error) {
                console.error('Erro ao buscar exercícios:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchexercicios();
    }, []);

    // Função para lidar com a seleção de um exercício
    const adicionarExercicio = (exercicio) => {
        // Adiciona os detalhes do exercício junto com séries, repetições e carga à lista
        const novoExercicio = {
            ...exercicio,
            series,
            repeticoes,
            carga,
        };

        setListaExercicios([...listaExercicios, novoExercicio]); // Adiciona o exercício à lista
        setModalVisible(false); // Fecha o modal
        // Limpa os campos
        setSeries('');
        setRepeticoes('');
        setCarga('');
    };

    // Função para salvar o treino no banco de dados
    const salvarTreino = async () => {
        try {
            const response = await fetch('http://10.68.36.141/pam3etim/apireact/SalvarTreino.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    nome_treino: 'Nome do Treino',
                    grupo_muscular: 'Grupo Muscular',
                    exercicios: JSON.stringify(listaExercicios) // Envia os exercícios como JSON
                }).toString(),
            });

            const data = await response.json();
            if (data.status === "success") {
                alert('Treino salvo com sucesso!');
            } else {
                alert('Erro ao salvar treino.');
            }
        } catch (error) {
            console.error('Erro ao salvar treino:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.fotoAluno} source={FotoAluno}>
                <View style={{ width: 393, height: 291, justifyContent: "flex-end", marginLeft: 25, paddingBottom: 20 }}>
                    <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold", marginBottom: 5 }}>Vitor Gabriel, 18</Text>
                    <Text style={{ fontSize: 12, color: "#C0BEBE", fontWeight: 'bold', marginBottom: 5 }}>Objetivo: Emagrecimento</Text>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 12, color: "#C0BEBE", fontWeight: 'bold' }}>Experiência: </Text>
                        <Text style={{ fontSize: 12, color: "#6A11F5", fontWeight: 'bold' }}>1 ano</Text>
                    </View>
                </View>
            </ImageBackground>

            {/* Conteúdo */}
            <View style={{ margin: 25 }}>
                <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>Montagem de Treino</Text>

                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 13, fontWeight: "bold", color: "#C0BEBE" }}>Nome</Text>
                    <TextInput style={styles.input} underlineColorAndroid="transparent"></TextInput>
                </View>

                <View>
                    <Text style={{ fontSize: 13, fontWeight: "bold", color: "#C0BEBE" }}>Grupos Musculares</Text>
                    <TextInput style={styles.input} underlineColorAndroid="transparent"></TextInput>
                </View>

                {/* Mostrar lista de exercícios selecionados */}
                {listaExercicios.length > 0 && (
                    <View style={styles.listaExercicios}>
                        {listaExercicios.map((exercicio, index) => (
                            <View key={index} style={styles.exercicioSelecionado}>
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                    {exercicio.Nome} 
                                </Text>
                                <Text style={{ color: "#C0BEBE", fontWeight: "bold" }}>
                                    Séries: {exercicio.series}, Repetições: {exercicio.repeticoes}, Carga: {exercicio.carga} Kg
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Botão para abrir o Modal */}
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image style={{ marginTop: 20 }} source={adicionar} />
                </TouchableOpacity>

                {/* Botão para salvar o treino */}
                <TouchableOpacity style={styles.botao} onPress={salvarTreino}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>Salvar Treino</Text>
                </TouchableOpacity>

                

                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <ScrollView style={styles.modalContent}>
                            <TextInput style={styles.pesquisar} placeholder='Digite aqui sua pesquisa '>
                                <Image source={pesquisar} />
                                <Text>Pesquise o exercício aqui</Text>
                            </TextInput>
                            <View>
                                {/* Lista de Exercícios */}
                                {!loading && exercicios.length > 0 ? (
                                    exercicios.map((exercicio, index) => (
                                        <TouchableOpacity
                                            style={styles.CardLista}
                                            key={index}
                                            onPress={() => adicionarExercicio(exercicio)} // Ação ao selecionar exercício
                                        >
                                            <Text style={styles.NameExercicio}>{exercicio.Nome}</Text>
                                            <Text style={styles.nameGrupo}>{exercicio.GrupoMuscular}</Text>

                                            {/* Inputs para séries, repetições e carga */}
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Séries"
                                                keyboardType="numeric"
                                                onChangeText={setSeries} // Armazena a série
                                            />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Repetições"
                                                keyboardType="numeric"
                                                onChangeText={setRepeticoes} // Armazena as repetições
                                            />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Carga (Kg)"
                                                keyboardType="numeric"
                                                onChangeText={setCarga} // Armazena a carga
                                            />
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text style={{ color: '#fff' }}>Nenhum exercício encontrado.</Text>
                                )}
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        </View>
    );
}

