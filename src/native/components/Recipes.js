import React from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image
} from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Button,
  ListItem,
  Left,
  Icon
} from "native-base";
import { Actions } from "react-native-router-flux";
import Loading from "./Loading";
import Error from "./Error";
import Header from "./Header";
import Spacer from "./Spacer";

const RecipeListing = ({ error, loading, posts, reFetch }) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;
  const onPress = item =>
    Actions.posts({ match: { params: { id: String(item.id) } } });

  return (
    <Container>
      <Content padder>
        <Header
          title="Top Posts"
          content="Showing all posts in our database"
        />
        <ListItem onPress={Actions.newPost} icon>
          <Left>
            <Icon name="add-circle" />
          </Left>
          <Body>
            <Text>New Post</Text>
          </Body>
        </ListItem>
        <FlatList
          numColumns={1}
          data={posts}
          renderItem={({ item }) => (
            <Card
              transparent
              style={{
                paddingHorizontal: 0,
                borderRadius: 5,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 4,
                shadowOpacity: 0.2
              }}
            >
              <CardItem cardBody>
                <TouchableOpacity
                  onPress={() => onPress(item)}
                  style={{ flex: 1 }}
                >
{/*                   <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 200,
                      width: null,
                      flex: 1,
                      borderRadius: 5
                    }}
                  /> */}
                </TouchableOpacity>
              </CardItem>
              <CardItem cardBody>
                <Body>
                  <Spacer size={20} />
                  <Text style={{ padding: 10, fontWeight: "400" }}>
                    {item.postTitle}
                  </Text>
                  <Spacer size={20} />
                  <Button
                    block
                    bordered
                    small
                    style={{ margin: 10 }}
                    onPress={() => onPress(item)}
                  >
                    <Text>View Post</Text>
                  </Button>
                  <Spacer size={5} />
                </Body>
              </CardItem>
            </Card>
          )}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={reFetch} />
          }
        />

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

RecipeListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func
};
RecipeListing.defaultProps = {
  error: null,
  reFetch: null
};

export default RecipeListing;
