import styled from 'styled-components';
import { Hp, Wp } from '../../../responsive';

import Message from '../../assets/Message.svg';
import Like from '../../assets/Like.svg';
import Search from '../../assets/Search.svg';
import Newbadge from '../../assets/Newbadge.svg';

export { Hp };

export const Header = styled.View`
  margin-top: ${Hp(35)}px;
  flex-direction: row;
  align-items: center;
  width: ${Wp(350)}px;
  align-self: center;
`;

export const InstagramText = styled.Text`
  font-family: Roboto_500Medium;
  font-size: ${Hp(18)}px;
  line-height: ${Hp(21)}px;
  margin-left: ${Wp(8)}px;
  color: #262628;
`;

export const ContainerIcons = styled.View`
  position: absolute;
  right: 0;
  flex-direction: row;
`;

export const MessageIcon = styled(Message)`
  height: ${Hp(25)}px;
  width: ${Wp(25)}px;
  margin-left: ${Wp(15)}px;
`;

export const LikeIcon = styled(Like)`
  height: ${Hp(25)}px;
  width: ${Wp(25)}px;
  margin-left: ${Wp(15)}px;
`;

export const SearchIcon = styled(Search)`
  height: ${Hp(25)}px;
  width: ${Wp(25)}px;
  margin-left: ${Wp(15)}px;
`;

export const NewbadgeIcon = styled(Newbadge)`
  position: absolute;
  right: ${Wp(1)}px;
  top: ${Hp(11)}px;
`;

export const ContainerStory = styled.View`
  width: ${Wp(345)}px;
  margin-top: ${Hp(20)}px;
  align-self: center;
  flex-direction: row;
  
`;