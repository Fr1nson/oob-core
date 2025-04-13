import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Hero />
      {/* Здесь может быть основной контент */}
      <Footer />
    </>
  );
}

export default App;
