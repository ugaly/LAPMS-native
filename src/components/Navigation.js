// import * as React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Button, View, Text } from "react-native";
// import HomeScreen from "../screens/HomeScreen";
// import LoginScreen from "../screens/LoginScreen";
// import iconPref, { customTabButton } from "../utils/NavBarUtils";
// import SignUpScreen from "../screens/SignUpScreen";
// import CalendarScreen from "../screens/CalendarScreen";
// import SearchScreen from "../screens/SearchScreen";
// import ServiceDetailScreen from "../screens/ServiceDetailScreen";
// import ServiceBookingScreen from "../screens/ServiceBookingScreen";
// import NotificationsScreen from "../screens/NotificationsScreen";
// import MapScreen from "../screens/MapScreen";
// import UserProfileScreen from "../screens/UserProfileScreen";
// import AskQuestionScreen from "../screens/AskQuestionScreen";
// import UserInfosScreen from "../screens/UserInfosScreen";
// import BookingHistoryScreen from "../screens/BookingHistoryScreen";
// import FeedBackScreen from "../screens/FeedBackScreen";
// import ModalSignUp from "../screens/SignUp";

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();



// // import AppLoading from 'expo-app-loading';
// import {
//   // eslint-disable-next-line camelcase
//   useFonts, Roboto_500Medium, Roboto_900Black, Roboto_400Regular,
// } from '@expo-google-fonts/roboto';

// import Welcome from '../screens/Welcome';

// import { ModalProvider } from '../context/modalContex';
// import AddComplaintScreen from "../screens/AddComplaintScreen";
// import ChatScreen from "../screens/ChatScreen";



// // Section with tabs
// function SectionWithTabs() {
//   return (
//     <Tab.Navigator screenOptions={iconPref}>
//       <Tab.Screen name="Anasayfa" component={HomeScreen} />
//       {/* <Tab.Screen name="Ara" component={SearchScreen} /> */}
//       <Tab.Screen name="Harita" component={MapScreen} options={{ tabBarButton: customTabButton }} />
//       {/* <Tab.Screen name="Randevularım" component={LoginScreen} /> */}
//       <Tab.Screen name="Profil" component={UserProfileScreen} />
//       {/* <Tab.Screen name="Questions" component={AskQuestionScreen} /> */}
//     </Tab.Navigator>


// // <Tab.Navigator screenOptions={iconPref} initialRouteName="Anasayfa">
// //                  <Tab.Screen name="Anasayfa" component={HomeStack} />
// //                  <Tab.Screen name="Ara" component={SearchStack} />
// //                  <Tab.Screen
// //                     name="Harita"
// //                     component={MapStack}
// //                     options={{ tabBarButton: customTabButton }}
// //                 />
// //                 <Tab.Screen
// //                     name="Randevularım"
// //                     component={getTabScreen(CalendarScreen, AuthStack)}
// //                 />
// //                 <Tab.Screen
// //                     name="Profil"
// //                     component={getTabScreen(UserProfileScreen, AuthStack)}
// //                 />
// //             </Tab.Navigator> 


//   );
// }

// // Initial section without tabs
// function InitialSection({ navigation }) {

//     const [fontsLoaded] = useFonts({
//         Roboto_900Black,
//         Roboto_500Medium,
//         Roboto_400Regular,
//       });
    
//       // if (!fontsLoaded) {
//       //   return <AppLoading />;
//       // }

//   return (
//     <ModalProvider>
//       <Welcome />
//     </ModalProvider>
//   );
// }

// export default Navigation = () => {
//   return (
//     <Stack.Navigator initialRouteName="InitialSection" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="InitialSection" component={InitialSection} />
//       <Stack.Screen name="SectionWithTabs" component={SectionWithTabs} />
//       <Stack.Screen name="Signup" component={ModalSignUp} />
//       {/* <Stack.Screen name="Question" component={AskQuestionScreen} screenOptions={{ headerShown: true }} /> */}
//       <Stack.Screen 
//         name="Question" 
//         component={AskQuestionScreen} 
//         options={{ 
//           headerShown: true,
//           title: 'Ask Your Question' 
//         }} 
//       />

