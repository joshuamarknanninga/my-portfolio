// frontend/src/components/ErrorBoundary/ErrorBoundary.js

import React from 'react';
import { Message, Container } from 'semantic-ui-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container textAlign="center" style={{ marginTop: '2em' }}>
          <Message negative>
            <Message.Header>Something Went Wrong</Message.Header>
            <p>{this.state.error && this.state.error.toString()}</p>
          </Message>
        </Container>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
