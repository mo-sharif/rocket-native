import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPosts, setError } from "../actions/posts";

class PostListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    posts: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      posts: PropTypes.arrayOf(PropTypes.shape()).isRequired
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({})
    }),
    isLoading: PropTypes.bool.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    match: null
  };

  componentDidMount = () => {
    this.fetchPosts();
  };

  /**
   * Fetch Data from API, saving to Redux
   */
  fetchPosts = () => {
    const { fetchPosts, showError } = this.props;
    return fetchPosts()
      .then(() => console.log("Success"))
      .catch(err => {
        console.log(`Error: ${err}`);
        return showError(err);
      });
  };

  render = () => {
    const { Layout, posts, match, member, isLoading } = this.props;
    const id =
      match && match.params && match.params.id ? match.params.id : null;

    return (
      <Layout
        member={member}
        postId={id}
        error={posts.error}
        loading={isLoading}
        posts={posts.posts}
        reFetch={() => this.fetchPosts()}
      />
    );
  };
}

const mapStateToProps = state => ({
  posts: state.posts || {},
  isLoading: state.status.loading || false,
  member: state.member || {}
});

const mapDispatchToProps = {
  fetchPosts: getPosts,
  showError: setError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListing);
