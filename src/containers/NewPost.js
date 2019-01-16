import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPost } from '../actions/posts';

class AddPost extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    posts: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
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

  render = () => {
    const {
      posts,
      Layout,
      isLoading,
    } = this.props;

    const { errorMessage } = this.state;

    return (
      <Layout
        posts={posts}
        loading={isLoading}
        error={errorMessage}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts || {},
  isLoading: state.status.loading || false,
});

const mapDispatchToProps = {
  onFormSubmit: addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
