// AppStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18191E',
  },
  NavBar: {
    width: "100%",
    height: 107,
    flexDirection: "row",
    padding: 25,
    paddingTop: 40
  },
  feedbackContainer: {
    width: 340,
    height: 97,
    alignSelf: "center",
    marginTop: 30,
  },
  feedbackTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  feedbackText: {
    color: "#9a9a9a",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
  },
  starsImage: {
    alignSelf: 'center',
    marginTop: 37,
  },
  feedbackBox: {
    width: 345,
    height: 243,
    backgroundColor: "#242529",
    marginTop: 12,
    color: "#696969",
    fontWeight: "bold",
    fontSize: 14,
    padding: 25,
    textAlignVertical: 'top'
  },
  feedbackBoxText: {
    margin: 25,
    color: "#9a9a9a",
    fontWeight: "bold",
  },
  submitButton: {
    width: 276,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#6a11f5",
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  submitButtonText: {
    alignSelf: 'center',
    color: "white",
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6a11f5',
    padding: 10,
    borderRadius: 5,
    margin: 20,
    alignSelf: 'flex-start'
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10
  }
});

export default styles;
