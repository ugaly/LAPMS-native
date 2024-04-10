import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import {
  Hp,
  Header,
  InstagramText,
  ContainerIcons,
  LikeIcon,
  MessageIcon,
  SearchIcon,
  NewbadgeIcon,
  ContainerStory,
} from './styled';

import Storie from '../../components/storyAvatar';

import Logo from '../../assets/Logo.svg';

export default function Feed() {
  return (
    <>
      <StatusBar backgroundColor="white" style="dark-content" />
      <Header>
        <Logo height={Hp(40)} />
        <InstagramText>
          Instagram
        </InstagramText>
        <ContainerIcons>
          <MessageIcon />
          <View>
            <LikeIcon />
            <NewbadgeIcon />
          </View>
          <SearchIcon />
        </ContainerIcons>
      </Header>
      <ContainerStory>
        <Storie />
      </ContainerStory>
    </>
  );
}