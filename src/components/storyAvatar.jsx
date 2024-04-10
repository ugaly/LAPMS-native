import React from 'react';
import styled from 'styled-components';
import { Hp, Wp } from '../../responsive';

import You from '../assets/You.svg';
import Path from '../assets/Path.svg';
import Jhonn from '../assets/jhonn.png';

const ContainerStories = styled.View`
  align-items: center;
  justify-content: center;
`;

const TextStory = styled.Text`
  font-size: ${Hp(12)}px;
  line-height: ${Hp(14)}px;
  color: #262628;
  margin-top: ${Hp(10)}px;
`;

const JhonnPng = styled.Image`
  height: ${Hp(48)}px;
  width: ${Hp(48)}px;
`;

export default function StoryAvatar() {
  return (
    <>
      <ContainerStories>
        <You height={Hp(50)} width={Wp(50)} />
        <TextStory>You</TextStory>
      </ContainerStories>
      <ContainerStories>
        <JhonnPng source={Jhonn} />
        <TextStory>John D.</TextStory>
        <Path height={Hp(50)} width={Wp(42.93)} style={{ position: 'absolute' }} />
      </ContainerStories>
    </>
  );
}