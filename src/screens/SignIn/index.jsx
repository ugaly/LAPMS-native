// import React, { useContext } from 'react';
// import {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   Easing,
//   interpolate,
//   runOnJS,
//   Extrapolate,
//   useAnimatedGestureHandler,
// } from 'react-native-reanimated';

// import { PanGestureHandler } from 'react-native-gesture-handler';
// import { Dimensions } from 'react-native';
// import { Hp } from '../../../responsive';

// import modalContext from '../../context/modalContex';

// import {
//   Container,
//   Shape,
//   Background,
//   BackButton,
//   SignInTextInstagram,
//   EnterYourDetailsText,
//   ContainerEmail,
//   UsernameOrEmailText,
//   ContainerInput,
//   TextInputEmail,
//   ForgotPasswordText,
//   LoginButton,
//   LoginEmailText,
//   LogoContainer,
//   ContainerPassword,
//   OpacityBackground,
//   ContainerForgot,
// } from './styled';

// import BackSvg from '../../assets/Back.svg';
// import EmailSvg from '../../assets/Email.svg';
// import Password from '../../assets/Password.svg';
// import Logo from '../../assets/Logo.svg';

// const email = 'joandersonbatista.br@icloud.com';
// const { height } = Dimensions.get('window');

// export default function ModalSignIn() {
//   const { dispatch } = useContext(modalContext);
//   const [shapeInterpolate, setshaPeInterpolate] = React.useState(false);

//   const modalPosition = useSharedValue(height);
//   const shapePosition = useSharedValue(Hp(75));

//   const shapePositions = [Hp(50), Hp(75.3), Hp(80)];
//   const modalPositions = [Hp(60), Hp(85)];

//   function runDispatch() {
//     dispatch({ type: 'open?' });
//   }

//   function onShapeInterpolate() {
//     setshaPeInterpolate(true);
//   }

//   function openModalAnimated() {
//     modalPosition.value = withTiming(modalPositions[0], {
//       duration: 400,
//       easing: Easing.bezier(0, 0.10, 0, 0.99),
//     }, () => {
//       shapePosition.value = withTiming(shapePositions[0], {
//         duration: 230,
//         easing: Easing.bezier(0, 0.10, 0, 0.99),
//       });
//     });
//   }

//   function closeModal() {
//     modalPosition.value = withTiming(height, {
//       duration: 250,
//     }, () => {
//       runOnJS(runDispatch)();
//     });
//   }

//   const onGestureHandler = useAnimatedGestureHandler({
//     onStart(_, ctx) {
//       ctx.posY = modalPosition.value;
//       runOnJS(onShapeInterpolate)();
//     },
//     onActive(event, ctx) {
//       const positionY = ctx.posY + event.translationY;
//       modalPosition.value = positionY < modalPositions[0] ? modalPositions[0] : positionY;
//     },
//     onEnd() {
//       return modalPosition.value < 150
//         ? runOnJS(openModalAnimated)()
//         : runOnJS(closeModal)();
//     },
//   });

//   React.useEffect(() => {
//     openModalAnimated();
//   }, []);

//   const animatedModal = useAnimatedStyle(() => ({
//     transform: [{ translateY: modalPosition.value }],
//   }));

//   const animatedOpacity = useAnimatedStyle(() => ({
//     opacity: interpolate(
//       modalPosition.value,
//       [height, shapePositions[0]],
//       [0, 1],
//     ),
//   }));

//   const animatedShape = useAnimatedStyle(() => ({
//     transform: [{
//       translateY: !shapeInterpolate ? shapePosition.value : interpolate(
//         modalPosition.value,
//         [height, modalPositions[1]],
//         [height, shapePositions[1]],
//       ),
//     }],
//     opacity: shapeInterpolate ? 0.35 : interpolate(
//       modalPosition.value,
//       [shapePositions[2], shapePositions[1]],
//       [0, 0.35],
//       Extrapolate.CLAMP,
//     ),
//   }));

//   return (
//     <Background>
//       <OpacityBackground style={animatedOpacity} />
//       <Shape style={animatedShape} />
//       <PanGestureHandler onGestureEvent={onGestureHandler}>
//         <Container style={animatedModal}>
//           <BackButton onPress={() => closeModal()}>
//             <BackSvg />
//           </BackButton>
//           <SignInTextInstagram>
//             Entre no
//             {'\n'}
//             Instagram
//           </SignInTextInstagram>
//           <EnterYourDetailsText>
//             Insira seus dados abaixo
//           </EnterYourDetailsText>
//           <ContainerEmail>
//             <UsernameOrEmailText>
//               Nome de usuário ou email
//             </UsernameOrEmailText>
//             <ContainerInput>
//               <EmailSvg />
//               <TextInputEmail
//                 value={email}
//                 placeholderTextColor="#9797BD"
//               />
//             </ContainerInput>
//           </ContainerEmail>
//           <ContainerPassword>
//             <UsernameOrEmailText>
//               Senha
//             </UsernameOrEmailText>
//             <ContainerForgot>
//               <ForgotPasswordText>
//                 Esqueceu a senha?
//               </ForgotPasswordText>
//             </ContainerForgot>
//             <ContainerInput>
//               <Password />
//               <TextInputEmail
//                 placeholder="Senha"
//                 placeholderTextColor="#9797BD"
//               />
//             </ContainerInput>
//           </ContainerPassword>
//           <LoginButton>
//             <LoginEmailText>
//               Entrar
//             </LoginEmailText>
//           </LoginButton>
//           <LogoContainer>
//             <Logo />
//           </LogoContainer>
//         </Container>
//       </PanGestureHandler>
//     </Background>
//   );
// }




import React, { useContext } from 'react';
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
import { Dimensions } from 'react-native';
import { Hp } from '../../../responsive';

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

const email = 'joandersonbatista.br@icloud.com';
const { height } = Dimensions.get('window');

export default function ModalSignIn() {
  const navigation = useNavigation();
  const { dispatch } = useContext(modalContext);
  const [shapeInterpolate, setshaPeInterpolate] = React.useState(false);

  const modalPosition = useSharedValue(height);
  const shapePosition = useSharedValue(Hp(75));

  const shapePositions = [Hp(50), Hp(75.3), Hp(80)];
  const modalPositions = [Hp(60), Hp(85)];

  function runDispatch() {
    dispatch({ type: 'open?' });
  }

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <Background>
        <OpacityBackground style={animatedOpacity} />
        <Shape style={animatedShape} />
        <PanGestureHandler onGestureEvent={onGestureHandler}>
          <Container style={animatedModal}>
            <BackButton onPress={() => closeModal()}>
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
                  // value={email}
                  placeholder="eg. 0769465102"
                  placeholderTextColor="#9797BD"
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
                />
              </ContainerInput>
            </ContainerPassword>
            <LoginButton onPress={() => navigation.navigate("SectionWithTabs")}>
              <LoginEmailText >
                Login
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
