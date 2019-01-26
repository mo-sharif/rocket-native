import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Label,
  Input,
  Button
} from "native-base";
import { Actions } from "react-native-router-flux";
import Loading from "./Loading";
import Messages from "./Messages";
import Header from "./Header";
import Spacer from "./Spacer";
import PostPic from "./PostPic";

class AddPost extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    error: null
  };

  constructor(props) {
    super(props);
    this.state = {
      postTitle: "",
      postBody: "",
      postPic: "",
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

  render() {
    const { loading, error } = this.props;

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
            <Item stackedLabel style={{height: 250 }}>
              <Label>Image</Label>
              <PostPic />
            </Item>
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

            <Button block onPress={this.handleSubmit}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default AddPost;
