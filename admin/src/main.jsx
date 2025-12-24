import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';

// For Clerk
const clerkkey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkkey}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);
