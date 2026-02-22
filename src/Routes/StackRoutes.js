// StackRoutes.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './TabRoutes.js';
import Login from '../Screens/Login/index.js';
import Chat from "../Screens/Chat/index.js"
import Payments from '../Screens/Payments/index';

import feedback from '../Screens/Feedback/index.js';
import ScreenTreinos from '../Screens/Workouts/WorkoutMontage/montagem_treino.js';
import { EmojiPickerView } from "../Views/EmojiPicker.js";
import { ChatView } from "../Views/Chat.js";


import WorkoutSolicitation from "../Screens/Workouts/Personal/treinoPersonal.js";
import WorkoutMontage from "../Screens/Workouts/Personal/MontageWorkouts/montagem_treino.js";
import WorkoutMontageAluno from "../Screens/Workouts/WorkoutMontage/montagem_treino.js";
import ResponseTechnicalSheet from "../Screens/Workouts/Personal/ResponseTechnicalSheet/index.js";
import Profile from "../Screens/profile/index.js";
import Themes from "../Screens/profile/Themes/index.js";
import TechnicalSheet from "../Screens/Workouts/Technical sheet/index.js";
import TechnicalSheet2 from "../Screens/Workouts/Technical sheet/index2.js";
import waitingScreen from "../Screens/Workouts/Technical sheet/TelaEspera.js";
import Exercises from "../Screens/Workouts/Exercises/index.js";
import Personal from "../Screens/Personal/index.js";



const Stack = createStackNavigator();

function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }}/>
            <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }}/>
            <Stack.Screen name="Payments" component={Payments} options={{ headerShown: false }}/>
            <Stack.Screen name="Feedback" component={feedback} options={{ headerShown: false }}/>
            <Stack.Screen name="ScreenTreinos" component={ScreenTreinos} options={{ headerShown: false }}/>
            <Stack.Screen name="EmojiPickerView" component={EmojiPickerView} options={{ headerShown: false }}/>
            <Stack.Screen name="ChatView" component={ChatView} options={{ headerShown: false }}/>
            
            <Stack.Screen name="WorkoutSolicitation" component={WorkoutSolicitation} options={{ headerShown: false }}/>
            <Stack.Screen name="WorkoutMontage" component={WorkoutMontage} options={{ headerShown: false }}/>
            <Stack.Screen name="ResponseTechnicalSheet" component={ResponseTechnicalSheet} options={{ headerShown: false }}/>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            <Stack.Screen name="Themes" component={Themes} options={{ headerShown: false }}/>
            <Stack.Screen name="TechnicalSheet" component={TechnicalSheet} options={{ headerShown: false }}/>
            <Stack.Screen name="TechnicalSheet2" component={TechnicalSheet2} options={{ headerShown: false }}/>
            <Stack.Screen name="waitingScreen" component={waitingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Exercises" component={Exercises} options={{ headerShown: false }}/>
            <Stack.Screen name="WorkoutMontageAluno" component={WorkoutMontageAluno} options={{ headerShown: false }}/>
            <Stack.Screen name="Personal" component={Personal} options={{ headerShown: false }}/>
            
            
            

        </Stack.Navigator>
    );
}

export default StackRoutes;
