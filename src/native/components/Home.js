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
  Container,
  Thumbnail
} from "native-base";
import PropTypes from "prop-types";

import Spacer from "./Spacer";
import { Actions } from "react-native-router-flux";
import Header from "./Header";

import { Image, View } from "react-native";
const img_url =
  "https://raw.githubusercontent.com/Mosh-Media/rocket-native/master/src/images/app-rocket.png";

const Home = ({ member }) => (
  <Container>
    <Content>
      <List>
        <View>
          <Content padder>
            {/* <Header
              title="WElcom"
              content="Mixing React native paired with Firebase backend is awesome"
            /> */}
          </Content>
          {(member && member.avatar) || (member && member.email) ? (
            <View>
              <Thumbnail
                large
                style={{
                  flex: 2,
                  alignSelf: "center"
                }}
                source={{ uri: member.avatar || img_url }}
              />
              <ListItem selected>
                <Left>
                  <Text>{`Welcome back ${member.firstName}!`}</Text>
                </Left>
                <Right>
                  <Icon name="checkmark" />
                </Right>
              </ListItem>
              <ListItem onPress={Actions.newPost}>
                <Left>
                  <Text>New Post</Text>
                </Left>
                <Right>
                  <Icon name="add" />
                </Right>
              </ListItem>
            </View>
          ) : (
            <View>
              <Image
                source={{ uri: member.avatar || img_url }}
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
          )}
        </View>
      </List>
    </Content>
  </Container>
);

Home.propTypes = {
  member: PropTypes.shape({})
};

Home.defaultProps = {
  member: {}
};

export default Home;
