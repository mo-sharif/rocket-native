import React from "react";
import { Content, Text, H2 } from "native-base";
import Spacer from "./Spacer";
import PhotoApp from './PhotoShare/PhotoApp'
const About = () => (
  <Content padder>
    <Spacer size={30} />
    <H2>🚀 Rocket Native</H2>
    <Spacer size={10} />
    <Text>
      This boilerplate launches with a React web app and React Native app
      sharing a single code base. It shares the 'business logic' (i.e. actions,
      containers, reducers) across the platforms, whilst allowing flexibility in
      View components to ensure your project looks and feels native in each
      platform.{" "}
    </Text>

    <Spacer size={30} />
    <H2>🔥 Firebase</H2>
    <Spacer size={10} />
    <Text>
      Firebase is all ready to go with examples on how to read/write data
      to/from Firebase.{" "}
    </Text>

    <Spacer size={30} />
    <H2>⚛️ Redux</H2>
    <Spacer size={10} />
    <Text>
      State management the 'clean way' via Redux is setup with examples -
      woohoo!{" "}
    </Text>

    <Spacer size={30} />
    <H2>🤖 Clarifai</H2>
    <Spacer size={10} />
    <Text>
      The Clarifai API offers image and video recognition as a service.Whether
      you have one image or billions, you are only steps away from using
      artificial intelligence to recognize your visual content.{" "}
    </Text>

    <Spacer size={30} />
    <H2>🤳 Photo Sharing</H2>
    <Spacer size={10} />
    <PhotoApp />
  </Content>
);

export default About;
