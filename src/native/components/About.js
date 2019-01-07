import React from 'react';
import { Content, Text, H1 } from 'native-base'
import Spacer from './Spacer'
import Pusher from 'pusher-js/react-native';
import { Alert } from 'react-native';

Pusher.logToConsole = true;

var pusher = new Pusher('21297c2b7b9a70373e47', {
  cluster: 'us2',
  forceTLS: true
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  Alert.alert(data.message);
});

const About = () => (
    <Content padder>
      <Spacer size={30} />
      <H1>
       🚀 Rocket Native
      </H1>
      <Spacer size={10} />
      <Text>
        This boilerplate launches with a React web app and React Native app sharing a single code base.
        It shares the 'business logic' (i.e. actions, containers, reducers) across the platforms, whilst 
        allowing flexibility in View components to ensure your project looks and feels native in each platform.
        {' '}
      </Text>

      <Spacer size={30} />
      <H1>
       🔥 Firebase
      </H1>
      <Spacer size={10} />
      <Text>
        Firebase is all ready to go with examples on how to read/write data to/from Firebase.
        {' '}
      </Text>

      <Spacer size={30} />
      <H1>
      ⚛️ Redux
      </H1>
      <Spacer size={10} />
      <Text>
        State management the 'clean way' via Redux is setup with examples - woohoo!
        {' '}
      </Text>

      <Spacer size={30} />
      <H1>
      🤖 Clarifai
      </H1>
      <Spacer size={10} />
      <Text>
      The Clarifai API offers image and video recognition as a service.Whether you have one image or billions,
      you are only steps away from using artificial intelligence to recognize your visual content.
        {' '}
      </Text>
    </Content>
);

export default About;
