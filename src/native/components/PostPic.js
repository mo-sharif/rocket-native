import React, { Component } from "react";
import { connect } from "react-redux";
import { Firebase, FirebaseRef } from "../../lib/firebase";
import uuid from "uuid";
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet
} from "react-native";
import {
  View,
  Text,
  Button,
  Card,
  CardItem,
  Left,
  Body,
  Thumbnail,
  Right,
  Icon
} from "native-base";
import { ImagePicker, Permissions } from "expo";

import { uploadImage } from "../../actions/PostPic";
import PropTypes from "prop-types";

class PostPic extends Component {
/*   static propTypes = {
    locale: PropTypes.string,
    postPic: PropTypes.string,
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,

  }; */

  state = {
    image: null,
    uploading: false
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    const { image } = this.state;

    return (
      <Card>
        {image ? null : (
          <CardItem>
            <Button transparent onPress={this._pickImage}>
              <Icon active name="image" />
              <Text>Pick an image</Text>
            </Button>
            <Button transparent onPress={this._takePhoto}>
              <Icon active name="camera" />
              <Text>Take a photo</Text>
            </Button>

            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        )}
        <CardItem cardBody>
          {this._maybeRenderImage()}
          {this._maybeRenderUploadingOverlay()}
          <Body>
            <StatusBar barStyle="default" />
          </Body>
          {/*           <Image
            source={{ uri: "Image URL" }}
            style={{ height: 200, width: null, flex: 1 }}
          /> */}
        </CardItem>
      </Card>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              height: 250,
              justifyContent: "center"
            }
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    const { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          width: 250,
          borderRadius: 3,
          elevation: 2
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden"
          }}
        >
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        >
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert("Copied image URL to clipboard");
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {

        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };
}
 async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const ref = Firebase.storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);
    const getDownloadURL = await snapshot.ref.getDownloadURL()

    // We're done with the blob, close and release it
    blob.close();
    return await getDownloadURL;
  }


export default PostPic
