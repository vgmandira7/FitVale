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
    height: 107,
    flexDirection: "row",
    padding: 25,
    justifyContent: "space-between",
  },
  Buttoninstrutor:{
    width: 95,
    height: 135,
    backgroundColor: "#6A11F5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginRight: 15
  
  },
  Buttondetalhes:{
    width: 167,
    height: 22,
    backgroundColor:'#6A11f5',
    borderRadius:20,
    marginTop:10,
  
  },

  detalhes:{
    fontWeight: "bold", 
    color: "#fff", 
    fontSize: 15,
    alignSelf:'center',
  },
  Buttonfeedback:{
    width:310,
    height:31,
    // backgroundColor:'#24262E',
    borderRadius: 7,
    marginTop: 40,
    alignSelf:'center',
  },
  Buttonrealfeedback:{
    width: "100%",
    height:120,
    backgroundColor:'#6a11f5',
    borderRadius: 5,
    marginTop: 10,
    
    padding: 10
  },

  Conteudo: {
    padding: 25,
  },
  welcomeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 23,
  },
  sectionHeader: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionHeaderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  sectionHeaderLink: {
    color: "#6A11f5",
    fontWeight: "bold",
    fontSize: 15,
  },
  scrollView: {
    marginTop: 23,
    flexDirection: "row",
  },
  imageCard: {
    borderRadius: 15,
    marginRight: 18,
  },
  WorkoutLevels:{
    height: 280,
    width: 350,
    marginTop: 35
    
    
  },
  ButtonFocus:{
    width: 105,
    height: 35,
    backgroundColor: "#6a11f5",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  ButtonUnfocus:{
    width: 105,
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#6a11f5"
  },
  ContentView:{
    width: 360,
    height: 135,
    
    marginTop: 30
  },
  ImgHome:{
    width: 360,
    height: 135,
    borderRadius: 20
  },
  instrutoresDisponiveis: {
    color: "#000", 
    fontWeight: "bold", 
    fontSize: 17, 
    marginTop: 40, 
    alignSelf: "center" 
  }
});

export default styles;
