import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import './styles/globals.css';

function App() {
  return (
    <div className="app bg-[--vc-bg] min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
}

export default App;