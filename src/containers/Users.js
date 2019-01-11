import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUsers, setError } from '../actions/users';

class UsersListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    users: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    fetchUsers: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchUsers();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchUsers = () => {
    const { fetchUsers, showError } = this.props;
    return fetchUsers()
      .then(() => console.log('Success'))
      .catch((err) => {
        console.log(`Error: ${err}`);
        return showError(err);
      });
  }

  render = () => {
    const { Layout, users, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;
    return (
      <Layout
        error={users.error}
        loading={users.loading}
        users={users.users}
        reFetch={() => this.fetchUsers()}
      />
    );
  }
}

const mapStateToProps = state => ({
  users: state.users || {},
});

const mapDispatchToProps = {
  fetchUsers: getUsers,
  showError: setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersListing);
