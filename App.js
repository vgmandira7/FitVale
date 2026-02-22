// App.js
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import StackRoutes from './src/Routes/StackRoutes';
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";




// para sumir os avisos amarelos
import { LogBox } from 'react-native';

// Ignora todos os logs
LogBox.ignoreAllLogs(true);

// Ou ignore logs específicos por uma string:
LogBox.ignoreLogs(['Warning: ...', 'Deprecation: ...']);







const pubnub = new PubNub({
    subscribeKey: "sub-c-fd20c9dc-60b4-496d-9f4c-e674f6a8d028",
    publishKey: "pub-c-1f2dac6b-2f0c-4152-b9dc-4405d01faa74",
    uuid: "0"
  });

  
console.disableYellowBox = true;

function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
            <PubNubProvider client={pubnub}>
                <StackRoutes />
            </PubNubProvider>
            </NavigationContainer>
        </PaperProvider>

        

    );
}

export default App;
