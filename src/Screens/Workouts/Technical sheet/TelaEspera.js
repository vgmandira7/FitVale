import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const PagamentosScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{color: "#fff", fontWeight: "bold", fontSize: 24}}>Seus dados foram enviados com êxito, aguarde a resposta de seu instrutor</Text>
      
      <TouchableOpacity onPress={() => navigation.pop(3)} style={{marginTop: 25}}>
        <Text style={{color: "#6a11f5", fontWeight: "bold", fontSize: 16}}>Voltar para tela de Treino</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18191E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PagamentosScreen;