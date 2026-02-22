// PagamentosScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18191E',
  },
  Navbar: {
    backgroundColor: "#6A11F5",
    width: 393,
    height: 107,
    padding: 25,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textoNav: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    width: 70,
    flex: 1,
    justifyContent: "flex-start",
  },
  comment: {
    marginEnd: 30,
  },
  texto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  conteudo: {
    paddingTop: 50,
    paddingLeft: 25,
    paddingRight: 25,
  },
  fundoCard: {
    width: 345,
    height: 98,
    backgroundColor: "#242529",
    borderRadius: 14,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
  },
  textosCard: {
    width: 160,
    height: 53,
    marginEnd: 30,
  },
  fotocard: {
    marginEnd: 20,
    width: 65,
    height: 65,
    borderRadius: 50
  },
  textoSecundario: {
    color: "#C0BEBE",
    fontSize: 13,
    fontWeight: "bold",
  },
  textoRoxo: {
    color: "#C0BEBE",
    fontSize: 13,
    fontWeight: "bold",
  },
  trespontos: {
    padding: 10,
  },
});

export default styles;
