import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const GroupScreen = ({ navigation }) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGroups();
    }, []);

    const getGroups = async () => {
        const token = await AsyncStorage.getItem('access');
        const response = await api.get('user-chat-groups/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(response.data);
        setGroups(response.data);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Groups</Text>
            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                groups.length === 0 ? (
                    <Text style={styles.noGroupsText}>No groups found.</Text>
                ) : (
                    groups.map((group) => (
                        <TouchableOpacity 
                            key={group.id} 
                            style={styles.groupContainer} 
                            onPress={() => navigation.navigate('GroupDetailScreen', { group })}
                        >
                            <Image 
                                style={styles.thumbnail} 
                                source={{ uri: group.thumbnailUrl }} 
                            />
                            <Text style={styles.groupName}>{group.name}</Text>
                        </TouchableOpacity>
                    ))
                )
            )}
        </View>
    );
};

export default GroupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 48,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
    },
    noGroupsText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
    },
    groupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    groupName: {
        fontSize: 18,
        color: '#333',
    },
});
