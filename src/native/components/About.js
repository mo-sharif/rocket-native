import React from "react";
import { Content, Text, H1 } from "native-base";
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
const img_url = "/images/app-rocket.png"
const About = () => (
  <Content padder>
    <Spacer size={30} />
    <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
      <Image
        source={{ uri: img_url }}
        style={{
          height: 200,
          width: null,
          flex: 1,
          borderRadius: 5
        }}
      />
    </TouchableOpacity>
  </Content>
);

export default About;
