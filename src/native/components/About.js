import React from "react";
import {
  Content,
  Text,
  H1,
  ListItem,
  Right,
  Left,
  List,
  Icon,
  Container
} from "native-base";
import Spacer from "./Spacer";
import Pusher from "pusher-js/react-native";
import { Actions } from "react-native-router-flux";
import Header from "./Header";

import { Alert, Image, View } from "react-native";
Pusher.logToConsole = true;

var pusher = new Pusher("21297c2b7b9a70373e47", {
  cluster: "us2",
  forceTLS: true
});

var channel = pusher.subscribe("my-channel");
channel.bind("my-event", function(data) {
  Alert.alert(data.message);
});
const img_url =
  "https://raw.githubusercontent.com/Mosh-Media/rocket-native/master/src/images/app-rocket.png";
const About = () => (
  <Container>
    <Content>
    <List>
    <View>
    <Content padder>
        <Header
          title="UI Starter Kit"
          content="Our kit provides with all tools you need to get started on your next mobile idea"
        />
        </Content>
        <Image
          source={{ uri: img_url }}
          resizeMode="contain"
          style={{
            height: 250,
            width: null,
            flex: 2,
            borderRadius: 5
          }}
        />

        <ListItem onPress={Actions.signUp} selected>
          <Left>
            <Text>New Account</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem onPress={Actions.login}>
          <Left>
            <Text>Already Have an Account</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        </View>
      </List>
    </Content>
  </Container>
);

export default About;
