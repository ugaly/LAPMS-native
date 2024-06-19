// import React from "react";
// import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
// import  {colors} from "../styles/Theme";
// import { Ionicons } from "@expo/vector-icons";

// const windowWidth = Dimensions.get("window").width;

// const Category = ({ category, isSelected, onPress }) => {
//     return (
//         <TouchableOpacity
//             style={[styles.button, isSelected ? styles.selectedButton : null]}
//             onPress={onPress}
//         >
//             <Ionicons
//                 name={category.icon}
//                 size={36}
//                 color={
//                     isSelected 
//                     ? colors.color_white 
//                     : colors.color_primary
//                 }
//                 style={styles.icon}
//             />
//             <Text style={[
//                 styles.text, 
//                 isSelected ? styles.selectedText : null]}>
//                 {category.name}
//             </Text>
//         </TouchableOpacity>
//     );
// };

// const styles = StyleSheet.create({
//     button: {
//         alignItems: "center",
//         padding: 16,
//         marginHorizontal: 8,
//         marginVertical:8,
//         borderRadius: 10,
//         borderColor: colors.color_primary,
//         borderWidth: 1,
//         width: windowWidth / 4,
//         height: windowWidth / 4,
//         justifyContent:"center"
//     },
//     selectedButton: {
//         backgroundColor: colors.color_primary,
//     },
//     text: {
//         color: colors.color_primary,
//         fontSize:14,
//         fontFamily: "Mulish-Medium",
//         textAlign:  "center"
//     },
//     selectedText: {
//         color: colors.color_white,
//         fontFamily: "Mulish-Medium",
//     },
//     icon: {
//         flex:1,
//     },
// });

// export default Category;



// Card 1: Imports
import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/Theme";

// Card 2: Component Definition
const windowWidth = Dimensions.get("window").width;

const Category = ({ category, isSelected, onPress }) => {
    console.log(category);
    return (
        <TouchableOpacity
        style={styles.customersItem} 
            onPress={onPress}
        >
            <Ionicons
                name={category.icon}
                size={36}
                color={
                    isSelected
                    ? colors.color_white
                    : colors.color_primary
                }
                style={styles.icon}
            />
            <Text style={styles.customersText}>
                {category.name}
            </Text>
        </TouchableOpacity>
    );
};

// Card 3: Styles
const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        padding: 16,
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 10,
        borderColor: colors.color_primary,
        borderWidth: 1,
        width: windowWidth / 4,
        height: windowWidth / 4,
        justifyContent: "center"
    },
    selectedButton: {
        backgroundColor: colors.color_primary,
    },
    text: {
        color: colors.color_primary,
        fontSize: 14,
        fontFamily: "Mulish-Medium",
        textAlign: "center"
    },
    selectedText: {
        color: colors.color_white,
        fontFamily: "Mulish-Medium",
    },
    icon: {
        flex: 1,
    },
    customersContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      // customersItem: {
      //   width: '48%',
      //   alignItems: 'center',
      //   backgroundColor: '#fff',
      //   padding: 16,
      //   borderRadius: 8,
      //   marginBottom: 16,
      //   shadowColor: '#000',
      //   ...SHADOW,
      //   shadowOffset: {
      //     width: 0,
      //     height: 2,
      //   },
      //   shadowOpacity: 0.25,
      //   shadowRadius: 3.84,
      //   //elevation: 5,
      // },
     
      customersLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      modalImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
      },
      modalTextContainer: {
        maxHeight: 200,
      },
      modalText: {
        fontSize: 16,
        color: '#333',
      },
      modalButton: {
        backgroundColor: '#4a148c',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
      },
      modalButtonText: {
        color: '#fff',
        fontSize: 14,
      },
      closeButton: {
        padding: 10,
        marginTop: 16,
      },
      closeButtonText: {
        fontSize: 16,
        color: '#4a148c',
      },
      zoneCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // elevation: 5,
      },
      zoneHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      zoneTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      zoneContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      zoneImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginRight: 16,
      },
      zoneInfo: {
        flex: 1,
      },
      zoneText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
      zoneSubtext: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
      },
    
    
    
      customersCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      customersHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      customersTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      customersContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      customersItem: {
        width: '48%',
        paddingVertical: 30,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 12,
      },
      customersText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 4,
      },
      customersLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
      },
});

export default Category;
