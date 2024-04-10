// import * as React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// import HomeScreen from "../screens/HomeScreen";
// import LoginScreen from "../screens/LoginScreen";
// import SignUpScreen from "../screens/SignUpScreen";
// import CalendarScreen from "../screens/CalendarScreen";
// import SearchScreen from "../screens/SearchScreen";
// import ServiceDetailScreen from "../screens/ServiceDetailScreen";
// import ServiceBookingScreen from "../screens/ServiceBookingScreen";
// import NotificationsScreen from "../screens/NotificationsScreen";
// import MapScreen from "../screens/MapScreen";
// import UserProfileScreen from "../screens/UserProfileScreen";
// import UserInfosScreen from "../screens/UserInfosScreen";
// import BookingHistoryScreen from "../screens/BookingHistoryScreen";
// import FeedBackScreen from "../screens/FeedBackScreen";

// import app from "../../firebaseConfig";
// import iconPref, { customTabButton } from "../utils/NavBarUtils";
// import { useState } from "react";
// import { getAuth } from "firebase/auth";
// import { useEffect } from "react";

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function AuthStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="LoginScreen"
//                 component={LoginScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="SignUpScreen"
//                 component={SignUpScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="UserProfileScreen"
//                 component={UserProfileScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="ServiceBookingScreen"
//                 component={ServiceBookingScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="BookingHistoryScreen"
//                 component={BookingHistoryScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="UserInfosScreen"
//                 component={UserInfosScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="FeedBackScreen"
//                 component={FeedBackScreen}
//                 options={{ headerShown: false }}
//             />
//         </Stack.Navigator>
//     );
// }

// function SearchStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="SearchScreen"
//                 component={SearchScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="ServiceDetailScreen"
//                 component={ServiceDetailScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="ServiceBookingScreen"
//                 component={ServiceBookingScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="LoginScreen"
//                 component={LoginScreen}
//                 options={{ headerShown: false }}
//             />
//         </Stack.Navigator>
//     );
// }

// function HomeStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="HomeScreen"
//                 component={HomeScreen}
//                 options={{ headerShown: false }}
//             />

//             <Stack.Screen
//                 name="CalendarScreen"
//                 component={CalendarScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="NotificationsScreen"
//                 component={NotificationsScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="SearchScreen"
//                 component={SearchScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="ServiceDetailScreen"
//                 component={ServiceDetailScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="ServiceBookingScreen"
//                 component={ServiceBookingScreen}
//                 options={{ headerShown: false }}
//             />
//         </Stack.Navigator>
//     );
// }

// function MapStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="MapScreen"
//                 component={MapScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="ServiceDetailScreen"
//                 component={ServiceDetailScreen}
//                 options={{ headerShown: false }}
//             />
//         </Stack.Navigator>
//     );
// }

// export default Navigation = () => {
//     const [user, setUser] = useState(getAuth(app).currentUser);
//     const auth = getAuth();

//     //check authentication
//     useEffect(() => {
//         auth.onAuthStateChanged((user) => {
//             setUser(!!user);
//         });
//     }, []);

//     function getTabScreen(authenticatedComponent, defaultComponent) {
//         return user ? authenticatedComponent : defaultComponent;
//     }

//     return (
//         <>
//             <Tab.Navigator screenOptions={iconPref} initialRouteName="Anasayfa">
//                 <Tab.Screen name="Anasayfa" component={HomeStack} />
//                 <Tab.Screen name="Ara" component={SearchStack} />
//                 <Tab.Screen
//                     name="Harita"
//                     component={MapStack}
//                     options={{ tabBarButton: customTabButton }}
//                 />
//                 <Tab.Screen
//                     name="Randevularım"
//                     component={getTabScreen(CalendarScreen, AuthStack)}
//                 />
//                 <Tab.Screen
//                     name="Profil"
//                     component={getTabScreen(UserProfileScreen, AuthStack)}
//                 />
//             </Tab.Navigator>
//         </>
//     );
// };





