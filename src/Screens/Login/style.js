// LoginStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonVerify: {
    width: 12,
    height: 12,
    position: "absolute",
    backgroundColor: "#FFF",
    marginTop: 605,
    marginLeft: 220,
  },
  TextLembre: {
    marginLeft: 240,
    marginTop: 600,
    position: "absolute",
    color: "#FFF",
    fontWeight: "bold",
  },
  TextSenhaEsquece: {
    color: "#FFF",
    position: "absolute",
    marginTop: 455,
    marginLeft: 210,
    fontWeight: "bold",
  },
  textLogin: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  layoutBotaoLogin: {
    height: 150,
    width: 200,
    backgroundColor: "#18191E",
    position: "absolute",
    marginTop: 490,
    marginLeft: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  BotaoLogin: {
    width: 290,
    height: 50,
    backgroundColor: "#6A11F5",
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textBotaoLogin: {
    textAlign: "center",
  },
  textEmail: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },
  textSenha: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },
  layoutBackText: {
    width: 200,
    height: 100,
  },
  textBack: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
  },
  layoutBack: {
    width: "100%",
    height: "100%",
    backgroundColor: "#18191E",
  },
  layoutIconBack: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 5,
  },
  textInputEmail: {
    width: 300,
    height: 55,
    borderRadius: 5,
    backgroundColor: "#393939",
    marginLeft: 40,
    paddingLeft: 10,
    color: "#FFF",
  },
  textInputSenha: {
    width: 300,
    height: 55,
    borderRadius: 5,
    backgroundColor: "#393939",
    marginLeft: 40,
    marginTop: 50,
    paddingLeft: 10,
    color: "#FFF",
  },
  layoutTextBack: {
    width: 200,
    height: 100,
    marginLeft: 50,
    marginTop: 70,
  },
  layoutButton: {
    height: 40,
    width: 45,
    position: "absolute",
  },
  layoutHome: {
    height: 500,
    width: 400,
  },
});

export default styles;
