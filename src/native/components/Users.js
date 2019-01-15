import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList, TouchableOpacity, RefreshControl, Image, ListView
} from 'react-native';

import { Container, Content, Card, CardItem, Button, Body, Icon, List, ListItem, Text } from 'native-base';

import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';

this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const UserListingView = ({
  error,
  loading,
  users,
  reFetch,
}) => {

  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.users({ match: { params: { id: String(item.id) } } });
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });


  return (
    <Container>
      <Content padder>
        <Header
          title="Users"
          content="This is here to show how you can read and display data from a data source (in our case, Firebase)."
        />
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(users)}
            renderRow={data =>
              <ListItem>
                <Text> {data.firstName} </Text>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => alert(`Name: ${data.firstName} ${data.lastName}`)}>
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
          />
      </Content>
    </Container>
  );
};

UserListingView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

UserListingView.defaultProps = {
  error: null,
  reFetch: null,
};

export default UserListingView;
