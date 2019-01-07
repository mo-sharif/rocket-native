import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  Button,
  Alert
} from "react-native";

import CardList from "../components/CardList";

import { View, Content, Text, H2 } from "native-base";
import Spacer from "../../native/components/Spacer";
import { addedCard } from "../actions";

export default class ViewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: "View Photos",
      headerTransparent: true,
      headerTintColor: "#333",
      headerRight: (
        <Button
          title="Unfollow"
          color="#333"
          onPress={() => params.unFollow()}
        />
      )
    };
  };

  // Initialize state
  state = {
    subscribedToUsername: "", // the username of the user the current user is subscribed to
    isSubscribed: false // is the user currently subscribed to another user?
  };
  constructor(props) {
    super(props);
    this.pusher = null;
    this.user_channel = null;
  }

  //ComponentDidMount
  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ unFollow: this.unFollow }); // set the unFollow function as a navigation param

    this.pusher = navigation.getParam("pusher");
  }

  render() {
    return (
      <Content padder>
        <Spacer size={30} />
        <View style={styles.container}>
            {!this.state.isSubscribed && (
              <View style={styles.initialContent}>
                <Text style={styles.mainText}>User to follow</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={subscribedToUsername =>
                    this.setState({ subscribedToUsername })
                  }
                >
                  <Text style={styles.textInputText}>
                    {this.state.subscribedToUsername}
                  </Text>
                </TextInput>

                <View style={styles.buttonContainer}>
                  <Button
                    title="Follow"
                    color="#1083bb"
                    onPress={this.followUser}
                  />
                </View>
              </View>
            )}

            {this.state.isSubscribed && (
              <ScrollView>
                <View style={styles.mainContent}>
                  <CardList />
                </View>
              </ScrollView>
            )}
          </View>
      </Content>
    );
  }
  followUser = () => {
    this.setState({
      isSubscribed: true
    });

    // subscribe to the username entered in the text field
    this.user_channel = this.pusher.subscribe(
      `private-user-${this.state.subscribedToUsername}`
    );

    // alert the user if there's an error in subscribing
    this.user_channel.bind("pusher:subscription_error", status => {
      Alert.alert(
        "Error occured",
        "Cannot connect to Pusher. Please restart the app."
      );
    });

    this.user_channel.bind("pusher:subscription_succeeded", () => { // subscription successful
      this.user_channel.bind("client-posted-photo", data => { // listen for the client-posted-photo event to be triggered from the channel
        store.dispatch(addedCard(data.id, data.url)); // dispatch the action for adding a new card to the list
      });
    });
  };
  unFollow = () => {
    this.pusher.unsubscribe(`private-user-${this.state.subscribedToUsername}`);
    this.props.navigation.goBack(); // go back to the home page
  };
}
