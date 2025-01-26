import React, { Component, ErrorInfo, ReactNode } from 'react';

    interface Props {
      children: ReactNode;
    }

    interface State {
      hasError: boolean;
      error: Error | null;
      errorInfo: ErrorInfo | null;
    }

    class ErrorBoundary extends Component<Props, State> {
      constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
      }

      static getDerivedStateFromError(error: Error) {
        return { hasError: true, error, errorInfo: null };
      }

      componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        this.setState({ errorInfo });
      }

      render() {
        if (this.state.hasError) {
          return (
            <div style={{ padding: '20px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
              <h2>Something went wrong.</h2>
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                {this.state.error?.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </div>
          );
        }
        return this.props.children;
      }
    }

    export default ErrorBoundary;
