import React, { Component } from "react";
import { View, Button, Content, Text, H1 } from "native-base";
import Spacer from "../Spacer";
import Pusher from "pusher-js/react-native";
import { Actions } from "react-native-router-flux";

export default class PhotoApp extends Component {
  constructor(props) {
    super(props);
    this.pusher = null;
  }
  // ComponentDidMount
  ComponentDidMount() {
    this.pusher = new Pusher("9900f26d75364cd91e45", {
      authEndpoint: "YOUR_NGROK_URL/pusher/auth",
      cluster: "us2",
      encrypted: true
    });
  }
  // Render method
  render() {
    return (
      <View style={styles.container}>
        <Button
          primary
          block
          onPress={() => {
            this.props.navigation.navigate("View", {
              pusher: this.pusher
            });
          }}
        >
          <Text>View</Text>
        </Button>
        <Spacer size={20} />
        <Button
          dark
          block
          onPress={() => {
            Actions.shareScreen("Share", {
              pusher: this.pusher
            });
          }}
        >
          <Text>Share</Text>
        </Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center"
  },
  mainText: {
    fontSize: 25,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 30
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10
  }
};
