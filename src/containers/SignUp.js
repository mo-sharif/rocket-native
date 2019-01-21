import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { facebookSignin } from "../actions/FacebookActions";
import { signUp } from '../actions/member';

class SignUp extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    facebookSignin: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  state = {
    errorMessage: null,
  }

  onFormSubmit = (data) => {
    const { onFormSubmit } = this.props;
    return onFormSubmit(data)
      .catch((err) => { this.setState({ errorMessage: err }); throw err; });
  }

  facebookSignin = async (data) => {
    const { facebookSignin } = this.props;
    return await facebookSignin(data).catch(e => console.log(`Error: ${e}`));
  }

  render = () => {
    const {
      member,
      Layout,
      isLoading,
    } = this.props;

    const { errorMessage } = this.state;

    return (
      <Layout
        member={member}
        loading={isLoading}
        error={errorMessage}
        onFormSubmit={this.onFormSubmit}
        facebookSignin={this.facebookSignin}
      />
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
});

const mapDispatchToProps = {
  onFormSubmit: signUp,
  facebookSignin: facebookSignin
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