import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, View, Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import iconPref, { customTabButton } from "../utils/NavBarUtils";
import SignUpScreen from "../screens/SignUpScreen";
import CalendarScreen from "../screens/CalendarScreen";
import SearchScreen from "../screens/SearchScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import ServiceBookingScreen from "../screens/ServiceBookingScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import MapScreen from "../screens/MapScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import UserInfosScreen from "../screens/UserInfosScreen";
import BookingHistoryScreen from "../screens/BookingHistoryScreen";
import FeedBackScreen from "../screens/FeedBackScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



import AppLoading from 'expo-app-loading';
import {
  // eslint-disable-next-line camelcase
  useFonts, Roboto_500Medium, Roboto_900Black, Roboto_400Regular,
} from '@expo-google-fonts/roboto';

import Welcome from '../screens/Welcome';

import { ModalProvider } from '../context/modalContex';



// Section with tabs
function SectionWithTabs() {
  return (
    <Tab.Navigator screenOptions={iconPref}>
      <Tab.Screen name="Anasayfa" component={HomeScreen} />
      <Tab.Screen name="Ara" component={SearchScreen} />
      <Tab.Screen name="Harita" component={MapScreen} options={{ tabBarButton: customTabButton }} />
      <Tab.Screen name="Randevularım" component={LoginScreen} />
      <Tab.Screen name="Profil" component={UserProfileScreen} />
    </Tab.Navigator>


// <Tab.Navigator screenOptions={iconPref} initialRouteName="Anasayfa">
//                  <Tab.Screen name="Anasayfa" component={HomeStack} />
//                  <Tab.Screen name="Ara" component={SearchStack} />
//                  <Tab.Screen
//                     name="Harita"
//                     component={MapStack}
//                     options={{ tabBarButton: customTabButton }}
//                 />
//                 <Tab.Screen
//                     name="Randevularım"
//                     component={getTabScreen(CalendarScreen, AuthStack)}
//                 />
//                 <Tab.Screen
//                     name="Profil"
//                     component={getTabScreen(UserProfileScreen, AuthStack)}
//                 />
//             </Tab.Navigator> 


  );
}

// Initial section without tabs
function InitialSection({ navigation }) {

    const [fontsLoaded] = useFonts({
        Roboto_900Black,
        Roboto_500Medium,
        Roboto_400Regular,
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }

  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text>This is the initial section without tabs</Text>
    //   <Button
    //     title="Go to Section with Tabs"
    //     onPress={() => navigation.navigate("SectionWithTabs")}
    //   />
    // </View>
    <ModalProvider>
      <Welcome />
    </ModalProvider>
  );
}

export default Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="InitialSection" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InitialSection" component={InitialSection} />
      <Stack.Screen name="SectionWithTabs" component={SectionWithTabs} />
    </Stack.Navigator>
  );
};






// import * as React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// import HomeScreen from "../screens/HomeScreen";
// import LoginScreen from "../screens/LoginScreen";
// import SignUpScreen from "../screens/SignUpScreen";
// import CalendarScreen from "../screens/CalendarScreen";
// import SearchScreen from "../screens/SearchScreen";
// import ServiceDetailScreen from "../screens/ServiceDetailScreen";
// import ServiceBookingScreen from "../screens/ServiceBookingScreen";
// import NotificationsScreen from "../screens/NotificationsScreen";
// import MapScreen from "../screens/MapScreen";
// import UserProfileScreen from "../screens/UserProfileScreen";
// import UserInfosScreen from "../screens/UserInfosScreen";
// import BookingHistoryScreen from "../screens/BookingHistoryScreen";
// import FeedBackScreen from "../screens/FeedBackScreen";
// import AsyncStorage from "@react-native-async-storage/async-storage"
// import app from "../../firebaseConfig";
// import iconPref, { customTabButton } from "../utils/NavBarUtils";
// import { useState } from "react";
// import { getAuth } from "firebase/auth";
// import { useEffect } from "react";

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// function AuthStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="LoginScreen"
//                 component={LoginScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="SignUpScreen"
//                 component={SignUpScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="UserProfileScreen"
//                 component={UserProfileScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="ServiceBookingScreen"
//                 component={ServiceBookingScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="BookingHistoryScreen"
//                 component={BookingHistoryScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="UserInfosScreen"
//                 component={UserInfosScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="FeedBackScreen"
//                 component={FeedBackScreen}
//                 options={{ headerShown: false }}
//             />
//         </Stack.Navigator>
//     );
// }

