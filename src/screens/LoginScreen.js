import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Button from "../components/Button/Button";
import InputBar from "../components/InputBar";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import { Formik } from "formik";
import ErrorHandler, { showTopMessage } from "../utils/ErrorHandler";
import { colors } from "../styles/Theme";

const initialFormValues = {
    usermail: "",
    password: "",
};

const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    function handleFormSubmit(formValues) {
        const auth = getAuth(app);

        setLoading(true); // İşlem başladığında yüklemeyi etkinleştir

        signInWithEmailAndPassword(
            auth,
            formValues.usermail,
            formValues.password
        )
            .then((res) => {
                showTopMessage("Giriş Başarılı !", "success");
                setLoading(false); // İşlem tamamlandığında yüklemeyi devre dışı bırak
                goToUserProfile();
            })
            .catch((err) => {
                setLoading(false);
                showTopMessage(ErrorHandler(err.code), "danger");
            });
    }

    // Navigation

    function goToMemberSignUp() {
        navigation.navigate("SignUpScreen");
    }

    // Navigation

    function goToUserProfile() {
        navigation.navigate("UserProfileScreen");
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{paddingBottom: 40}}>
            <Text style={styles.text}> Pitieni hii hizi ni sample feature atakazoona citizens hiyo nimedisign mimi so pitieni kulingana na reqirements zenu mniambie sehemu za kurekebisha, its just UI sijaanza kuintergrate na modals, then fanyeni haraka data za mpango mji ni shapefiles mnatakiwa mkaombe ardhi ile tuziweke kwenye Map, and I will charge you on this project ina scope kubwa you will tell me how much will you pay me feel free and mnatakiwa kupay innitial ammount atleast niresolve issue ya bando natumia bando kubwa kwenye nodemudules</Text>
            
            </ScrollView>
            {/* <Formik
                initialValues={{ initialFormValues }}
                onSubmit={handleFormSubmit}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <>
                        <View style={styles.input_container}>
                            <InputBar
                                onType={handleChange("usermail")}
                                value={values.usermail}
                                placeholder={"E-posta adresi"}
                            />
                            <InputBar
                                onType={handleChange("password")}
                                value={values.password}
                                placeholder={"Parola"}
                                isSecure
                            />
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.detail}>Parolamı Unuttum?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button_container}>
                            <View style={styles.button}>
                                <Button
                                    text="Giriş Yap"
                                    onPress={handleSubmit}
                                    loading={loading}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    text="Kaydol"
                                    onPress={goToMemberSignUp}
                                    theme="secondary"
                                />
                            </View>
                        </View>
                    </>
                )}
            </Formik> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 48,
        paddingHorizontal: 24,
        paddingBottom: 99
    },
    text: {
        marginVertical: 32,
        fontSize: 30,
        fontFamily: "Mulish-Medium",
    },
    detail: {
        fontSize: 14,
        fontFamily: "Mulish-Medium",
        color:colors.color_gray
    },
    button_container: {
        paddingVertical: 8,
    },
    button: {
        paddingVertical: 8,
        flexDirection: "row",
    },
});

export default LoginScreen;




// // import React, { useState } from "react";
// // import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// // import Button from "../components/Button/Button";
// // import InputBar from "../components/InputBar";
// // import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// // import app from "../../firebaseConfig";
// // import { Formik } from "formik";
// // import ErrorHandler, { showTopMessage } from "../utils/ErrorHandler";
// // import { colors } from "../styles/Theme";

// // const initialFormValues = {
// //     usermail: "",
// //     password: "",
// // };

// // const LoginScreen = ({ navigation }) => {
// //     const [loading, setLoading] = useState(false);

// //     function handleFormSubmit(formValues) {
// //         const auth = getAuth(app);

// //         setLoading(true); // İşlem başladığında yüklemeyi etkinleştir

// //         signInWithEmailAndPassword(
// //             auth,
// //             formValues.usermail,
// //             formValues.password
// //         )
// //             .then((res) => {
// //                 showTopMessage("Giriş Başarılı !", "success");
// //                 setLoading(false); // İşlem tamamlandığında yüklemeyi devre dışı bırak
// //                 goToUserProfile();
// //             })
// //             .catch((err) => {
// //                 setLoading(false);
// //                 showTopMessage(ErrorHandler(err.code), "danger");
// //             });
// //     }

// //     // Navigation

// //     function goToMemberSignUp() {
// //         navigation.navigate("SignUpScreen");
// //     }

// //     // Navigation

// //     function goToUserProfile() {
// //         navigation.navigate("UserProfileScreen");
// //     }

// //     return (
// //         <View style={styles.container}>
// //             <Text style={styles.text}> Giriş Yapın </Text>
// //             <Formik
// //                 initialValues={{ initialFormValues }}
// //                 onSubmit={handleFormSubmit}
// //             >
// //                 {({ values, handleChange, handleSubmit }) => (
// //                     <>
// //                         <View style={styles.input_container}>
// //                             <InputBar
// //                                 onType={handleChange("usermail")}
// //                                 value={values.usermail}
// //                                 placeholder={"E-posta adresi"}
// //                             />
// //                             <InputBar
// //                                 onType={handleChange("password")}
// //                                 value={values.password}
// //                                 placeholder={"Parola"}
// //                                 isSecure
// //                             />
// //                             <TouchableOpacity style={styles.button}>
// //                                 <Text style={styles.detail}>Parolamı Unuttum?</Text>
// //                             </TouchableOpacity>
// //                         </View>
// //                         <View style={styles.button_container}>
// //                             <View style={styles.button}>
// //                                 <Button
// //                                     text="Giriş Yap"
// //                                     onPress={handleSubmit}
// //                                     loading={loading}
// //                                 />
// //                             </View>
// //                             <View style={styles.button}>
// //                                 <Button
// //                                     text="Kaydol"
// //                                     onPress={goToMemberSignUp}
// //                                     theme="secondary"
// //                                 />
// //                             </View>
// //                         </View>
// //                     </>
// //                 )}
// //             </Formik>
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         justifyContent: "flex-start",
// //         marginTop: 48,
// //         paddingHorizontal: 24,
// //     },
// //     text: {
// //         marginVertical: 32,
// //         fontSize: 30,
// //         fontFamily: "Mulish-Medium",
// //     },
// //     detail: {
// //         fontSize: 14,
// //         fontFamily: "Mulish-Medium",
// //         color:colors.color_gray
// //     },
// //     button_container: {
// //         paddingVertical: 8,
// //     },
// //     button: {
// //         paddingVertical: 8,
// //         flexDirection: "row",
// //     },
// // });

// // export default LoginScreen;



// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import Button from "../components/Button/Button";
// import InputBar from "../components/InputBar";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import app from "../../firebaseConfig";
// import { Formik } from "formik";
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import ErrorHandler, { showTopMessage } from "../utils/ErrorHandler";
// import { colors } from "../styles/Theme";

// const initialFormValues = {
//     usermail: "",
//     password: "",
// };

// const LoginScreen = ({ navigation }) => {
//     const [loading, setLoading] = useState(false);

//     // async function handleFormSubmit(formValues) {
//     //     setLoading(true);
//     //     AsyncStorage.setItem('isLogin', 'true');
      
//     //     setLoading(false);
       
//     // }

//     async function handleFormSubmit(formValues) {
//         setLoading(true);
//         try {
//             // Your authentication logic here
//             AsyncStorage.setItem('isLogin', 'true');
//             setLoading(false);
//             navigation.navigate("Anasayfa"); // Navigate to HomeScreen within the tab navigator
//         } catch (error) {
//             setLoading(false);
//             console.error("Authentication error:", error.message);
//             showTopMessage("Authentication error: " + error.message);
//         }
//     }

//     // Navigation

//     function goToMemberSignUp() {
//         AsyncStorage.clear();
//         navigation.navigate("SignUpScreen");
//     }

//     // Navigation

//     function goToUserProfile() {
//         navigation.navigate("UserProfileScreen");
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.text}> Giriş Yapın </Text>
//             <Formik
//                 initialValues={{ initialFormValues }}
//                 onSubmit={handleFormSubmit}
//             >
//                 {({ values, handleChange, handleSubmit }) => (
//                     <>
//                         <View style={styles.input_container}>
//                             <InputBar
//                                 onType={handleChange("usermail")}
//                                 value={values.usermail}
//                                 placeholder={"E-posta adresi"}
//                             />
//                             <InputBar
//                                 onType={handleChange("password")}
//                                 value={values.password}
//                                 placeholder={"Parola"}
//                                 isSecure
//                             />
//                             <TouchableOpacity style={styles.button}>
//                                 <Text style={styles.detail}>Parolamı Unuttum?</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={styles.button_container}>
//                             <View style={styles.button}>
//                                 <Button
//                                     text="Giriş Yap"
//                                     onPress={handleSubmit}
//                                     loading={loading}
//                                 />
//                             </View>
//                             <View style={styles.button}>
//                                 <Button
//                                     text="Kaydol"
//                                     onPress={goToMemberSignUp}
//                                     theme="secondary"
//                                 />
//                             </View>
//                         </View>
//                     </>
//                 )}
//             </Formik>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "flex-start",
//         marginTop: 48,
//         paddingHorizontal: 24,
//     },
//     text: {
//         marginVertical: 32,
//         fontSize: 30,
//         fontFamily: "Mulish-Medium",
//     },
//     detail: {
//         fontSize: 14,
//         fontFamily: "Mulish-Medium",
//         color:colors.color_gray
//     },
//     button_container: {
//         paddingVertical: 8,
//     },
//     button: {
//         paddingVertical: 8,
//         flexDirection: "row",
//     },
// });

// export default LoginScreen;
