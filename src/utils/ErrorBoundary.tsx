import { Component, ReactNode } from 'react';
import { ErrorBoundaryState } from '../types';

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state = {
    hasError: false,
    error: undefined
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.error) {
      return <p>error={this.state.error}</p>;
    }

    return this.props.children;
  }
}
