import React, { Component } from "react";
import {
  TouchableOpacity,
  Clipboard,
  Alert,
  Image,
  Dimensions,
  Button,
  ScrollView
} from "react-native";
import { View, Content, Text, H2 } from "native-base";
import Spacer from "../Spacer";

import { MaterialIcons } from "@expo/vector-icons";
import { Camera, Permissions } from "expo";
import generateRandomAnimalName from "random-animal-name-generator"; // for generating unique usernames

import { Actions } from 'react-native-router-flux';

export default class ShareScreen extends Component {
    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      return {
        title: "Share Photos",
        headerTransparent: true,
        headerRight: (
          <Button
            title="Finish"
            color="#333"
            onPress={() => params.finishSharing()}
          />
        ),
        headerTintColor: "#333"
      };
    };

    // Initialize state
    state = {
        hasCameraPermission: null, // whether the user has allowed the app to access the device's camera
        cameraType: Camera.Constants.Type.front, // which camera to use? front or back?
        isCameraVisible: false, // whether the camera UI is currently visible or not
        latestImage: null // the last photo taken by the user
      };

      constructor(props) {
        super(props);
        // generate unique username
        const animalName = generateRandomAnimalName()
          .replace(" ", "_")
          .toLowerCase();
        const min = 10;
        const max = 99;
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        const username = animalName + number;
        this.username = username;
  
        // initialize pusher
        this.pusher = null;
        this.user_channel = null;
  
        // allow changing of screen orientation
        Expo.ScreenOrientation.allowAsync(
          Expo.ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN // enable all screen orientations except upside-down/reverse portrait
        );
      }
  
      // ComponentDidMount
      async componentDidMount() {
        const { navigation } = this.props;
  
        navigation.setParams({
          finishSharing: this.finishSharing
        });
  
        // subscribe to channel
        this.pusher = navigation.getParam("pusher");
        this.user_channel = this.pusher.subscribe(`private-user-${this.username}`);
  
        // ask user to access device camera
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });
      }

      //Render method
      render() {
        return (
          <Content padder>
          <Spacer size={30} />
            {!this.state.isCameraVisible && (
              <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.mainContent}>
                  <TouchableOpacity onPress={this.copyUsernameToClipboard}>
                    <View style={styles.textBox}>
                      <Text style={styles.textBoxText}>{this.username}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.openCamera}>
                      <MaterialIcons name="camera-alt" size={40} color="#1083bb" />
                    </TouchableOpacity>
                  </View>
  
                  {this.state.latestImage && (
                    <Image
                      style={styles.latestImage}
                      resizeMode={"cover"}
                      source={{ uri: this.state.latestImage }}
                    />
                  )}
                </View>
              </ScrollView>
            )}
  
            {this.state.isCameraVisible && (
              <Camera
                style={styles.camera}
                type={this.state.cameraType}
                ref={ref => {
                  this.camera = ref;
                }}
              >
                <View style={styles.cameraFiller} />
                <View style={styles.cameraContent}>
                  <TouchableOpacity
                    style={styles.buttonFlipCamera}
                    onPress={this.flipCamera}
                  >
                    <MaterialIcons name="flip" size={25} color="#e8e827" />
                  </TouchableOpacity>
  
                  <TouchableOpacity
                    style={styles.buttonCamera}
                    onPress={this.takePicture}
                  >
                    <MaterialIcons name="camera" size={50} color="#e8e827" />
                  </TouchableOpacity>
  
                  <TouchableOpacity
                    style={styles.buttonCloseCamera}
                    onPress={this.closeCamera}
                  >
                    <MaterialIcons name="close" size={25} color="#e8e827" />
                  </TouchableOpacity>
                </View>
              </Camera>
            )}
          </Content>
        );
      }
  
      //copyUsernameToClipboard

      copyUsernameToClipboard = () => {
        Clipboard.setString(this.username);
        Alert.alert("Copied!", "Username was copied clipboard");
      };
  
      //openCamera
      openCamera = () => {
        const { hasCameraPermission } = this.state;
        if (!hasCameraPermission) {
          Alert.alert("Error", "No access to camera");
        } else {
          this.setState({ isCameraVisible: true });
        }
      };
  
      flipCamera = () => {
        this.setState({
          cameraType:
            this.state.cameraType === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
        });
      };
  
      closeCamera = () => {
        this.setState({
          isCameraVisible: false
        });
      };
  
      //takePicture
      takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync({ base64: true }); // take a snap, and return base64 representation
  
          // construct
          let formData = new FormData();
          formData.append("image", photo.base64); 
          formData.append("type", "base64");
  
          this.setState({
            latestImage: photo.uri, // preview the photo that was taken
            isCameraVisible: false // close the camera UI after taking the photo
          });
  
          const response = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
              Authorization: "Client-ID YOUR_IMGUR_APP_ID" // add your Imgur App ID here
            },
            body: formData
          });
  
          let response_body = await response.json(); // get the response body
  
          // send data to all subscribers who are listening to the client-posted-photo event
          this.user_channel.trigger("client-posted-photo", {
            id: response_body.data.id, // unique ID assigned to the image
            url: response_body.data.link // Imgur link pointing to the actual image
          });
        }
      };
  
      //finishSharing
      finishSharing = () => {
        this.pusher.unsubscribe(`private-user-${this.username}`);
        Actions.pop(); // go back to home screen
      };

  }

  const styles = {
    container: {
      flex: 1,
      backgroundColor: "#fafafa"
    },
    scroll: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 70
    },
    mainContent: {
      flex: 1
    },
    textBox: {
      borderStyle: "dashed",
      borderWidth: 3,
      borderColor: "#4e4e4e",
      backgroundColor: "#FFF",
      padding: 5
    },
    textBoxText: {
      fontSize: 18,
      fontWeight: "bold"
    },
    buttonContainer: {
      alignItems: "center",
      marginTop: 20
    },
    latestImage: {
      width: 150,
      height: 150,
      marginTop: 10,
      borderWidth: 5,
      borderColor: "#FFF",
      alignSelf: "center"
    },
    camera: {
      flex: 1
    },
    cameraFiller: {
      flex: 8
    },
    cameraContent: {
      flex: 2,
      backgroundColor: "transparent",
      flexDirection: "row"
    },
    buttonFlipCamera: {
      flex: 3,
      padding: 10,
      alignSelf: "flex-end",
      alignItems: "center"
    },
    buttonTextFlipCamera: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#e8e827"
    },
    buttonCamera: {
      flex: 4,
      alignSelf: "center",
      alignItems: "center"
    },
    buttonCloseCamera: {
      flex: 3,
      padding: 10,
      alignSelf: "flex-end",
      alignItems: "center"
    }
  };