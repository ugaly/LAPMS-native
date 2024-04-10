import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native';

import { Hp, Wp } from '../../../responsive';

export const { height } = Dimensions.get('window');

export const WelcomeImage = styled.ImageBackground`
  height: ${Hp(465)}px;
  width: 100%;
  position: absolute;
`;

export const ContainerLogin = styled.View`
  height: ${Hp(380)}px;
  width: 100%;
  position: absolute;
  background-color: white;
  border-top-left-radius: ${Hp(20)}px;
  border-top-right-radius: ${Hp(20)}px;
  align-items: center;
  bottom: 0px;
`;

export const { LoginFaceButton } = StyleSheet.create({
  LoginFaceButton: {
    width: Wp(305),
    height: Hp(60),
    backgroundColor: '#3B5999',
    marginTop: Hp(50),
    borderRadius: Hp(14),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
});

export const ButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LoginFacebookText = styled.Text`
  font-size: ${Hp(14)}px;
  color: white;
  font-family: Roboto_500Medium;
  line-height: ${Hp(16)}px;
  padding-left: ${Wp(10)}px;
`;

export const LoginEmailButton = styled.TouchableOpacity`
  width: ${Wp(305)}px;
  height: ${Hp(60)}px;
  background-color: #262628;
  border-radius: ${Hp(14)}px;
  margin-top: ${Hp(20)}px;
  align-items: center;
  justify-content: center;
`;

export const LoginEmailText = styled.Text`
  font-size: ${Hp(14)}px;
  color: white;
  font-family: Roboto_500Medium;
  line-height: ${Hp(16)}px;
`;

export const SignUpContainer = styled.TouchableOpacity`
  margin-top: ${Hp(61)}px;
`;

export const SignUpText = styled.Text`
  font-size: ${Hp(14)}px;
  color: black;
  font-family: Roboto_500Medium;
  line-height: ${Hp(16)}px;
`;

export const SignUpTextSpan = styled.Text`
  color: #43A2FA;
`;

export const LogoContainer = styled.View`
  margin-top: ${Hp(40)}px;
`;