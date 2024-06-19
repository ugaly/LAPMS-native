import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import api from '../services/api';
import * as FileSystem from 'expo-file-system';
import { Feather } from "@expo/vector-icons";

import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import photoUrl from '../services/photoUrl';


const GroupDetailScreen = ({ route, navigation }) => {
    const { group } = route.params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state
    

    const flatListRef = useRef(null);

    useEffect(() => {
        getUserID();
        getMessages();
    }, []);

    const getUserID = async () => {
        try {
            const userID = await AsyncStorage.getItem('user_id');
            setCurrentUser(userID);
        } catch (error) {
            console.error('Error retrieving user ID:', error);
        }
    };

    const getMessages = async () => {
        const token = await AsyncStorage.getItem('access');
        setLoading(true); // Set loading to true when fetching messages
        const response = await api.get(`chatgroups/${group.id}/messages/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setLoading(false); // Set loading to false after fetching messages
        setMessages(response.data);
    };
    const sendMessage = async () => {
        if (!newMessage.trim()) return;
    
        const token = await AsyncStorage.getItem('access');
        const formData = new FormData();
    
        formData.append('chat_group', group.id);
        formData.append('text', newMessage);
        formData.append('sender', currentUser);
        formData.append('timestamp', Date.now());
    
        // Append file content if available
        if (selectedFile && selectedFile.content) {
            formData.append('file_content', selectedFile.content);
            formData.append('file_name', selectedFile.name);
            console.log('File content:', selectedFile.name);
        }
    
        try {
            setLoading(true);
    
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            };
    
            const response = await api.post('messages/', formData, { headers });
            setLoading(false);
            setMessages([...messages, response.data]);
            setNewMessage("");
            setSelectedFile(null);
    
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd();
            }
        } catch (error) {
            setLoading(false);
            console.error('Error sending message:', error);
            // Handle errors appropriately (e.g., display error message to user)
        }
    };
    
    
    const uploadFile = async () => {
        console.log('uploading file');
        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true,
        });
    
        console.log('Selected file:', result);
        if (!result.cancelled) {
           
                const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType.Base64 });
                setSelectedFile({
                    uri: result.assets[0].uri,
                    type: result.assets[0].type,
                    name: result.assets[0].name,
                    content: fileContent, // Save file content
                });
                // console.log('Selected file content:', fileContent);
           
        }
        

        
    };

   
    const [downloading, setDownloading] = useState(false);


    
    
    

    const renderMessage = ({ item }) => {
        if (currentUser === null) {
          return null; // Render a loading indicator or placeholder
        }
      
       

        const handleDownload = async () => {
          setDownloading(true);
      
          try {
            // Request permission to access external storage (for Android)
            // const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            // if (status !== 'granted') {
            //   Alert.alert('Permission Denied', 'Permission to access media library is required to download files.');
            //   setDownloading(false);
            //   return;
            // }
      
            const uri = `http://${photoUrl}${item.file}`;
            const fileUri = FileSystem.documentDirectory + item.file.split('/').pop();
      
            const { uri: downloadedFileUri } = await FileSystem.downloadAsync(uri, fileUri);

            const asset = await MediaLibrary.createAssetAsync(downloadedFileUri);
            const album = await MediaLibrary.getAlbumAsync('Download');
            if (album == null) {
              await MediaLibrary.createAlbumAsync('Download', asset, false);
            } else {
              await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            }
      
            Alert.alert('Download Complete', `File has been downloaded to ${downloadedFileUri}`);
          } catch (error) {
            console.error('Error downloading file:', error);
            Alert.alert('Download Failed', 'There was an error downloading the file. Please try again.');
          } finally {
            setDownloading(false);
          }
        };
      
        const isImage = item.file && (item.file.endsWith('.jpg') || item.file.endsWith('.jpeg') || item.file.endsWith('.png'));
      
        return (
          <View style={[styles.messageContainer, item.sender === parseInt(currentUser) ? styles.messageRight : styles.messageLeft]}>
            {item.file && !isImage && (
              <Feather
                name="file"
                size={32} // Increased size for better visibility
                color="#ccc"
                onPress={handleDownload} // Attach download function to onPress
                style={{ marginRight: 10 }} // Add margin for spacing
              >
                {downloading && <ActivityIndicator size="small" color="#007bff" style={{ position: 'absolute', top: 10, right: 0 }} />} {/* Add loading indicator during download */}
              </Feather>
            )}
            {item.file && isImage && <Image source={{ uri: `http://${photoUrl}` + item.file }} style={styles.messageFile} />}
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTimestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
          </View>
        );
      };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{group.name}</Text>
            </View>
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.messagesList}
            />
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message"
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={uploadFile} style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GroupDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: '#6200ee',
        alignItems: 'center',
    },
    headerText: {
        marginTop: 10,
        fontSize: 20,
        color: '#fff',
    },
    messagesList: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    messageContainer: {
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 10,
        borderRadius: 10,
        maxWidth: '75%',
    },
    messageLeft: {
        alignSelf: 'flex-start',
        backgroundColor: '#e1ffc7',
    },
    messageRight: {
        alignSelf: 'flex-end',
        backgroundColor: '#dcf8c6',
    },
    messageText: {
        fontSize: 16,
    },
    messageFile: {
        width: 200,
        height: 200,
        marginVertical: 8,
        borderRadius: 10,
    },
    messageTimestamp: {
        fontSize: 10,
        color: '#555',
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        marginRight: 8,
    },
    sendButton: {
        padding: 10,
        backgroundColor: '#6200ee',
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
    },
    uploadButton: {
        padding: 10,
        backgroundColor: '#6200ee',
        borderRadius: 20,
        marginLeft: 8,
    },
    uploadButtonText: {
        color: '#fff',
    },
});
