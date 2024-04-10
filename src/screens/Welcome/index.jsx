import React, { useContext } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import {
  Svg, Defs, RadialGradient, Stop, Ellipse,
} from 'react-native-svg';
import {
  WelcomeImage,
  ContainerLogin,
  LoginFaceButton,
  ButtonContent,
  LoginFacebookText,
  LoginEmailButton,
  LoginEmailText,
  SignUpContainer,
  SignUpText,
  SignUpTextSpan,
  LogoContainer,
  height,
} from './styled';

import WelcomeJpeg from '../../assets/bg.png';
import Logo from '../../assets/Logo.svg';
import LogoFace from '../../assets/Vector.svg';
import modalContext from '../../context/modalContex';
import ModalSignIn from '../SignIn';

export default function Login() {
  const { state, dispatch } = useContext(modalContext);

  return (
    <>
      {/* <StatusBar
        animated
        showHideTransition="slide"
        translucent
        backgroundColor="transparent"
        hidden={!state.open}
      /> */}
      <WelcomeImage source={WelcomeJpeg} resizeMode="cover">
        <Svg height="100%" width="100%">
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              rx="230"
              ry="230"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor="#2626284D" stopOpacity="0.0" />
              <Stop offset="1" stopColor="#262628CC" stopOpacity="0.3" />
            </RadialGradient>
          </Defs>
          <Ellipse cx="150" cy="150" rx={height * 0.57} ry="100%" fill="url(#grad)" />
        </Svg>
      </WelcomeImage>
      <ContainerLogin>
        <TouchableOpacity style={LoginFaceButton} onPress={() => dispatch({ type: 'open?' })}>
          <ButtonContent >
            {/* <LogoFace height={height * 0.036} /> */}
            <LoginFacebookText>
              Sign In 
            </LoginFacebookText>
          </ButtonContent>
        </TouchableOpacity>
        <LoginEmailButton>
          <LoginEmailText>
          Sign Up 
          </LoginEmailText>
        </LoginEmailButton>
        <SignUpContainer >
          <SignUpText>
            Forget Password?
            <SignUpTextSpan> Send</SignUpTextSpan>
          </SignUpText>
        </SignUpContainer>
        <LogoContainer>
          {/* <Logo /> */}
        </LogoContainer>
      </ContainerLogin>
      {state.open ? <ModalSignIn /> : <></>}
    </>
  );
}