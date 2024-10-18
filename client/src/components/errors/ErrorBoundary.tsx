import React from "react";

interface Props {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>...</div>;
    }
    return this.props.children;
  }
}
