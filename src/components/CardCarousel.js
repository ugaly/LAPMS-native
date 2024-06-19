import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    ToastAndroid, ImageBackground
} from "react-native";
import { colors, sizes } from "../styles/Theme";
import { Animated } from "react-native";

const CARD_WIDTH = sizes.width - 100;
const CARD_HEIGHT = 180;

// export const CardCarousel = ({ list, onSelectCategory }) => {
//     const av = new Animated.Value(0);
//     av.addListener(() => {
//         return;
//     });
//     return (
//         <FlatList
//             data={list}
//             horizontal
//             snapToInterval={CARD_WIDTH + 24}
//             decelerationRate={"fast"}
//             showsHorizontalScrollIndicator={false}
//             initialNumToRender={3}
//             keyExtractor={(item) => item.name}
//             renderItem={({ item, index }) => {
//                 return (
//                     <TouchableOpacity
//                         style={{
//                             marginLeft: index === 0 ? 0 : 24,
//                             marginRight: index === list.length - 1 ? 24 : 0,
//                             marginVertical: 16,
//                         }}
//                         // onPress={() => onSelectCategory(item)}
//                         onPress={() => ToastAndroid.show(`Umeclick ${item.name}`, ToastAndroid.SHORT)}
//                     >
//                         <ImageBackground source={item.image} style={styles.card}>
//                             <View style={styles.button_box}>
//                                 <TouchableOpacity
//                                     style={styles.button}
//                                     // onPress={() => onSelectCategory(item)}
//                                     onPress={() => ToastAndroid.show(`Umeclick ${item.name}`, ToastAndroid.SHORT)}
//                                 >
//                                     <Text style={styles.button_text}>
//                                         View
//                                     </Text>
//                                 </TouchableOpacity>
//                             </View>
                            
//                             <View style={styles.title_box}>
//                                 <Text style={styles.category}>
//                                     {item.name},
//                                 </Text>
//                                 <View style={styles.countDetail_container}>
//                                     <Text style={styles.detail}>

//                                         {item.count }
                                       
//                                     </Text>
//                                 </View>
//                             </View>
//                         </ImageBackground>
//                     </TouchableOpacity>
//                 );
//             }}
//         />
//     );
// };

export const CardCarousel = ({ list, onSelectCategory }) => {
    const av = new Animated.Value(0);
    av.addListener(() => {
        return;
    });
    return (
        <FlatList
            data={list}
            horizontal
            snapToInterval={CARD_WIDTH + 24}
            decelerationRate={"fast"}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={3}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index }) => {
                // Truncate item name if it exceeds 20 characters
                const truncatedName = item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name;
                // Check if item.description exists before accessing its length property
                const description = item.count && item.count.length > 150 ? item.count.substring(0,150) + '...' : item.count;
                return (
                    <TouchableOpacity
                        style={{
                            marginLeft: index === 0 ? 0 : 24,
                            marginRight: index === list.length - 1 ? 24 : 0,
                            marginVertical: 16,
                        }}
                        onPress={() => ToastAndroid.show(`Umeclick ${item.name}`, ToastAndroid.SHORT)}
                    >
                        <ImageBackground source={item.image}  style={[styles.card, { opacity: 0.8 }]} >
                            <View style={styles.button_box}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => ToastAndroid.show(`Umeclick ${item.name}`, ToastAndroid.SHORT)}
                                >
                                    <Text style={styles.button_text}>
                                        View
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.title_box}>
                                <Text style={styles.category}>
                                    {truncatedName} {/* Display truncated item name */}
                                </Text>
                                {/* <Text style={styles.description}>
                                    {description} 
                                </Text> */}
                                <View style={styles.countDetail_container}>
                                    <Text style={styles.detail}>
                                        {/* {item.count} */}
                                        {description}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                );
            }}
        />
    );
};


const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "row",
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        // borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        shadowColor: colors.color_gray,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 4,
        alignSelf: "flex-end",
    },
    image_box: {
        flex: 1,
        paddingVertical: 24,
    },
    category_image: {
        flex: 1,
        resizeMode: "contain",
    },
    title_box: {
        left: 18,
        right: 16,
        top: 16,
        width: "100%",
       
    },
    category: {
        fontSize: 20,
        fontFamily: "Mulish-Medium",
        color: colors.color_primary,
        fontWeight: "bold",
    },
    countDetail_container: {
        flexDirection: "row",
        alignItems: "baseline",
        
    },
    detail: {
        fontSize: 14,
        marginTop: 4,
        fontFamily: "Mulish-Light",
        color: 'white',
        fontWeight: "bold",
        
        flex: 1,
    },
    button_box: {
        position: "absolute",
        justifyContent: "flex-end",
        bottom: 0,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    button: {
        backgroundColor: colors.color_primary,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignSelf: "flex-start",
    },
    button_text: {
        fontSize: 16,
        fontFamily: "Mulish-Bold",
        color: colors.color_white,
    },
});
