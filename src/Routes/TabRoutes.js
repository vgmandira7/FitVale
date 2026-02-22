import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon2 from "react-native-vector-icons/Entypo";
import { FontAwesome6 } from '@expo/vector-icons';
import Home from '../Screens/Home';
import Mountedworkouts from '../Screens/Workouts/Mounted workouts/index';
import Pagamentos from '../Screens/Payments/index';
import Perfil from '../Screens/profile/index';
import Chat from '../Screens/Chat/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

function MyTabs({ navigation }) {
  const [tabBarColor, setTabBarColor] = useState("#14151A"); // Cor padrão para tema escuro
  const [cordesativado, setcordesativado] = useState("#14151A"); // Cor padrão para tema escuro

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme'); // Carrega o tema do AsyncStorage
      if (storedTheme === 'claro') {
        setTabBarColor("#ffffff"); // Se o tema for claro, define o fundo como branco
        setcordesativado("#000"); 
      } else {
        setTabBarColor("#111827"); // Se o tema for escuro, mantém o fundo atual
        setcordesativado("#8E8E8F");
      }
    };

    loadTheme(); // Carrega o tema assim que o componente for montado

    // Adiciona listener para mudanças no AsyncStorage e atualiza automaticamente
    const listener = navigation.addListener('focus', () => {
      loadTheme();
    });

    // Limpeza ao desmontar o componente
    return () => {
      listener();
    };
  }, [navigation]); // Recarrega o tema sempre que a tela for focada

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tabBarColor,
          borderTopColor: "transparent",
          paddingTop: 3,
          paddingBottom: 3,
        },
        tabBarActiveTintColor: "#6A11F5", // Cor ativa da tab
        tabBarInactiveTintColor: cordesativado, // Cor dos ícones inativos (pretos)
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => <Icon2 name='home' size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Chat" 
        component={Chat}
        options={{
          tabBarIcon: ({ size, color }) => <Icon2 name='flow-branch' size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Treinos" 
        component={Mountedworkouts}
        options={{
          tabBarIcon: ({ size, color }) => <Icon2 name='book' size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Pagamentos" 
        component={Pagamentos}
        options={{
          tabBarIcon: ({ size, color }) => <FontAwesome6 name="dollar-sign" size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={Perfil}
        options={{
          tabBarIcon: ({ size, color }) => <Icon2 name='user' size={size} color={color} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
