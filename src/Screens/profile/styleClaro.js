// FeedbackStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  NavBar: {
    width: "100%",
    height: 107,
    backgroundColor: "#6A11F5",
    justifyContent: "center",
    
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  MinhaConta: {
    width: 343,
    alignSelf: "center",
    marginTop: 20,
  },
  Definicao: {
    width: 343,
    alignSelf: "center",
    marginTop: 20,
  },
  Suporte: {
    width: 343,
    alignSelf: "center",
    marginTop: 20,
  },
  section: {
    width: "100%",
    height: 53,
    backgroundColor: "#c9c9c9",
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  sectionText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 11,
  },
  subSectionText: {
    color: "#6a11f5",
    fontWeight: "bold",
    fontSize: 8,
    marginTop: 4,
  },
  botaoSair: {
    width: 247,
    height: 41,
    borderRadius: 10,
    backgroundColor: "#6a11f5",
    alignSelf: "center",
    marginTop: 53,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 1
  },
  ProfileImage:{
    width: 65,
    height: 65,
    borderRadius: 100
  },
  textProfile:{
    color: "#000", fontWeight: "bold", fontSize: 11
  }
});

export default styles;
