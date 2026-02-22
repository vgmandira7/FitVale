import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Navbar: {
    width: 393,
    height: 107,
    backgroundColor: "#6A11F5",
    justifyContent: "center",
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  chat: {
    width: 40,
    height: 40,
    left: 225,
    top: 20,
  },
  perfil: {
    width: 53,
    height: 53,
    
    
  },
  textoNav: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    
  },
  conteudo: {
    marginTop: 50,
    marginStart: 25,
    marginEnd: 25,
  },
  botoesConversas: {
    width: 331,
    height: 29,
    backgroundColor: "#393939",
    alignSelf: "center",
    marginTop: 25,
    borderRadius: 70,
    flexDirection: "row"
  },

  // Estilos para os botões em foco e desfoco
  conversasFoco: {
    width: 166,
    height: 29,
    backgroundColor: "#6A11F5",
    justifyContent: "center",
    borderRadius: 70,
  },

  conversasDesfoco: {
    width: 166,
    height: 29,
    backgroundColor: "#393939",
    justifyContent: "center",
    borderRadius: 70,
  },

  CardConversas: {
    marginTop: 25,
    color: "#000"
  },
  CardSistema: {
    marginTop: 25,
    
  },
  fotoPerfil: {
    height: 50,
    width: 50,
    
  },
  NomePerfil: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20
  },
  ProfileImage:{
    width: 50,
    height: 50,
    borderRadius: 100
  },
  textAtividade: {
    alignSelf: "center", 
    color: "#000", 
    fontWeight: "bold", 
    fontSize: 16 
  },
  textFitVale: {
    color: "#000", 
    fontWeight: "bold" 
  },
  NomeContato: {
    color: "#000", 
    fontWeight: "bold",
    marginLeft: 10
  }
});

export default styles;
