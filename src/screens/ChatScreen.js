import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

const ChatScreen = ({ route }) => {
  const { user } = route.params;
  const [messages, setMessages] = useState([
    { id: 1, sender: user.name, text: 'Hello, how can I assist you?', location: null, timestamp: new Date().getTime() },
    { id: 2, sender: 'Citizen', text: 'I have a question about land registration.', location: null, timestamp: new Date().getTime() },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false); // State variable to track image selection
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSend = async () => {
    const location = await getLocation();
    const messageData = {
      id: messages.length + 1,
      sender: 'Citizen',
      text: newMessage,
      image: selectedImage, // Include selectedImage in message data
      location: location,
      timestamp: new Date().getTime(),
    };
    setMessages([...messages, messageData]);
    setNewMessage('');
    setSelectedImage(null);
    setIsImageSelected(false); // Reset image selection indicator
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return null;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { coords } = location;
      const reverseGeocode = await Location.reverseGeocodeAsync({ latitude: coords.latitude, longitude: coords.longitude });
      const { region, street } = reverseGeocode[0];
      return {
        latitude: coords.latitude,
        longitude: coords.longitude,
        region: region,
        street: street,
      };
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to choose an image.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      setIsImageSelected(true); // Set image selection indicator
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, { alignSelf: item.sender === 'Citizen' ? 'flex-end' : 'flex-start' }]}>
            <View style={[styles.messageBubble, { backgroundColor: item.sender === 'Citizen' ? '#cc8da1' : '#ffdef2', elevation: item.sender === 'Citizen' ? 3 : 0 }]}>
              <Text style={[styles.sender, { color: item.sender === 'Citizen' ? '#fff' : '#000' }]}>{item.sender}</Text>
              <Text style={[styles.messageText, { color: item.sender === 'Citizen' ? '#fff' : '#000' }]}>{item.text}</Text>
              {item.image && <Image source={{ uri: item.image }} style={styles.messageImage} />} 
              {item.location && (
                <View>
                  <Text style={[styles.location, { color: item.sender === 'Citizen' ? '#fff' : '#666' }]}>
                    Location: {item.location.region} ({item.location.street})
                  </Text>
                  <Text style={[styles.location, { color: item.sender === 'Citizen' ? '#fff' : '#666' }]}>
                    Coordinates: {item.location.latitude}, {item.location.longitude}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ref={scrollViewRef}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={pickImage}>
          <FontAwesome5 name="image" size={24} color="black" style={{ marginLeft: 1, padding: 4, borderRadius: 10 }}  />
          {isImageSelected && <View style={styles.imageIndicator} />} 
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSend} style={{ backgroundColor: '#007bff',  borderRadius: 90,  }}>
          <FontAwesome5 name="paper-plane" size={24} color="black"  style={{ marginLeft: 0, padding: 6, borderRadius: 10 }}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 4,
  },
  messageContainer: {
    marginBottom: 10,
    alignItems: 'flex-end', // Align items to the end for Citizen's messages
  },
  messageBubble: {
   
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  messageImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  location: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    backgroundColor: '#e1e1e1',
    borderRadius: 10,
  },
  imageIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});

export default ChatScreen;





// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
// import * as Location from 'expo-location';
// import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const ChatScreen = ({ route }) => {
//   const { user } = route.params;
//   const [messages, setMessages] = useState([
//     { id: 1, sender: user.name, text: 'Hello, how can I assist you?', location: null, timestamp: new Date().getTime() },
//     { id: 2, sender: 'Citizen', text: 'I have a question about land registration.', location: null, timestamp: new Date().getTime() },
//   ]);
//   const [newMessage, setNewMessage] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isImageSelected, setIsImageSelected] = useState(false); // State variable to track image selection
//   const scrollViewRef = useRef();

//   useEffect(() => {
//     scrollToBottom();
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollToEnd({ animated: true });
//     }
//   };

//   const handleSend = async () => {
//     const location = await getLocation();
//     console.log('Location from getLocation:', location); // Log location details
//     const messageData = {
//       id: messages.length + 1,
//       sender: 'Citizen',
//       text: newMessage,
//       image: selectedImage, // Include selectedImage in message data
//       location: location,
//       timestamp: new Date().getTime(),
//     };
//     setMessages([...messages, messageData]);
//     setNewMessage('');
//     setSelectedImage(null);
//     setIsImageSelected(false); // Reset image selection indicator
//   };

//   const getLocation = async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.error('Location permission denied');
//         return null;
//       }
  
//       let location = await Location.getCurrentPositionAsync({});
//       const { coords } = location;
//       const { latitude, longitude } = coords;
  
