import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addPost } from "../actions/posts";
import {
  uploadImage,
  setUploading,
  resetImage,
  image
} from "../actions/PostPic";

class AddPost extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    posts: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  state = {
    errorMessage: null
  };

  componentDidMount = () => {
    resetImage();
  };
  onFormSubmit = data => {
    const { onFormSubmit } = this.props;
    return onFormSubmit(data).catch(err => {
      this.setState({ errorMessage: err });
      throw err;
    });
  };

  render = () => {
    const { posts, Layout, isLoading, image } = this.props;

    const { errorMessage } = this.state;

    return (
      <Layout
        posts={posts}
        image={image}
        loading={isLoading}
        error={errorMessage}
        onFormSubmit={this.onFormSubmit}
      />
    );
  };
}

const mapStateToProps = state => ({
  posts: state.posts || {},
  isLoading: state.status.loading || false,
  image: state.image.image || null
});

const mapDispatchToProps = {
  onFormSubmit: addPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost);