//     <Stack.Screen 
//         name="Complaint" 
//         component={AddComplaintScreen} 
//         options={{ 
//           headerShown: true,
//           title: 'My Complaints' 
//         }} 
//       />


// <Stack.Screen 
// name="Chat"
// component={ChatScreen}
// options={{
//   headerShown: true,
//   title: 'Chat'
// }}
// />


//     </Stack.Navigator>
//   );
// };






import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import GroupScreen from "../screens/GroupScreen"; // Ensure this is the correct import
import iconPref, { customTabButton } from "../utils/NavBarUtils";
 import ModalSignUp from "../screens/SignUp";
 import AskQuestionScreen from "../screens/AskQuestionScreen";
 import GroupDetailScreen from "../screens/GroupDetailScreen";

  import { ModalProvider } from '../context/modalContex';
 import AddComplaintScreen from "../screens/AddComplaintScreen";
 import ChatScreen from "../screens/ChatScreen";

import { Button, View, Text } from "react-native";





import Welcome from '../screens/Welcome';




// Additional imports as required

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SectionWithTabs() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const isCitizen = JSON.parse(await AsyncStorage.getItem('is_citizen'));
        const isLandvaluer = JSON.parse(await AsyncStorage.getItem('is_landvaluer'));
        const isIndemnityPayer = JSON.parse(await AsyncStorage.getItem('is_indemnity_payer'));

        if (isCitizen) {
          setUserType('citizen');
        } else if (isLandvaluer || isIndemnityPayer) {
          setUserType('landvaluerOrIndemnityPayer');
        } else {
          setUserType('default');
        }
      } catch (e) {
        console.error("Failed to load user type from AsyncStorage", e);
      }
    };

    fetchUserType();
  }, []);

  if (userType === null) {
    // Optionally show a loading screen while fetching user type
    return <View><Text>Loading...</Text></View>;
  }

  const initialRouteName = userType === 'citizen' ? 'Anasayfa' : 'GroupScreen';

  return (
    <Tab.Navigator screenOptions={iconPref} initialRouteName={initialRouteName}>
      {userType === 'citizen' && (
        <>
          <Tab.Screen name="Anasayfa" component={HomeScreen} />
          <Tab.Screen name="Harita" component={MapScreen} options={{ tabBarButton: customTabButton }} />
          <Tab.Screen name="Profil" component={UserProfileScreen} />
        </>
      )}
      {userType === 'landvaluerOrIndemnityPayer' && (
        <>
          <Tab.Screen name="GroupScreen" component={GroupScreen} />
          <Tab.Screen name="Profil" component={UserProfileScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}

function InitialSection({ navigation }) {
  // const [fontsLoaded] = useFonts({
  //   Roboto_900Black,
  //   Roboto_500Medium,
  //   Roboto_400Regular,
  // });

  return (
    <ModalProvider>
      <Welcome />
    </ModalProvider>
  );
}

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="InitialSection" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InitialSection" component={InitialSection} />
      <Stack.Screen name="SectionWithTabs" component={SectionWithTabs} />
      <Stack.Screen name="Signup" component={ModalSignUp} />
      <Stack.Screen name="GroupScreen" component={GroupScreen} />
      <Stack.Screen
        name="Question"
        component={AskQuestionScreen}
        options={{
          headerShown: true,
          title: 'Ask Your Question'
        }}
      />
      <Stack.Screen
        name="GroupDetailScreen"
        component={GroupDetailScreen}
        options={{
          headerShown: false,
          title: 'GroupDetailScreen'
        }}
      />
      <Stack.Screen
        name="Complaint"
        component={AddComplaintScreen}
        options={{
          headerShown: true,
          title: 'My Complaints'
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: true,
          title: 'Chat'
        }}
      />
    </Stack.Navigator>
  );
}
