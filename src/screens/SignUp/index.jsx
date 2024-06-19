import React, { useContext, useState } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  runOnJS,
  Extrapolate,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import { Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

import { Hp } from '../../../responsive';


import {
  Container,
  Shape,
  Background,
  BackButton,
  SignInTextInstagram,
  EnterYourDetailsText,
  ContainerEmail,
  UsernameOrEmailText,
  ContainerInput,
  TextInputEmail,
  ForgotPasswordText,
  LoginButton,
  LoginEmailText,
  LogoContainer,
  ContainerPassword,
  OpacityBackground,
  ContainerForgot,
} from './styled';

import BackSvg from '../../assets/Back.svg';
import EmailSvg from '../../assets/Email.svg';
import Password from '../../assets/Password.svg';
import Logo from '../../assets/Logo.svg';

import { useNavigation } from '@react-navigation/native';

const email = 'joandersonbatista.br@icloud.com';
const { height } = Dimensions.get('window');

export default function ModalSignUp() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // const { dispatch } = useContext(modalContext);
  const [shapeInterpolate, setshaPeInterpolate] = React.useState(false);

  const modalPosition = useSharedValue(height);
  const shapePosition = useSharedValue(Hp(75));

  const shapePositions = [Hp(50), Hp(75.3), Hp(80)];
  const modalPositions = [Hp(60), Hp(85)];

  // function runDispatch() {
  //   dispatch({ type: 'open?' });
  // }

  function onShapeInterpolate() {
    setshaPeInterpolate(true);
  }

  function openModalAnimated() {
    modalPosition.value = withTiming(modalPositions[0], {
      duration: 400,
      easing: Easing.bezier(0, 0.10, 0, 0.99),
    }, () => {
      shapePosition.value = withTiming(shapePositions[0], {
        duration: 230,
        easing: Easing.bezier(0, 0.10, 0, 0.99),
      });
    });
  }

  // function closeModal() {
  //   modalPosition.value = withTiming(height, {
  //     duration: 250,
  //   }, () => {
  //     runOnJS(runDispatch)();
  //   });
  // }

  const onGestureHandler = useAnimatedGestureHandler({
    onStart(_, ctx) {
      ctx.posY = modalPosition.value;
      runOnJS(onShapeInterpolate)();
    },
    onActive(event, ctx) {
      const positionY = ctx.posY + event.translationY;
      modalPosition.value = positionY < modalPositions[0] ? modalPositions[0] : positionY;
    },
    onEnd() {
      return modalPosition.value < 150
        ? runOnJS(openModalAnimated)()
        : runOnJS(navigation.goBack)();
    },
  });

  React.useEffect(() => {
    openModalAnimated();
  }, []);

  const animatedModal = useAnimatedStyle(() => ({
    transform: [{ translateY: modalPosition.value }],
  }));

  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      modalPosition.value,
      [height, shapePositions[0]],
      [0, 1],
    ),
  }));

  const animatedShape = useAnimatedStyle(() => ({
    transform: [{
      translateY: !shapeInterpolate ? shapePosition.value : interpolate(
        modalPosition.value,
        [height, modalPositions[1]],
        [height, shapePositions[1]],
      ),
    }],
    opacity: shapeInterpolate ? 0.35 : interpolate(
      modalPosition.value,
      [shapePositions[2], shapePositions[1]],
      [0, 0.35],
      Extrapolate.CLAMP,
    ),
  }));


  // const handleSignUp = async () => {
  //   if (password === repeatPassword) {
  //     try {
  //       const response = await api.post('/citizens/', {
  //         full_name: fullName,
  //         phone_number: phoneNumber,
  //         email: phoneNumber + '@example.com', // You can set a default email format here
  //         password: password,
  //         is_citizen: true,
  //       });
  //       console.log(response.status);
  //       if (response.status === 201) {
  //         Alert.alert('Success', 'User created successfully');
  //         // Navigate to another screen or perform any other actions after successful sign up
  //         navigation.goBack();
  //       } else {
  //         Alert.alert('Error', 'Failed to create userrrrr');
  //         console.log(response.data);
  //       }
  //     } catch (error) {
  //       Alert.alert('Error', 'Failed to create user');
  //       console.log('mmmmmmmmmm',error);}
  //   } else {
  //     Alert.alert('Error', 'Passwords do not match');
  //   }
  // };



  const handleSignUp = async () => {
    // Validate phone number format

    if(!phoneNumber || !fullName || !password || !repeatPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }


    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid phone number (10 digits)');
      return;
    }
  
    // Validate password length
    if (password.length < 4) {
      Alert.alert('Error', 'Password must be at least 4 characters long');
      return;
    }
  
    // Check if passwords match
    if (password !== repeatPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    // If all validations pass, proceed with sign up
    try {
      const response = await api.post('/citizens/', {
        full_name: fullName,
        phone_number: phoneNumber,
        email: phoneNumber + '@example.com', // You can set a default email format here
        password: password,
        is_citizen: true,
      });
      console.log(response.status);
      if (response.status === 201) {
        Alert.alert('Success', 'User created successfully');
        // Navigate to another screen or perform any other actions after successful sign up
        navigation.goBack();
        // navigation.navigate('SectionWithTabs');
      } else {
        Alert.alert('Error', 'Failed to create user');
        console.log(response);
      }
    } catch (error) {
      Alert.alert(error.response.data.error);
      console.log(error.response.data.error);
    }
  };
  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Background>
        <OpacityBackground style={animatedOpacity} />
        <Shape style={animatedShape} />
        <PanGestureHandler onGestureEvent={onGestureHandler}>
          <Container style={animatedModal}>
            <BackButton onPress={() => navigation.goBack()}>
              <BackSvg />
            </BackButton>
            <SignInTextInstagram>
              Welcome to
              {'\n'}
              LAPMs
            </SignInTextInstagram>
            <EnterYourDetailsText>
              SignUp as Citizen
            </EnterYourDetailsText>
           
          
            <ContainerPassword>

            <ContainerEmail>
            <ContainerInput>
              <EmailSvg />
              <TextInputEmail
                placeholder="Phone eg. 0769465102"
                placeholderTextColor="#9797BD"
                keyboardType='numeric'
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </ContainerInput>
          </ContainerEmail>

           
              <ContainerInput>
                <EmailSvg />
                <TextInputEmail
                  placeholder="Full Name"
                  placeholderTextColor="#9797BD"
                  style={{  textTransform: 'capitalize' }}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </ContainerInput>
           
              
              <ContainerInput>
                <Password />
                <TextInputEmail
                  placeholder="Password"
                  placeholderTextColor="#9797BD"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
              </ContainerInput>
              <ContainerInput>
                <Password />
                <TextInputEmail
                  placeholder="Repeat Password"
                  placeholderTextColor="#9797BD"
                  secureTextEntry={true}
                  value={repeatPassword}
                  onChangeText={setRepeatPassword}
                />
              </ContainerInput>
            </ContainerPassword>
            <LoginButton onPress={handleSignUp}>
              <LoginEmailText>
                Sign Up
              </LoginEmailText>
            </LoginButton>
            <LogoContainer>
              {/* <Logo /> */}
            </LogoContainer>
          </Container>
        </PanGestureHandler>
      </Background>
    </GestureHandlerRootView>
  );
}
