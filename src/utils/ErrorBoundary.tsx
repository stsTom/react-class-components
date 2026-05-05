import { Component, type ErrorInfo, type PropsWithChildren } from 'react';

export class ErrorBoundary extends Component<PropsWithChildren> {
  state = { hasError: false };

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, info);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h3>Oops... Something went wrong.</h3>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
