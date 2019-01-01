import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = () => (
  <footer className="mt-5">
    <Row>
      <Col sm="12" className="text-right pt-3">
        <p>
          Learn More on the
          {' '}
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Mosh-Media/react-native-firebase-starter">
            Github Repo
          </a>
          {' '}
          &nbsp; | &nbsp; Boilerplate by
          {' '}
          <a target="_blank" rel="noopener noreferrer" href="https://mcnam.ee">
            Matt Mcnamee
          </a>
          {' '}
          &nbsp; | &nbsp; Developed by
          {' '}
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Mosh-Media">
            Mo Sharif
          </a>
          .
        </p>
      </Col>
    </Row>
  </footer>
);

export default Footer;
