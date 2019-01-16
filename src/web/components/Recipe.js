import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ErrorMessages from '../../constants/errors';
import Loading from './Loading';
import Error from './Error';

const PostView = ({
  error,
  loading,
  posts,
  postId,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Get this Post from all posts
  let post = null;
  if (postId && posts) {
    post = posts.find(item => parseInt(item.id, 10) === parseInt(postId, 10));
  }

  // post not found
  if (!post) return <Error content={ErrorMessages.post404} />;

  // Build Ingredients listing
  const ingredients = post.ingredients.map(item => (
    <ListGroupItem key={`${item}`}>
      {item}
    </ListGroupItem>
  ));

  // Build Method listing
  const method = post.method.map(item => (
    <ListGroupItem key={`${item}`}>
      {item}
    </ListGroupItem>
  ));

  return (
    <div>
      <Row>
        <Col sm="12">
          <h1>
            {post.title}
          </h1>
          <p>
            by
            {' '}
            {post.author}
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg="4" className="post-view-card">
          <Card>
            <CardHeader>
              About this post
            </CardHeader>
            <CardBody>
              <CardText>
                {post.body}
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" className="post-view-card">
          <Card>
            <CardHeader>
              Ingredients
            </CardHeader>
            <ListGroup className="list-group-flush">
              {ingredients}
            </ListGroup>
          </Card>
        </Col>
        <Col lg="4" className="post-view-card">
          <Card>
            <CardHeader>
              Method
            </CardHeader>
            <ListGroup className="list-group-flush">
              {method}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col sm="12">
          <Link className="btn btn-secondary" to="/posts">
            <i className="icon-arrow-left" />
            {' '}
            Back
          </Link>
        </Col>
      </Row>
    </div>
  );
};

PostView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

PostView.defaultProps = {
  error: null,
};

export default PostView;
