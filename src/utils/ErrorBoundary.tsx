import { Component, ReactNode } from 'react';
import { ErrorBoundaryState } from '../types';

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: undefined
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.error) {
      return (
        <section>
          <p>Error occurred!</p>
          <p>
            {'message' in this.state.error
              ? this.state.error.message
              : 'Unknown error'}
          </p>
        </section>
      );
    }

    return this.props.children;
  }
}
