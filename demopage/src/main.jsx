import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TopBar from './TopBar'; // Ensure TopBar is imported correctly
import App from './App';       // Ensure App is imported correctly
import Footer from './Footer';

// Render TopBar in the #bar div
const barElement = document.getElementById('bar');
const barRoot = createRoot(barElement);
barRoot.render(
  <StrictMode>
    <TopBar />
  </StrictMode>
);

// Render App in the #root div
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

const footelement = document.getElementById('foot');
const foot = createRoot(footelement);
foot.render(
  <StrictMode>
    <Footer />
  </StrictMode>
)