// function SearchStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="SearchScreen"
//                 component={SearchScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="ServiceDetailScreen"
//                 component={ServiceDetailScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="ServiceBookingScreen"
//                 component={ServiceBookingScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="LoginScreen"
//                 component={LoginScreen}
//                 options={{ headerShown: false }}
//             />
//         </Stack.Navigator>
//     );
// }

// function HomeStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="HomeScreen"
//                 component={HomeScreen}
//                 options={{ headerShown: false }}
//             />

//             <Stack.Screen
//                 name="CalendarScreen"
//                 component={CalendarScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="NotificationsScreen"
//                 component={NotificationsScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="SearchScreen"
//                 component={SearchScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="ServiceDetailScreen"
//                 component={ServiceDetailScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="ServiceBookingScreen"
//                 component={ServiceBookingScreen}
//                 options={{ headerShown: false }}
//             />
//         </Stack.Navigator>
//     );
// }

// function MapStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="MapScreen"
//                 component={MapScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="ServiceDetailScreen"
//                 component={ServiceDetailScreen}
//                 options={{ headerShown: false }}
//             />
//         </Stack.Navigator>
//     );
// }

// export default Navigation = () => {
//     const [user, setUser] = useState(getAuth(app).currentUser);
//     const auth = getAuth();


//     const [isLogged, setIsLogged] = useState(false);

//     useEffect(() => {
//         // Check AsyncStorage for the 'isLogin' value
//         AsyncStorage.getItem('isLogin').then((value) => {
//             if (value === 'true') {
//                 setIsLogged(true);
//             } else {
//                 setIsLogged(false);
//             }
//         });
//     }, []);

//     //check authentication
//     useEffect(() => {
//         auth.onAuthStateChanged((user) => {
//             setUser(!!user);
//         });
//     }, []);

//     function getTabScreen(authenticatedComponent, defaultComponent) {
//         return user ? authenticatedComponent : defaultComponent;
//     }

  

//     if (isLogged) {
//         // User is logged in, render Tab Navigator
//         return (
//             <Tab.Navigator screenOptions={iconPref} initialRouteName="Anasayfa">
//                 <Tab.Screen name="Anasayfa" component={HomeStack} />
//                 <Tab.Screen name="Ara" component={SearchStack} />
//                 <Tab.Screen
//                     name="Harita"
//                     component={MapStack}
//                     options={{ tabBarButton: customTabButton }}
//                 />
//                 <Tab.Screen
//                     name="Randevularım"
//                     component={getTabScreen(CalendarScreen, AuthStack)}
//                 />
//                 <Tab.Screen
//                     name="Profil"
//                     component={getTabScreen(UserProfileScreen, AuthStack)}
//                 />
//             </Tab.Navigator>
//         );
//     } else {
//         // User is not logged in, render Stack Navigator
//         return (
//             <Stack.Navigator>
//                 <Stack.Screen
//                     name="LoginScreen"
//                     component={LoginScreen}
//                     options={{ headerShown: false }}
//                 />
//                 <Stack.Screen
//                     name="SignUpScreen"
//                     component={SignUpScreen}
//                     options={{ headerShown: false }}
//                 />
//                 <Stack.Screen
//                     name="UserProfileScreen"
//                     component={UserProfileScreen}
//                     options={{ headerShown: false }}
//                 />
//                 <Stack.Screen
//                     name="ServiceBookingScreen"
//                     component={ServiceBookingScreen}
//                     options={{ headerShown: false }}
//                 />
//                 <Stack.Screen
//                     name="BookingHistoryScreen"
//                     component={BookingHistoryScreen}
//                     options={{ headerShown: false }}
//                 />
//                 <Stack.Screen
//                     name="UserInfosScreen"
//                     component={UserInfosScreen}
//                     options={{ headerShown: false }}
//                 />
//                 <Stack.Screen
//                     name="FeedBackScreen"
//                     component={FeedBackScreen}
//                     options={{ headerShown: false }}
//                 />
//             </Stack.Navigator>
//         );
//     }

// };
