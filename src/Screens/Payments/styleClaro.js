// PagamentosScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Navbar: {
    backgroundColor: "#6A11F5",
    width: 393,
    height: 157,
    padding: 25,
    justifyContent: "flex-end",
  },
  textoNav: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 20,
    marginBottom: 31,
  },
  comment: {
    marginEnd: 30,
  },
  botao: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  botaoClicado: {
    backgroundColor: 'green',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
  paymentStatusContainer: {
    backgroundColor: "#5411BC",
    width: 341,
    height: 29,
    alignSelf: "flex-end",
    borderBottomLeftRadius: 70,
    borderTopLeftRadius: 70,
    borderBottomRightRadius: 70,
    borderTopRightRadius: 70,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignSelf: "center"
  },
  paymentStatusButton: {
    backgroundColor: "#fff",
    width: 111,
    height: 29,
    alignSelf: "flex-start",
    borderRadius: 70,
    justifyContent: "center",
  },
  paymentStatusButtonText: {
    fontSize: 15,
    color: "#6A11F5",
    fontWeight: "bold",
    alignSelf: 'center',
  },
  paymentOptionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  emptyStateContainer: {
    alignItems: 'center',
    height: 680,
    width: 393,
    justifyContent: 'center',
    marginTop: -60,
  },
  emptyStateBox: {
    width: 100,
    height: 95,
    backgroundColor: "#6A11F5",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginTop: 10,
  },
  Conteudo:{
    alignItems: "center",
    margin: 25,
  },
  card:{
    width: 331, 
    height: 75,
    backgroundColor: "#6a11f5",
    borderRadius: 15,
    marginTop: 50,
    paddingTop: 5,
    flexDirection: "row",
    paddingLeft: 15,
    alignItems: "center",
    
  },
  text:{
    fontWeight: "bold",
    color: "#000",
    marginLeft: 20
  },
  ImgPendente:{
    width: 45,
    height: 45,
    
    
  },

  
  paymentStatusButton: {
    backgroundColor: "#fff",
    width: 111,
    height: 29,
    alignSelf: "flex-start",
    borderRadius: 70,
    justifyContent: "center",
  },
  // Estilo para quando o botão está focado
  paymentStatusButtonFocused: {
    backgroundColor: "#fff",  // Mesmo fundo
    width: 111,
    height: 29,
    
    borderRadius: 70,
    justifyContent: "center",
    borderColor: "#6A11F5",  // Cor de borda ou outro detalhe
    borderWidth: 2,
  },
  
  paymentButton: {
    
    alignSelf: 'center',
    
  },
  focusedButton: {
    backgroundColor: "#fff",
    width: 111,
    height: 29,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 70,
    justifyContent: "center",
  },
  paymentOptionText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: "bold"
  },
  activeButtonText: {
    color: '#6a11f5', // Cor diferenciada para o botão ativo
    fontWeight: "bold"
    
  },

  butao:{
    backgroundColor: "#5411BC",
    width: 111,
    height: 29,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 70,
    justifyContent: "center",
  },
  FocuNobutao:{
    backgroundColor: "#fff",
    width: 111,
    height: 29,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 70,
    justifyContent: "center",
  }

  
});




export default styles;
