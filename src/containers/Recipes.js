import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts, setError } from '../actions/posts';

class RecipeListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    posts: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    fetchPosts: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchPosts();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchPosts = () => {
    const { fetchPosts, showError } = this.props;
    return fetchPosts()
      .then(() => console.log('Success'))
      .catch((err) => {
        console.log(`Error: ${err}`);
        return showError(err);
      });
  }

  render = () => {
    const { Layout, posts, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;
    console.log('✅ Container' + JSON.stringify(posts))
    return (
      <Layout
        error={posts.error}
        loading={posts.loading}
        posts={posts}
        reFetch={() => this.fetchPosts()}
      />
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts || {},
});

const mapDispatchToProps = {
  fetchPosts: getPosts,
  showError: setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListing);
