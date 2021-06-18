import React from 'react';

import { ToastProvider } from 'react-toast-notifications';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

export default function App() {
  return (
    <ToastProvider>
      <Header />
      <Main />
      <Footer />
    </ToastProvider>
  );
}
