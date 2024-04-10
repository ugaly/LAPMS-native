import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const heightScreen = 812;
const widthScreen = 375;

export function Hp(height) {
  const PxInPercent = (height * 100) / heightScreen;

  return heightPercentageToDP(PxInPercent);
}

export function Wp(width) {
  const PxInPercent = (width * 100) / widthScreen;

  return widthPercentageToDP(PxInPercent);
}