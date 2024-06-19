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
import jwtDecode from 'jwt-decode'; // Correct import statement
import { decode } from 'base-64';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Dimensions, Alert, ActivityIndicator } from 'react-native'; // Import Alert and ActivityIndicator
import { Hp } from '../../../responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import modalContext from '../../context/modalContex';
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

const { height } = Dimensions.get('window');

export default function ModalSignIn() {
  const navigation = useNavigation();
  const { dispatch } = useContext(modalContext);
  const [shapeInterpolate, setShapeInterpolate] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tokenPayload, setTokenPayload] = useState(null); // State to hold decoded token payload
  const [loading, setLoading] = useState(false); // State to track loading state

  const modalPosition = useSharedValue(height);
  const shapePosition = useSharedValue(Hp(75));

  const shapePositions = [Hp(50), Hp(75.3), Hp(80)];
  const modalPositions = [Hp(60), Hp(85)];

  function runDispatch() {
    dispatch({ type: 'open?' });
  }

  function onShapeInterpolate() {
    setShapeInterpolate(true);
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

  function closeModal() {
    modalPosition.value = withTiming(height, {
      duration: 250,
    }, () => {
      runOnJS(runDispatch)();
    });
  }

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
        : runOnJS(closeModal)();
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

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);

    if (!username || !password) {
      Alert.alert('Error', 'Please enter a username and password');
      return;
    }
  
    setLoading(true); // Set loading state to true
  
    api.post('/login', {
      username: username,
      password: password,
    })
      .then((res) => {
        // console.log(res.data);
        try {
          const tokenParts = res.data.access.split('.');
          const payload = JSON.parse(decode(tokenParts[1]));
           console.log(payload);
          setTokenPayload(payload); // Set the decoded token payload
  
          // Extract fields from the token payload
          const { user_id, full_name, is_citizen, is_landvaluer, is_indemnity_payer, username, thumbnail, phone_number } = payload;
  
          // Store the access token and other fields in AsyncStorage
          AsyncStorage.multiSet([
            ['access', res.data.access],
            ['full_name', full_name || ''],
            ['is_citizen', JSON.stringify(is_citizen)],
            ['is_landvaluer', JSON.stringify(is_landvaluer)],
            ['is_indemnity_payer', JSON.stringify(is_indemnity_payer)],
            ['username', username || ''],
            ['thumbnail', thumbnail || ''],
            ['phone_number', phone_number || ''],
            ['user_id', String(user_id) || '0']
          ])
            .then(() => {
              // Navigate to next screen upon successful login
              navigation.navigate("SectionWithTabs");
            })
            .catch((error) => {
              console.error('Error storing data in AsyncStorage:', error);
            });
        } catch (error) {
          console.error('Error decoding token:', error);
          Alert.alert('Token Decoding Failed', 'Failed to decode token. Please try again.');
        } finally {
          setLoading(false); // Set loading state back to false
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
  
        if (error.response) {
          if (error.response.status === 401) {
            Alert.alert('Authentication Failed', 'Invalid credentials. Please try again.');
            console.log(error.response.data.detail);
          } else {
            Alert.alert('Server Error', 'An error occurred on the server. Please try again later.');
          }
        } else {
          Alert.alert('Error', 'An error occurred during login. Please try again later.');
        }
        
        setLoading(false); // Set loading state back to false
      });
  }
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Background>
        <OpacityBackground style={animatedOpacity} />
        <Shape style={animatedShape} />
        <PanGestureHandler onGestureEvent={onGestureHandler}>
          <Container style={animatedModal}>
            <BackButton onPress={closeModal}>
              <BackSvg />
            </BackButton>
            <SignInTextInstagram>
              Welcome to
              {'\n'}
              LAPMs
            </SignInTextInstagram>
            <EnterYourDetailsText>
              SignIn as Citizen
            </EnterYourDetailsText>
            <ContainerEmail>
              <UsernameOrEmailText>
                Username
              </UsernameOrEmailText>
              <ContainerInput>
                <EmailSvg />
                <TextInputEmail
                  placeholder="eg. 0769465102"
        //          keyboardType='numeric'
                  placeholderTextColor="#9797BD"
                  value={username}
                  onChangeText={setUsername}
                />
              </ContainerInput>
            </ContainerEmail>
            <ContainerPassword>
              <UsernameOrEmailText>
                Password
              </UsernameOrEmailText>
              <ContainerForgot>
                <ForgotPasswordText>
                  Forget your password?
                </ForgotPasswordText>
              </ContainerForgot>
              <ContainerInput>
                <Password />
                <TextInputEmail
                  placeholder="*************"
                  placeholderTextColor="#9797BD"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </ContainerInput>
            </ContainerPassword>
            <LoginButton onPress={handleLogin}>
              {loading ? ( // Render loading indicator if loading state is true
                <ActivityIndicator color="white" />
              ) : (
                <LoginEmailText>
                  {loading ? 'Loading...' : 'Login'} 
                </LoginEmailText>
              )}
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