//       // Fetch detailed address information using Google Maps Geocoding API
//       const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCeDg_JfSFOGwllQPVGDEM691op_Vc35aI`);
//       const data = await response.json();
//       if (data.status === 'OK') {
//         const addressComponents = data.results[0].address_components;
//         const formattedAddress = data.results[0].formatted_address;
  
//         // Extract street, district, and region from address components
//         let street = '';
//         let district = '';
//         let region = '';
//         for (let component of addressComponents) {
//           if (component.types.includes('street_address') || component.types.includes('route')) {
//             street = component.long_name;
//           } else if (component.types.includes('sublocality') || component.types.includes('sublocality_level_1')) {
//             district = component.long_name;
//           } else if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
//             region = component.long_name;
//           }
//         }
  
//         // Return the extracted address details
//         return {
//           latitude,
//           longitude,
//           street,
//           district,
//           region,
//           formattedAddress
//         };
//       } else {
//         console.error('Failed to fetch address details:', data.status);
//         return null;
//       }
//     } catch (error) {
//       console.error('Error getting location:', error);
//       return null;
//     }
//   };
  

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Sorry, we need media library permissions to choose an image.');
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setSelectedImage(result.uri);
//       setIsImageSelected(true); // Set image selection indicator
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         renderItem={({ item }) => (
//           <View style={[styles.messageContainer, { alignSelf: item.sender === 'Citizen' ? 'flex-end' : 'flex-start' }]}>
//             <View style={[styles.messageBubble, { backgroundColor: item.sender === 'Citizen' ? '#cc8da1' : '#ffdef2', elevation: item.sender === 'Citizen' ? 3 : 0 }]}>
//               <Text style={[styles.sender, { color: item.sender === 'Citizen' ? '#fff' : '#000' }]}>{item.sender}</Text>
//               <Text style={[styles.messageText, { color: item.sender === 'Citizen' ? '#fff' : '#000' }]}>{item.text}</Text>
//               {item.image && <Image source={{ uri: item.image }} style={styles.messageImage} />} 
//               {item.location && (
//                 <View>
//                   <Text style={[styles.location, { color: item.sender === 'Citizen' ? '#fff' : '#666' }]}>
//                     Location: {item.location.region}
//                   </Text>
//                   <Text style={[styles.location, { color: item.sender === 'Citizen' ? '#fff' : '#666' }]}>
//                     Coordinates: {item.location.latitude}, {item.location.longitude}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           </View>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         ref={scrollViewRef}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type your message here..."
//           value={newMessage}
//           onChangeText={setNewMessage}
//         />
//         <TouchableOpacity onPress={pickImage}>
//           <FontAwesome5 name="image" size={24} color="black" style={{ marginLeft: 1, padding: 4, borderRadius: 10 }}  />
//           {isImageSelected && <View style={styles.imageIndicator} />} 
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleSend} style={{ backgroundColor: '#007bff',  borderRadius: 90,  }}>
//           <FontAwesome5 name="paper-plane" size={24} color="black"  style={{ marginLeft: 0, padding: 6, borderRadius: 10 }}/>
//         </TouchableOpacity>
//       </View>
//       {/* Google Places Autocomplete Component */}
//       <GooglePlacesAutocomplete
//         placeholder='Search'
//         onPress={(data, details = null) => {
//           // 'details' is provided when fetchDetails = true
//           console.log('Location from Google Places Autocomplete:', details);
//         }}
//         query={{
//           key: 'AIzaSyCeDg_JfSFOGwllQPVGDEM691op_Vc35aI',
//           language: 'en',
//         }}
//         styles={{
//           container: {
//             position: 'absolute',
//             top: 10,
//             left: 0,
//             right: 0,
//             marginLeft: 20,
//             marginRight: 20,
//           },
//           listView: {
//             backgroundColor: '#fff',
//           },
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 4,
//   },
//   messageContainer: {
//     marginBottom: 10,
//     alignItems: 'flex-end', // Align items to the end for Citizen's messages
//   },
//   messageBubble: {
   
//     padding: 10,
//     borderRadius: 10,
//     maxWidth: '80%',
//   },
//   sender: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   messageText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   messageImage: {
//     width: 200,
//     height: 200,
//     resizeMode: 'cover',
//     marginBottom: 5,
//   },
//   location: {
//     fontStyle: 'italic',
//     marginBottom: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//   },
//   input: {
//     flex: 1,
//     marginRight: 10,
//     padding: 8,
//     backgroundColor: '#e1e1e1',
//     borderRadius: 10,
//   },
//   imageIndicator: {
//     position: 'absolute',
//     top: -5,
//     right: -5,
//     backgroundColor: 'red',
//     width: 10,
//     height: 10,
//     borderRadius: 10,
//   },
// });

// export default ChatScreen;

