import { StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#18191E',
      
    },
    treinoTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#6a11f5',
      marginBottom: 20,
      marginTop: 25,
      alignSelf: "center"
    },
    cardTreino: {
      width: "100%",
      height: 98,
      backgroundColor: "#242529",
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 15,
      marginTop: 10,
      borderRadius: 14,
    },
    exercicioImage: {
      width: 60,
      height: 60,
      borderRadius: 10,
      backgroundColor: '#ccc', // Placeholder color se a imagem não carregar
    },

    GrupoMuscle:{
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
      marginTop: 25,
      fontSize: 24,
    }
  });

  export default styles;