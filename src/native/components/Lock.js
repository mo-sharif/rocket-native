import * as React from 'react';
import { LocalAuthentication } from 'expo';
import { login } from './Login';
// You can import from local files
import About from './About';

export default class Lock extends React.Component {
  comonentDidMount() {
    console.log('LocalAuthentication.hasHardwareAsync()', LocalAuthentication.hasHardwareAsync());
    // is the device touchId enabled
    if (LocalAuthentication.hasHardwareAsync() && LocalAuthentication.isEnrolledAsync()) {
   const userCredential = getLoginInformationInSecureStore();
     // user has asked to use auth
    LocalAuthentication.authenticateAsync();
    console.log('userCredential', userCredential);
    getAuthStatus();
    props.navigation.navigate(NAVIGATION.home);
  }
}
  render() {
    return (
 /*      <View style={styles.container}>
        <Card>
          <Text>LocalAuthentication</Text>
          <Text>hasHardwareAsync: {JSON.stringify(LocalAuthentication.hasHardwareAsync(), null, 4)}</Text>
          <Text>isEnrolledAsync: {JSON.stringify(LocalAuthentication.isEnrolledAsync(), null, 4)}</Text>
          <Text>authenticateAsync: {JSON.stringify(LocalAuthentication.authenticateAsync(), null, 4)}</Text>

        </Card>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone! Save to get a shareable url.
        </Text>
        <Card title="Local Modules">
          <About />
        </Card>
      </View> */
      <About />
    );
  }
}
