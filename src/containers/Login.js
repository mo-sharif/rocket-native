import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { login } from "../actions/member";
import { facebookSignin } from "../actions/FacebookActions";

class Login extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    locale: PropTypes.string,
    member: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    facebookSignin: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    successMessage: PropTypes.string.isRequired
  };

  static defaultProps = {
    locale: null
  };

  state = {
    errorMessage: null
  };

  onFormSubmit = data => {
    const { onFormSubmit } = this.props;
    return onFormSubmit(data).catch(err => {
      this.setState({ errorMessage: err });
      throw err;
    });
  };

  facebookSignin = async (data) => {
    const { facebookSignin } = this.props;
    return await facebookSignin(data).catch(e => console.log(`Error: ${e}`));
  };
  render = () => {
    const { member, locale, Layout, isLoading, successMessage } = this.props;

    const { errorMessage } = this.state;

    return (
      <Layout
        member={member}
        locale={locale}
        loading={isLoading}
        error={errorMessage}
        success={successMessage}
        onFormSubmit={this.onFormSubmit}
        facebookSignin={this.facebookSignin}
      />
    );
  };
}

const mapStateToProps = state => ({
  member: state.member || {},
  locale: state.locale || null,
  isLoading: state.status.loading || false,
  successMessage: state.status.success || ""
});

const mapDispatchToProps = {
  onFormSubmit: login,
  facebookSignin: facebookSignin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
