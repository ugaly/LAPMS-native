import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

import { Hp, Wp } from '../../../responsive';

export const Background = styled.View`
  flex: 1;
`;

export const OpacityBackground = styled(Animated.View)`
  height: 100%;
  width: 100%;
  background-color: rgba(38, 38, 40, 0.85);
  position: absolute;
`;

export const Container = styled(Animated.View)`
  position: absolute;
  background-color: white;
  height: ${Hp(850)}px;
  width: ${Wp(375)}px;
  border-top-left-radius: ${Hp(20)}px;
  border-top-right-radius: ${Hp(20)}px;
`;

export const Shape = styled(Animated.View)`
  height: ${Hp(10)}px;
  width: ${Wp(320)}px;
  background-color: transparent;
  position: absolute;
  opacity: 0.35;
  align-self: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export const BackButton = styled.TouchableOpacity`
  margin: ${Hp(17)}px 0px 0px ${Wp(10)}px;
  height: ${Hp(36)}px;
  width: ${Wp(36)}px;
`;

export const SignInTextInstagram = styled.Text`
 
  font-weight: 900;
  font-size: ${Hp(36)}px;
  line-height: ${Hp(42)}px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #262628;
  margin-top: ${Hp(40)}px;
`;

export const EnterYourDetailsText = styled.Text`
  font-weight: 500;
  font-size: ${Hp(16)}px;
  line-height: 19px;
  color: #9797BD;
  text-align: center;
  margin-top: ${Hp(13)}px;
`;

export const ContainerEmail = styled.View`
  width: ${Wp(305)}px;
  align-self: center;
  margin-top: ${Hp(0)}px;
`;

export const ContainerPassword = styled.View`
  width: ${Wp(305)}px;
  align-self: center;
  margin-top: ${Hp(21)}px;
`;

export const UsernameOrEmailText = styled.Text`
  font-weight: 500;
  font-size: ${Hp(13)}px;
  line-height: ${Hp(15)}px;
  color: #262628;
`;

export const ContainerInput = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${Hp(60)}px;
  border: 1px solid rgba(38, 38, 40, 0.20);
  border-radius: ${Hp(14)}px;
  margin-top: ${Hp(10)}px;
  padding: 0px 20px;
  align-items: center;
`;

export const TextInputEmail = styled.TextInput`
  padding-left: ${Wp(10)}px;
  width: 80%;
  
  color: #262628;
  font-size: ${Hp(14)}px;
  line-height: ${Hp(16)}px;
`;

export const ContainerForgot = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
`;

export const ForgotPasswordText = styled.Text`
  font-weight: 500;
  font-size: ${Hp(14)}px;
  line-height: ${Hp(15)}px;
  color: #43A2FA;
  
`;

export const LoginButton = styled.TouchableOpacity`
  width: ${Wp(305)}px;
  height: ${Hp(60)}px;
  background-color: #262628;
  border-radius: ${Hp(14)}px;
  margin-top: ${Hp(20)}px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const LoginEmailText = styled.Text`
  font-size: ${Hp(14)}px;
  color: white;
  line-height: ${Hp(16)}px;
`;

export const LogoContainer = styled.View`
  align-self: center;
  margin-top: ${Hp(40)}px;
`;