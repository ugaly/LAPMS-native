import React, { useState, useEffect, useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, StyleSheet, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { showTopMessage } from "../utils/ErrorHandler";
import photoUrl from '../services/photoUrl';


const AddComplaintScreen = () => {
  const [complaint, setComplaint] = useState('');
  const [image, setImage] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef();

  useEffect(() => {
    (async () => {
      // Check and request camera permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);


  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };
  

  useEffect(() => {
    // Scroll to bottom after a small delay to allow layout calculation
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []); // Run only once after component mount






  // useEffect(() => {
  //   // Function to handle incoming WebSocket messages

  //   const handleMessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     const command = data.command;

  //     if (command === 'fetch_all_complaints') {
  //       const receivedComplaints = data.complaints;
  //       console.log('mmmmmmmmmmmmmmmmmmmmmmmmmm');
  //       setComplaints(receivedComplaints);
  //     }
  //     else if(command === 'new_complaint'){
  //        setComplaints((prevComplaints) => [...prevComplaints, data.complaint]);
  //       // setComplaints([...complaints, { text: data.complaint.message, image: data.complaint.image }]);
  //   };

  //   };

  //   // Connect to WebSocket server when component mounts
  //   const socket = new WebSocket(`ws://192.168.43.38:8000/ws/complaints/`);
  //   socket.onopen = () => {
  //     console.log('Connected to WebSocket');
  //     // Send a command to fetch all complaints when connected
  //     socket.send(JSON.stringify({ command: 'fetch_all_complaints' }));
  //   };
  //   socket.onmessage = handleMessage;

  //   // Close WebSocket connection when component unmounts
  //   return () => {
  //     socket.close();
  //   };
  // }, []);



  useEffect(() => {
    // Function to handle incoming WebSocket messages
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      const command = data.command;
  
      if (command === 'fetch_all_complaints') {
        const receivedComplaints = data.complaints;
        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmm');
        setComplaints(receivedComplaints);
      } else if (command === 'new_complaint') {
        setComplaints((prevComplaints) => [...prevComplaints, data.complaint]);
         scrollToBottom();
        // setComplaints([...complaints, { text: data.complaint.message, image: data.complaint.image }]);
      }
    };
  
    // Function to open WebSocket connection
    const connectToWebSocket = async () => {
      const token = await AsyncStorage.getItem('access');
      print(token);
      const socket = new WebSocket(`ws://${photoUrl}/ws/complaints/?token=${token}`);
      socket.onopen = () => {
        console.log('Connected to WebSocket');
        // Send a command to fetch all complaints when connected
        // socket.send(JSON.stringify({ command: 'fetch_all_complaints' }));
        socket.send(JSON.stringify({ command: 'fetch_all_complaints', filter_by_user: true })); // Send command to fetch all complaints without filtering
      };
      socket.onmessage = handleMessage;
  
      // Close WebSocket connection when component unmounts
      return () => {
        socket.close();
      };
    };
  
    // Call the function to open WebSocket connection
    connectToWebSocket();
  }, []);
  

  
  const handleAddComplaint = async () => {
    // Get JWT token from AsyncStorage
    const token = await AsyncStorage.getItem('access');
  
    // Prepare form data
    const formData = new FormData();
    formData.append('message', complaint);
    if (image) {
      formData.append('image', {
        uri: image,
        type: 'image/jpeg', // or 'image/png' depending on the image type
        name: 'image.jpg',
      });
    } else {
      // If no image is provided, append an empty image field
      formData.append('image', ''); // Or you can append null depending on your backend requirements
    }
  
    console.log(formData);
  
    // Make POST request to the API endpoint using api.post
    try {
      const response = await api.post('complaints/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // console.log(response);
  
      // Handle successful response
      if (response.status === 201) {
        showTopMessage("Lalamiko limepokelewa na tutalifanyia kazi", "info");

        console.log('Complaint added successfully');
        // setComplaints([...complaints, { text: complaint, image: image }]);
        setComplaint('');
        setImage(null);
        setModalVisible(false);
      } else {
        // Handle error response
        console.error('Failed to add complaint:', response.statusText);
        Alert.alert('Error', 'Failed to add complaint. Please try again later.');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
      Alert.alert('Error', 'Failed to add complaint. Please check your network connection.');
    }
  };
  
  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };




  return (
    <View style={styles.container}>
      {/* <FlatList
      data={complaints}
      ref={flatListRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.complaintItem}>
          <Text style={styles.message}>{item.message}</Text>
          {item.image && <Image source={{ uri: 'http://192.168.43.38:8000' + item.image }} style={styles.image} />}
          <Text style={{color: 'gray', fontSize: 12, alignSelf: 'flex-end', marginBottom: 10, paddingRight: 10,}}>
             {(item.created_time)} Ago
          </Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    /> */}



<FlatList
  data={complaints}
  ref={flatListRef}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.listContainer}
  renderItem={({ item }) => (
    <View style={styles.complaintItem}>
      <Text style={styles.message}>{item.message}</Text>
      {item.image && <Image source={{ uri: `http://${photoUrl}` + item.image }} style={styles.image} />}
      <Text style={{color: 'gray', fontSize: 12, alignSelf: 'flex-end', marginBottom: 10, paddingRight: 10,}}>
         {(item.created_time)} Ago
      </Text>
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
  onLayout={() => scrollToBottom()}
/>


      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {image && <Image source={{ uri: image }} style={styles.previewImage} />}
            <Text style={styles.modalHeader}>Add Complaint</Text>
            <TextInput
              style={styles.input}
              placeholder="Type your complaint here..."
              value={complaint}
              onChangeText={(text) => setComplaint(text)}
              multiline={true}
              numberOfLines={4}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick an Image</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.addButtonModal} onPress={handleAddComplaint}>
                <Text style={styles.buttonText}>Add Complaint</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    
    paddingHorizontal: 10,
  },
  complaintItem: {
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#f8e8e5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 50,
    elevation: 3,
  },
  addButtonModal: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    width: '49%',
  },
  imageButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    width: '49%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    elevation: 5,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    minHeight: 100,
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  listContainer: {
    paddingHorizontal: 1,
    paddingVertical: 12,
  },
  complaintItem: {
    backgroundColor: '#f8e8e5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  uploadedInfo: {
    fontSize: 12,
    color: '#777',
  },
});

export default AddComplaintScreen;

