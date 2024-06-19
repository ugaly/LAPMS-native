import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "../styles/Theme";
import * as ImagePicker from "expo-image-picker";

export default function UploadImage({ thumbnail }) {
    const [image, setImage] = useState(thumbnail || null);

    const addImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        } else {
            alert("You did not select any image.");
        }
    };

    return (
        <View style={styles.container}>
            {/* <Image source={image ? { uri: image } : require("../../assets/user-profile.png")} style={styles.image} /> */}
            <Image source={ { uri: thumbnail }} style={styles.image} />
            <View style={styles.upload_button_container}>
                <TouchableOpacity
                    onPress={addImage}
                    style={styles.upload_button}
                >
                    <Text style={styles.desc}>
                        {image ? "Edit" : "Upload"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        overflow: "hidden",
        width: 72,
        height: 72,
    },
    upload_button: {
        alignItems: "center",
        justifyContent: "center",
    },
    upload_button_container: {
        position: "absolute",
        right: 0,
        bottom: 0,
        backgroundColor: colors.color_gray,
        opacity: 0.5,
        width: "100%",
        height: "25%",
    },
    desc: {
        fontSize: 12,
        fontFamily: "Mulish-Light",
        color: colors.color_white,
    },
    image: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        overflow: "hidden",
        width: 72,
        height: 72,
    },
});
