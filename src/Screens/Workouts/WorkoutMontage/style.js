import { StyleSheet,  } from 'react-native';
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#18191E',
  },
  fotoAluno: {
      width: 393,
      height: 291
  },
  input: {
      fontSize: 16,
      borderBottomWidth: 1,
      borderColor: '#fff',
      color: "#fff",
      fontWeight: "bold"
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
  }
});

export default styles;