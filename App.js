import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import Navigation from "./src/components/Navigation";
import { MenuProvider } from "react-native-popup-menu";

export default function App() {





    const overrideConsoleError = () => {
        const originalError = console.error; // Store reference to the original console.error function
        console.error = () => {}; // Override console.error with an empty function
        console.error.original = originalError; // Store reference to the original console.error function
      };
      
      // Call the function to override console.error
      overrideConsoleError();
      
    return (
        <MenuProvider>
            <NavigationContainer>
                <Navigation />
                <FlashMessage position="top" />
            </NavigationContainer>
        </MenuProvider>
    );
}
