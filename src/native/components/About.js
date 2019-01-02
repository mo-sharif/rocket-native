import React from 'react';
import {
  Container, Content, Text, H1, H2, H3,
} from 'native-base';
import Spacer from './Spacer';
import CameraBrain from './CameraBrain'

const About = () => (
  <Container>
    <Content padder>
      <Spacer size={30} />
      <H1>
       🚀  React Native Kit
      </H1>
      <Spacer size={10} />
      <Text>
        This boilerplate launches with a React web app and React Native app sharing a single code base.
        It shares the 'business logic' (i.e. actions, containers, reducers) across the platforms, whilst 
        allowing flexibility in View components to ensure your project looks and feels native in each platform.
        {' '}
      </Text>

      <Spacer size={30} />
      <H2>
       🔥  Firebase
      </H2>
      <Spacer size={10} />
      <Text>
        Firebase is all ready to go with examples on how to read/write data to/from Firebase.
        {' '}
      </Text>

      <Spacer size={30} />
      <H3>
      ⚛️  Redux
      </H3>
      <Spacer size={10} />
      <Text>
        State management the 'clean way' via Redux is setup with examples - woohoo!
        {' '}
      </Text>
      <CameraBrain />
    </Content>
  </Container>
);

export default About;
