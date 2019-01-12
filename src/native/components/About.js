import React from "react";
import { Content, Text, H1, ListItem, Right, Left, List, Icon } from "native-base";
import Spacer from "./Spacer";
import Pusher from "pusher-js/react-native";
import { Alert, Image, TouchableOpacity } from "react-native";
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
  <Content padder>
    <Spacer size={30} />
    <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 5 }}>
      <H1>Welcome!</H1>
      <Image
        source={{ uri: img_url }}
        style={{
          height: null,
          width: 250,
          flex: 1,
          borderRadius: 5
        }}
      />
    </TouchableOpacity>
    <List>
            <ListItem selected>
              <Left>
                <Text>Simon Mignolet</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
             <Left>
                <Text>Nathaniel Clyne</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Dejan Lovren</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
  </Content>
);

export default About;
