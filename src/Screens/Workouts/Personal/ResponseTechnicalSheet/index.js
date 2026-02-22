import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { API_IP } from "../../../../Services/ipConfig"

export default function App({ navigation }) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownVisible2, setDropdownVisible2] = useState(false);
    const [dropdownVisible3, setDropdownVisible3] = useState(false);
    const [dropdownVisible4, setDropdownVisible4] = useState(false);
    const [dropdownVisible5, setDropdownVisible5] = useState(false);
    const [dropdownVisible6, setDropdownVisible6] = useState(false);
    const [dropdownVisible7, setDropdownVisible7] = useState(false);
    const [dropdownVisible8, setDropdownVisible8] = useState(false);
    const [dropdownVisible9, setDropdownVisible9] = useState(false);
    const [dropdownVisible10, setDropdownVisible10] = useState(false);

    // Estados para armazenar as respostas
    const [fichaTecnica, setFichaTecnica] = useState({
        altura: '',
        peso: '',
        objetivos: '',
        diasTreino: '',
        experiencia: '',
        preferencia: '',
        restricoes: '',
        habitos: '',
        nivelCondicionamento: '',
        Comentarios: ''
    });

    // Função para buscar os dados do banco de dados
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_IP}/pam3etim/apireact/responseTechnical.php?aluno_id=1`); // Ajuste o URL para seu ambiente
                const data = await response.json();
                setFichaTecnica(data); // Armazena os dados retornados no estado
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const toggleDropdown1 = () => setDropdownVisible(!dropdownVisible);
    const toggleDropdown2 = () => setDropdownVisible2(!dropdownVisible2);
    const toggleDropdown3 = () => setDropdownVisible3(!dropdownVisible3);
    const toggleDropdown4 = () => setDropdownVisible4(!dropdownVisible4);
    const toggleDropdown5 = () => setDropdownVisible5(!dropdownVisible5);
    const toggleDropdown6 = () => setDropdownVisible6(!dropdownVisible6);
    const toggleDropdown7 = () => setDropdownVisible7(!dropdownVisible7);
    const toggleDropdown8 = () => setDropdownVisible8(!dropdownVisible8);
    const toggleDropdown9 = () => setDropdownVisible9(!dropdownVisible9);
    const toggleDropdown10 = () => setDropdownVisible10(!dropdownVisible10);

    return (
        <ScrollView style={styles.container}>
            <View style={{ margin: 25 }}>
                {/* Botão de Voltar */}
                <TouchableOpacity 
                    style={{marginTop: 25 }}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                
                <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold", marginTop: 20 }}>
                    Respostas para ficha técnica
                </Text>

                {/* Dropdown 1 */}
                <TouchableOpacity onPress={toggleDropdown1} style={styles.dropdownButton}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Altura(cm)</Text>
                </TouchableOpacity>
                {dropdownVisible && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownItem}>{fichaTecnica.altura || 'Carregando...'}</Text>
                    </View>
                )}

                {/* Dropdown 2 */}
                <TouchableOpacity onPress={toggleDropdown2} style={styles.dropdownButton}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Peso(kg)</Text>
                </TouchableOpacity>
                {dropdownVisible2 && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownItem}>{fichaTecnica.peso || 'Carregando...'}</Text>
                    </View>
                )}

                {/* Dropdown 3 */}
                <TouchableOpacity onPress={toggleDropdown3} style={styles.dropdownButton}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Objetivos</Text>
                </TouchableOpacity>
                {dropdownVisible3 && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownItem}>{fichaTecnica.objetivos || 'Carregando...'}</Text>
                    </View>
                )}

                {/* Dropdown 4 */}
                <TouchableOpacity onPress={toggleDropdown4} style={styles.dropdownButton}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Quantos dias semanais de treino</Text>
                </TouchableOpacity>
                {dropdownVisible4 && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownItem}>{fichaTecnica.diasTreino || 'Carregando...'}</Text>
                    </View>
                )}

                {/* Dropdown 5 */}
                <TouchableOpacity onPress={toggleDropdown5} style={styles.dropdownButton}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Experiência com treinamento físico</Text>
                </TouchableOpacity>
                {dropdownVisible5 && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownItem}>{fichaTecnica.experiencia || 'Carregando...'}</Text>
                    </View>
                )}

                {/* Dropdown 6 */}
                <TouchableOpacity onPress={toggleDropdown6} style={styles.dropdownButton}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Preferência por exercícios</Text>
                </TouchableOpacity>
                {dropdownVisible6 && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownItem}>{fichaTecnica.preferencia || 'Carregando...'}</Text>
                    </View>
                )}

                {/* Dropdown 7 */}
                <TouchableOpacity onPress={toggleDropdown7} style={styles.dropdownButton}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Restrições físicas</Text>
                </TouchableOpacity>
                {dropdownVisible7 && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownItem}>{fichaTecnica.restricoes || 'Carregando...'}</Text>
                    </View>
                )}

                {/* Dropdown 8 */}
                <TouchableOpacity onPress={toggleDropdown8} style={styles.dropdownButton}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Hábitos alimentares</Text>
                </TouchableOpacity>
                {dropdownVisible8 && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownItem}>{fichaTecnica.habitos || 'Carregando...'}</Text>
                    </View>
                )}

                {/* Dropdown 9 */}
                <TouchableOpacity onPress={toggleDropdown9} style={styles.dropdownButton}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Nível de condicionamento</Text>
                </TouchableOpacity>
                {dropdownVisible9 && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownItem}>{fichaTecnica.nivelCondicionamento || 'Carregando...'}</Text>
                    </View>
                )}

                {/* Dropdown 10 */}
                <TouchableOpacity onPress={toggleDropdown10} style={styles.dropdownButton}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>Comentários adicionais</Text>
                </TouchableOpacity>
                {dropdownVisible10 && (
                    <View style={styles.dropdown}>
                        <Text style={styles.dropdownItem}>{fichaTecnica.Comentarios || 'Carregando...'}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#18191E',
    },
    dropdownButton: {
        backgroundColor: "#242529",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: "center",
        width: "100%",
        marginTop: 15
    },
    dropdown: {
        backgroundColor: "#6a11f5",
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        width: "100%",
    },
    dropdownItem: {
        color: "#fff",
        fontSize: 14,
        paddingVertical: 5,
    }
});
