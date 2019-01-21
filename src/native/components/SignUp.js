import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Label,
  Input,
  Button,
  Icon
} from "native-base";
import { Actions } from "react-native-router-flux";
import Loading from "./Loading";
import Messages from "./Messages";
import Header from "./Header";
import Spacer from "./Spacer";
import { translate } from "../../i18n";

class SignUp extends React.Component {
  static propTypes = {
    locale: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    facebookSignin: PropTypes.func.isRequired
  };

  static defaultProps = {
    error: null,
    locale: null
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.facebookSignin = this.facebookSignin.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    });
  };

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => Actions.login())
      .catch(e => console.log(`Error: ${e}`));
  };

  facebookSignin = async () => {
    const { facebookSignin } = this.props;
    facebookSignin(this.state)
      .then(() => {
        Actions.home();
      })
      .catch(e => console.log(`Error!! ${e}`));
  };

  render() {
    const { loading, error, locale } = this.props;

    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Welcome"
            content="We're glad to welcome you to the community. There's only a few questions and you'll be on your way."
          />

          {error && <Messages message={error} />}

          <Form>
            <Item stackedLabel>
              <Label>First Name</Label>
              <Input
                autoFocus={true}
                onChangeText={v => this.handleChange("firstName", v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Last Name</Label>
              <Input onChangeText={v => this.handleChange("lastName", v)} />
            </Item>

            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange("email", v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                onChangeText={v => this.handleChange("password", v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Confirm Password</Label>
              <Input
                secureTextEntry
                onChangeText={v => this.handleChange("password2", v)}
              />
            </Item>

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text>Sign Up</Text>
            </Button>
            <Spacer size={20} />

            <Button
              style={{ backgroundColor: "#4267b2" }}
              block
              onPress={this.facebookSignin}
            >
              <Icon active name="logo-facebook" />

              <Text>{translate("LoginwithFacebook", locale)}</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
