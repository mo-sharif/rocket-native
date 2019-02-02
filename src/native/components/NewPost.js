import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Form,
  Left,
  Item,
  Label,
  Input,
  List,
  ListItem,
  View,
  Text,
  Button,
  Body,
  Right,
  Icon
} from "native-base";

import { Actions } from "react-native-router-flux";
import Loading from "./Loading";
import Messages from "./Messages";
import Header from "./Header";
import Spacer from "./Spacer";
import { connect } from "react-redux";
import { Firebase, FirebaseRef } from "../../lib/firebase";
import uuid from "uuid";

import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet
} from "react-native";

import { ImagePicker, Permissions } from "expo";

class AddPost extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    error: null,
    image: null,
    uploading: false
  };

  constructor(props) {
    super(props);
    this.state = {
      postTitle: "",
      postBody: "",
      image: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    });
  };

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => {
        Actions.posts();
      })
      .catch(e => console.log(`Error: ${e}`));
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    const { loading, error } = this.props;
    const { image } = this.state;
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="New Post"
            content="Submit a new post by filling the following form"
          />

          {error && <Messages message={error} />}

          <Form>
            {image ? null : (
              <View>
                <ListItem onPress={this._pickImage} stackedLabel>
                  <Left>
                    <Text>Pick an image</Text>
                  </Left>
                  <Right>
                    <Icon name="image" />
                  </Right>
                </ListItem>
                <ListItem onPress={this._takePhoto} stackedLabel>
                  <Left>
                    <Text>Take a photo</Text>
                  </Left>
                  <Right>
                    <Icon name="camera" />
                  </Right>
                </ListItem>
              </View>
            )}
            <View>
              {this._maybeRenderImage()}
              {this._maybeRenderUploadingOverlay()}
              <Body>
                <StatusBar barStyle="default" />
              </Body>
              {/*           <Image
            source={{ uri: "Image URL" }}
            style={{ height: 200, width: null, flex: 1 }}
          /> */}
            </View>
            <Item stackedLabel>
              <Label>Title</Label>
              <Input
                autoFocus={true}
                onChangeText={v => this.handleChange("postTitle", v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Body</Label>
              <Input onChangeText={v => this.handleChange("postBody", v)} />
            </Item>

            <Spacer size={20} />
            {this.state.uploading ? (
              <Button block>
                <Text>Loading ...</Text>
              </Button>
            ) : (
              <Button block onPress={this.handleSubmit}>
                <Text>Submit</Text>
              </Button>
            )}
          </Form>
        </Content>
      </Container>
    );
  }
  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              height: 2,
              justifyContent: "center"
            }
          ]}
        >
          <ActivityIndicator color="#007aff" animating size="large" />
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
          width: "auto",
          borderRadius: 3,
          elevation: 2
        }}
      >
        <Spacer size={20} />
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
          <Image source={{ uri: image }} style={{ height: 350 }} />
        </View>
        <Spacer size={20} />
      </View>
    );
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
    //const { uploadImage } = this.props;

    try {
      this.handleChange("uploading", true);
      if (!pickerResult.cancelled) {
        uploadUrl = await this._uploadImageAsync(pickerResult.uri);
        // await uploadImage(uploadUrl);
        this.handleChange("image", uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.handleChange("uploading", false);
    }
  };

  _uploadImageAsync = async uri => {
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

    const ref = FirebaseRef
      .child(uuid.v4());
    const snapshot = await ref.put(blob);
    const getDownloadURL = await snapshot.ref.getDownloadURL();

    // We're done with the blob, close and release it
    blob.close();
    return await getDownloadURL;
  };
}

export default AddPost;
