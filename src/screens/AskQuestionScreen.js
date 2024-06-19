
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { showTopMessage } from "../utils/ErrorHandler";
import photoUrl from '../services/photoUrl';



const AskQuestionScreen = () => {
  const [newQuestion, setNewQuestion] = useState('');
  const [newQuestionImage, setNewQuestionImage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const scrollViewRef = useRef();
  console.log('jjjjjjj',photoUrl);

  useEffect(() => {
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      const command = data.command;

      if (command === 'fetch_all_questions') {
        const receivedQuestions = data.questions;
        setQuestions(receivedQuestions);
      } else if (command === 'new_question') {
        console.log('New question received:', data.question);
        const newQuestion = data.question;
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
        scrollToBottom();
      }else if(command === 'new_answer'){
        console.log('New answer received:', data.answer);
        const newAnswer = data.answer;
        //setQuestions(prevQuestions => [...prevQuestions, newAnswer]);
        // scrollToBottom();
      }
    };

    const connectToWebSocket = async () => {
      const token = await AsyncStorage.getItem('access');
      const socket = new WebSocket(`ws://${photoUrl}/ws/questions/?token=${token}`);
      socket.onopen = () => {
        socket.send(JSON.stringify({ command: 'fetch_all_questions', filter_by_user: true }));
      };
      socket.onmessage = handleMessage;

      return () => {
        socket.close();
      };
    };

    connectToWebSocket();
  }, []);

  const handleSendQuestion = async () => {
    const token = await AsyncStorage.getItem('access');

    if (!newQuestion) return;

    const formData = new FormData();
    formData.append('message', newQuestion);
    if (newQuestionImage) {
      formData.append('image', {
        uri: newQuestionImage,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
    }

    print(formData);

    try {
      const response = await api.post('questions/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      if (response.status === 201) {
        console.log('Question posted successfully');
        showTopMessage("Swali lako limepokelewa kikamilifu, tutajibu na kufanyia kaz ndani ya muda mfupi", "success");
        setNewQuestion('');
        setNewQuestionImage(null);
      } else {
        console.error('Failed to post question:', response.statusText);
        Alert.alert('Error', 'Failed to post question. Please try again later.');
      }
    } catch (error) {
      console.error('Network error:', error);
      Alert.alert('Error', 'Failed to post question. Please check your network connection.');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Sorry, we need media library permissions to choose an image.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setNewQuestionImage(result.assets[0].uri);
    }
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

return (
  <View style={styles.container}>
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollViewContent}
      onContentSizeChange={scrollToBottom}>
      {questions.map(question => (
        <View key={question.id} style={styles.questionContainer}>
          <Text style={styles.questionMessage}>{question.message}</Text>
          {question.image && <Image source={{ uri: `http://${photoUrl}` + question.image }} style={styles.questionImage} />}

          <Text style={{color: 'gray', fontSize: 12, alignSelf: 'flex-end', marginBottom: 10, paddingRight: 10,}}>
             {(question.created_time)} Ago
          </Text>
          {/* Response section */}
         
          <View style={styles.responseContainer}>
          {question.answers && question.answers.length > 0 ? (
            <Text style={styles.responseLabel}>Answer: {question.response ? question.response : <Text style={styles.Response}>{question.answers[0].message}</Text>}</Text>
          ) : (
            <Text style={styles.responseLabel}>Answer: {question.response ? question.response : <Text style={styles.noResponse}>No Answer yet</Text>}</Text>
          )}
          </View>
        </View>
     
      ))}
    </ScrollView>

    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type your question here..."
        value={newQuestion}
        onChangeText={setNewQuestion}
        multiline
        numberOfLines={2} // Set minimum row count
      />
      <TouchableOpacity onPress={pickImage}>
        <FontAwesome5 name="image" size={24} color="black" style={styles.imageIcon} />
        {newQuestionImage && <View style={styles.imageIndicator} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSendQuestion} style={styles.sendButton}>
        <FontAwesome5 name="paper-plane" size={24} color="white" style={styles.sendIcon} />
      </TouchableOpacity>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  questionContainer: {
    backgroundColor: '#e8f4f8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  questionMessage: {
    fontSize: 16,
    marginBottom: 10,
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  responseContainer: {
    backgroundColor: '#f0e8ff',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  responseLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  
  noResponse: {
    color: 'red',
  },
  Response: {
    color: 'green',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e1e1e1',
    borderRadius: 10,
    minHeight: 60,
    marginRight: 10,
  },
  imageIcon: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
  },
  imageIndicator: {
    backgroundColor: 'red',
    borderRadius: 100,
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 90,
    padding: 10,
  },
  sendIcon: {
    padding: 10,
    borderRadius: 10,
  },
});

export default AskQuestionScreen;
