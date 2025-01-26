import { createRoot } from 'react-dom/client';
    import App from './App.tsx';
    import './index.css';
    import ErrorBoundary from './ErrorBoundary';

    const root = createRoot(document.getElementById('root')!);
    root.render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
