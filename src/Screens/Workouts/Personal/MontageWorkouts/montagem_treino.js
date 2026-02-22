import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Image, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FotoAluno from "../../../../../assets/Vitor-Aluno.png";
import adicionar from "../../../../../assets/adicionar.png";
import pesquisar from "../../../../../assets/Pesquisar.png";
import lixeira from "../../../../../assets/lixeira.png";
import { useNavigation, useRoute } from '@react-navigation/native';
import { API_IP } from "../../../../Services/ipConfig";

export default function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [exercicios, setExercicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listaExercicios, setListaExercicios] = useState([]);
    const [series, setSeries] = useState('');
    const [repeticoes, setRepeticoes] = useState('');
    const [carga, setCarga] = useState('');
    const [nomeTreino, setNomeTreino] = useState('');
    const [grupoMuscular, setGrupoMuscular] = useState('');
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { alunoId } = route.params; // Recebe o alunoId da rota

    useEffect(() => {
        const fetchexercicios = async () => {
            try {
                const response = await fetch(`${API_IP}/pam3etim/apireact/GetExercicios.php`);
                const data = await response.json();

                if (Array.isArray(data.exercicios) && data.exercicios.length > 0) {
                    setExercicios(data.exercicios);
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

    const adicionarExercicio = (exercicio) => {
        const novoExercicio = {
            ...exercicio,
            series,
            repeticoes,
            carga,
        };

        setListaExercicios([...listaExercicios, novoExercicio]);
        setModalVisible(false);
        setSeries('');
        setRepeticoes('');
        setCarga('');
    };

    const removerExercicio = (index) => {
        const novaLista = [...listaExercicios];
        novaLista.splice(index, 1);
        setListaExercicios(novaLista);
    };

    const salvarTreino = async () => {
        try {
            // Obtém o userId no contexto assíncrono
            const userId = await AsyncStorage.getItem('userId'); // Pega o valor armazenado do userId
            
            if (!userId) {
                Alert.alert('Erro', 'Usuário não identificado!');
                return;
            }
    
            let formData = new FormData();
    
            // Adiciona a imagem se houver
            if (image) {
                let filename = image.split('/').pop();
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : image;
    
                formData.append('photo', { uri: image, name: filename, type });
            }
    
            // Adiciona os dados do treino
            formData.append('nome_treino', nomeTreino);
            formData.append('grupo_muscular', grupoMuscular);
            formData.append('exercicios', JSON.stringify(listaExercicios));
            formData.append('aluno_id', alunoId); // Adiciona o alunoId
            formData.append('codInstrutor', userId); // Envia o userId como instrutor_id
    
            // Envia os dados para o servidor
            const response = await fetch(`${API_IP}/pam3etim/apireact/SalvarTreino.php`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            const data = await response.json();
            if (data.status === "success") {
                Alert.alert('Sucesso', 'Treino salvo com sucesso!');
                // Limpar os estados após o sucesso
                setListaExercicios([]);
                setNomeTreino('');
                setGrupoMuscular('');
                setImage(null);
            } else {
                Alert.alert('Erro', 'Erro ao salvar treino.');
            }
        } catch (error) {
            console.error('Erro ao salvar treino:', error);
        }
    };
    
    

    // Função para selecionar imagem da galeria
    async function pickImageFromGallery() {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!res.canceled) {
            setImage(res.assets[0].uri);
        }
    }

    return (
        <ScrollView style={styles.container}>
            {/* Seção de imagem */}
            <TouchableOpacity onPress={pickImageFromGallery}>
                {image ? (
                    <ImageBackground source={{ uri: image }} style={styles.fotoAluno}>
                        {/* Imagem selecionada */}
                    </ImageBackground>
                ) : (
                    <View style={styles.adicionarContainer}>
                        <Image source={adicionar} style={styles.adicionarIcon} />
                    </View>
                )}
            </TouchableOpacity>

            {/* Conteúdo */}
            <View style={{ margin: 25 }}>
                <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>Montagem de Treino</Text>

                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        value={nomeTreino}
                        onChangeText={setNomeTreino}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Grupos Musculares</Text>
                    <TextInput
                        style={styles.input}
                        value={grupoMuscular}
                        onChangeText={setGrupoMuscular}
                    />
                </View>

                {/* Mostrar lista de exercícios */}
                {listaExercicios.length > 0 && (
                    <View style={styles.listaExercicios}>
                        {listaExercicios.map((exercicio, index) => (
                            <View key={index} style={styles.exercicioSelecionado}>
                                <Text style={styles.exercicioNome}>
                                    {exercicio.Nome}
                                </Text>
                                <Text style={styles.exercicioInfo}>
                                    Séries: {exercicio.series}, Repetições: {exercicio.repeticoes}, Carga: {exercicio.carga} Kg
                                </Text>
                                <TouchableOpacity onPress={() => removerExercicio(index)}>
                                    <Image source={lixeira} style={styles.lixeiraIcon} />
                                </TouchableOpacity>
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

                                            <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>

                                            {/* Inputs para séries, repetições e carga */}
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Séries"
                                                placeholderTextColor="#6a11f5" // Altere para a cor desejada
                                                keyboardType="numeric"
                                                onChangeText={setSeries} // Armazena a série
                                            />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Repetições"
                                                placeholderTextColor="#6a11f5"
                                                keyboardType="numeric"
                                                onChangeText={setRepeticoes} // Armazena as repetições
                                            />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Carga"
                                                placeholderTextColor="#6a11f5"
                                                keyboardType="numeric"
                                                onChangeText={setCarga} // Armazena a carga
                                            />

                                        </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text style={styles.loadingText}>Carregando exercícios...</Text>
                                )}
                            </View>

                            {/* Fechar Modal */}
                            <TouchableOpacity
                                style={styles.botaoFecharModal}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>Fechar</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#18191E',
    },
    fotoAluno: {
        width: 393,
        height: 291,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#fff',
        color: "#fff",
        fontWeight: "bold",


    },
    modalContainer: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: '#18191E',
        padding: 20,
        borderRadius: 30,
        height: 673,
        marginTop: 100,
    },
    pesquisar: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 13,
        width: 345,
        height: 55,
        backgroundColor: "#242529",
        borderRadius: 14,
        paddingLeft: 25,
        marginTop: 55
    },
    botao: {
        width: 239,
        height: 51,
        backgroundColor: "#6A11F5",
        borderRadius: 14,
        marginTop: 40,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    CardLista: {
        marginTop: 60,
        width: "100%",
        height: 80,
        backgroundColor: "#242529",
        borderRadius: 20,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    NameExercicio: {
        fontWeight: "bold",
        color: "#fff",
    },

    exercicioNome: {
        fontWeight: "bold",
        color: "#fff",
    },

    nameGrupo: {
        fontWeight: "bold",
        color: "#C0BEBE",
    },
    listaExercicios: {
        marginTop: 20
    },
    exercicioSelecionado: {
        backgroundColor: "#242529",
        padding: 15,
        borderRadius: 20,
        marginTop: 10,
        paddingLeft: 20,
    },
        lixeiraIcon: {
        width: 24,
        height: 24,
    },
    adicionarContainer: {
        width: 393,
        height: 291,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#242529', // Cor de fundo enquanto não houver imagem
    },
    adicionarIcon: {
        width: 50,
        height: 50,
        tintColor: '#fff', // Cor do ícone de adição
    },
    label:{
        color: "#fff",
        fontWeight: "bold"
    },
    exercicioInfo: {
        
        color: "#fff",
    }
});