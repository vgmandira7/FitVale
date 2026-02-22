import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, Image } from "react-native";
import { usePubNub } from "pubnub-react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ChatView = () => {
  const navigation = any = useNavigation();
  const pubnub = usePubNub();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [channelName, setChannelName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [userType, setUserType] = useState(null);
  
  const scrollViewRef = useRef();

  const fetchUserChatInfo = async () => {
    try {
      const userName = await AsyncStorage.getItem('@userChatName');
      setUserName(userName);
    } catch (error) {
      console.log('Erro ao recuperar o ID do usuário logado:', error);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      const storedImage = await AsyncStorage.getItem('profileImage');
      console.log(storedImage);
      const storedUserType = await AsyncStorage.getItem('userType');
      if (storedImage) {
        setProfileImage(storedImage);
        console.log("imagem após setProfileImage", storedImage);
      }
      

      
      if (storedUserType) setUserType(storedUserType);
    };

    loadUserData();
    fetchUserChatInfo();
  }, []);

  const fetchChannelName = async () => {
    try {
      const channel = await AsyncStorage.getItem('@channelName');
      setChannelName(channel);
    } catch (error) {
      console.log('Erro ao recuperar o nome do canal:', error);
    }
  };

  const fetchLoggedUser = async () => {
    try {
      const userID = await AsyncStorage.getItem('userId');
      setLoggedUser(userID);
      console.log('teste', userID)
    } catch (error) {
      console.log('Erro ao recuperar o ID do usuário logado:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchLoggedUser(), fetchChannelName()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (!isLoading && pubnub) {
      pubnub.setUUID(loggedUser);
      const listener = {
        message: envelope => {
          setMessages(msgs => [
            ...msgs,
            {
              id: envelope.message.id,
              author: envelope.message.author,
              content: envelope.message.content,
              profileImage: envelope.message.profileImage || null,
              backgroundColor: envelope.message.backgroundColor || '#242529',
              posicao: envelope.message.posicao || "flex-start",
              timetoken: envelope.timetoken
            }
          ]);
        }
      };
  
      pubnub.history({ channel: channelName, count: 100 }, (status, response) => {
        if (status.error) {
          console.error("Error fetching history:", status);
        } else {
          setMessages(response.messages.map(msg => ({
            id: msg.entry.id,
            author: msg.entry.author,
            content: msg.entry.content,
            profileImage: msg.entry.profileImage || null,
            backgroundColor: msg.entry.backgroundColor || '#242529',
            posicao: msg.entry.posicao || "flex-start",
            timetoken: msg.timetoken
          })));
        }
      });
  
      pubnub.addListener(listener);
      pubnub.subscribe({ channels: [channelName] });
  
      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
      };
    }
  }, [isLoading, channelName, loggedUser]);
  

  const handleSubmit = () => {
    if (!input.trim()) return;
    setInput("");
  
    const messageColor = userType === 'aluno' ? "#6A11F5" : "#242529";
    const tipousuario = userType === 'aluno' ? "flex-end" : "flex-start";
  
    const message = {
      content: input,
      id: Math.random().toString(16).substr(2),
      profileImage: profileImage,
      backgroundColor: messageColor,
      author: loggedUser,
      posicao: tipousuario
    };
  
    pubnub.publish({ channel: channelName, message });
  };
  

  return (
    <SafeAreaView style={styles.outerContainer}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior="height"
        keyboardVerticalOffset={Platform.select({ ios: 78, android: 0 })}
      >
        <View style={styles.topContainer} ref={scrollViewRef}>
          {messages.map(message => (
            <View
              key={message.timetoken}
              style={[
                styles.messageContainer,
                { backgroundColor: message.backgroundColor },
                { alignSelf: message.posicao }
              ]}
            >
              <View style={styles.avatar}>
                {message.profileImage ? (
                  <Image source={{ uri: message.profileImage }} style={styles.avatarImage} />
                ) : (
                  <Text style={styles.avatarImage}>{message.author}</Text>
                )}
              </View>
              <View style={styles.messageContent}>
                <Text style={{ color: "#fff" }}>{message.content}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.bottomContainer}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSubmit}
            returnKeyType="send"
            enablesReturnKeyAutomatically={true}
            placeholder="Type your message here..."
            placeholderTextColor={"#696969"}
          />
          <View style={styles.submitButton}>
            {input !== "" && <Button title="Send" onPress={handleSubmit} />}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#18191E"
  },
  innerContainer: {
    flex: 1
  },
  topContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    alignItems: "flex-start"
  },
  messageContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
    maxWidth: "75%"
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 16
  },
  avatarImage: {
    width: 53,
    height: 53,
    borderRadius: 50
  },
  avatarContent: {
    fontSize: 30,
    textAlign: "center",
    textAlignVertical: "center"
  },
  messageContent: {
    flex: 1
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16
  },
  textInput: {
    flex: 1,
    backgroundColor: "#242529",
    borderRadius: 20,
    padding: 16,
    elevation: 2,
    height: 50,
    color: "#696969"
  },
  submitButton: {
    position: "absolute",
    right: 32
  }
});
