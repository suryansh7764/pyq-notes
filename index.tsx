import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Simple Error Boundary to catch crashes
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: '40px', color: '#b91c1c', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto'}}>
          <h1 style={{fontSize: '24px', marginBottom: '10px'}}>Something went wrong</h1>
          <p style={{marginBottom: '20px'}}>The application crashed. Here is the error:</p>
          <pre style={{backgroundColor: '#fef2f2', padding: '15px', borderRadius: '4px', overflow: 'auto', border: '1px solid #fca5a5'}}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{marginTop: '20px', padding: '10px 20px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);