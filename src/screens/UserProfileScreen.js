import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { Feather } from "@expo/vector-icons";
import CardSmall from "../components/CardSmall";
import { showTopMessage } from "../utils/ErrorHandler";
import { colors } from "../styles/Theme";
import UploadImage from "../components/UploadImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import photoUrl from '../services/photoUrl';


export default function UserProfileScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    district: "",
    thumbnail: "" // Ensure thumbnail is included in userInfo state
  });

  useEffect(() => {
    // Fetch user information from AsyncStorage
    AsyncStorage.multiGet([
      "full_name",
      "phone_number",
      "thumbnail",
    ]).then((data) => {
      const fullName = data.find((item) => item[0] === "full_name")?.[1];
      const phoneNumber = data.find((item) => item[0] === "phone_number")?.[1];
      const thumbnail = data.find((item) => item[0] === "thumbnail")?.[1];
      const k = `http://${photoUrl}`+thumbnail

      console.log(fullName, phoneNumber, thumbnail);

      // Check if thumbnail data is retrieved correctly
      console.log("Thumbnail URL:", k);

      // Update userInfo state
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        firstName: fullName?.split(" ")[0] || "",
        lastName: fullName?.split(" ")[1] || "",
        district: phoneNumber || "",
        thumbnail: k || "",
      }));
    });
  }, []);

  // Sign out user
  function handleSignOut() {
    const auth = getAuth(app);

    signOut(auth)
      .then((res) => {
        showTopMessage("Umefanikiwa kulogout", "success");
        navigation.navigate("InitialSection");
        // goToLogin();
      })
      .catch((err) => console.log(err));
  }

  // Navigation
  function goToLogin() {
    navigation.navigate("LoginScreen");
  }

  // Navigation
  function goToBookingHistory() {
    navigation.navigate("BookingHistoryScreen");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header_text}>Profile</Text>

      <View style={styles.section_container}>
        <View style={styles.user_card}>
          <View style={styles.title_container}>
            <Text style={styles.title}>
              {userInfo.firstName} {userInfo.lastName}
            </Text>
            <Text style={styles.desc}>{userInfo.district}</Text>
          </View>
          {/* <UploadImage thumbnail={userInfo.thumbnail} />  */}
        </View>

        {/* <CardSmall
          iconName={"user"}
          text={"Profile Details"}
        /> */}
        {/* <CardSmall
          // onSelect={goToBookingHistory}
          iconName={"list"}
          text={"More info & Location"}
        /> */}
        {/* <CardSmall
          iconName={"message-square"}
          text={"Contact Settings"}
        /> */}

        <View style={styles.logo_container}>
          <Text style={styles.logo_text}>LAPMs</Text>
          <TouchableOpacity
            style={styles.logout_container}
            onPress={handleSignOut}
          >
            <Text style={styles.text}>Logout </Text>
            <Feather
              style={styles.icon}
              name="log-out"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
  },
  user_card: {
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: colors.color_white,
    padding: 16,
  },
  section_container: {
    flex: 1,
    marginBottom: 16,
  },
  text_container: {
    flex: 1,
  },
  title_container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "Mulish-Medium",
  },
  desc: {
    fontSize: 14,
    fontFamily: "Mulish-Light",
    color: colors.color_gray,
  },
  logout_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header_text: {
    marginHorizontal: 24,
    marginVertical: 16,
    fontSize: 30,
    fontFamily: "Mulish-Medium",
  },
  logo_container: {
    flex: 1,
    marginVertical: 24,
    alignItems: "center",
  },
  logo_text: {
    fontSize: 34,
    fontFamily: "Mulish-Medium",
    color: colors.color_light_gray,
  },
  icon: {
    padding: 4,
  },
  text: {
    padding: 8,
    fontSize: 18,
    fontFamily: "Mulish-Medium",
  },
});
