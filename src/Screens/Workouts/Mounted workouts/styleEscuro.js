import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#18191E',
      padding: 20,
    },
    loadingText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
    },
    especificacoesCard: {
      backgroundColor: '#242529',
      borderRadius: 10,
      padding: 20,
      marginBottom: 15,
      flexDirection: "row",
      justifyContent: "space-around"
    },
    treinoNome: {
      fontSize: 35,
      color: '#6A11F5',
      fontWeight: 'bold',
      alignSelf: "center"
    },
    grupoMuscular: {
      fontSize: 14,
      color: '#C0BEBE',
      marginTop: 10,
    },
    dataCriacao: {
      fontSize: 14,
      color: '#C0BEBE',
      marginTop: 5,
    },
    noTreinoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
    },
    noTreinoText: {
      fontSize: 18,
      color: '#fff',
      marginBottom: 20,
    },
    createButton: {
      backgroundColor: '#6A11F5',
      padding: 15,
      borderRadius: 10,
    },
    createButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    GrupoMuscularTitulo:{
      color: "#fff", 
      fontWeight: "bold",
    },
    numeroExercicios:{
      fontSize: 25,
      color: '#6A11F5',
      fontWeight: 'bold',
      
    },
    TreinosText:{
      color: "#fff",
      fontWeight: "bold",
      fontSize: 25,
      marginBottom: 35
    },
    textExercicios: {
      color: "#C0BEBE", 
      fontWeight: "bold" 
    }
  });
  export default styles;
  