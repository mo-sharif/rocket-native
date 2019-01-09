import React from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Camera, Permissions, ImageManipulator } from 'expo'
import DefaultProps from '../../native/constants/navigation';
import { Constants, Haptic } from 'expo';
import api from '../../constants/api'

const { clarifai_key, google_key, cx } = api
const apiURL = 'https://www.googleapis.com/customsearch/v1?'
const Clarifai = require('clarifai')

const clarifai = new Clarifai.App({
  apiKey: clarifai_key,
})
process.nextTick = setImmediate;

export default class CameraBrain extends React.Component {
  state = {
    hasCameraPermission: null,
    predictions: [],
  };
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  capturePhoto = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      return photo.uri;
    }
  };
  resize = async photo => {
    let manipulatedImage = await ImageManipulator.manipulateAsync(
      photo,
      [{ resize: { height: 300, width: 300 } }],
      { base64: true }
    );
    return manipulatedImage.base64;
  };
  predict = async image => {
    let predictions = await clarifai.models.predict(
      Clarifai.GENERAL_MODEL,
      image
    );
    console.log(predictions)
    return predictions;
  };

  searchGoogle = (searchParam) => {
    let URL =  apiURL + '?key=' + google_key + '&cx=' + cx + '&q=' + searchParam;
    console.log(URL);
    fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response)
      error.message
    }).catch((error) => console.log(error));
  }
  
  objectDetection = async () => {
    let photo = await this.capturePhoto();
    let resized = await this.resize(photo);
    let predictions = await this.predict(resized);
    //let googleResults = await this.searchGoogle('React Native')
    this.setState({ predictions: predictions.outputs[0].data.concepts });
    await Haptic.impact(Haptic.ImpactFeedbackStyle.Hard)
  };

  render() {
    const { hasCameraPermission, predictions } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <FlatList
                  data={predictions.map(prediction => ({
                    key: `${prediction.name} ${prediction.value}`,
                  }))}
                  renderItem={({ item }) => (
                    <Text style={{ paddingLeft: 15, color: 'white', fontSize: 20 }}>{item.key}</Text>
                  )}
                />
              </View>
              <TouchableOpacity
                style={{
                  flex: 0.2,
                  alignItems: 'center',
                  height: '100%',
                }}
                onPress={this.objectDetection}
              >
                <Text {...DefaultProps.cameraIcon}>
                  {' '}
                  Detect Objects{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}