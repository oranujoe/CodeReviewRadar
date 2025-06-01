import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import SocialProof from '../components/SocialProof';
import Footer from '../components/Footer';

export default function Landing() {
  const handleLaunchApp = () => {
    window.open('/dashboard', '_blank');
  };

  return (
    <div className="app bg-vc-bg min-h-screen">
      <Header onLaunchApp={handleLaunchApp} />
      <main>
        <Hero onLaunchApp={handleLaunchApp} />
        <Features />
        <SocialProof />
      </main>
      <Footer onLaunchApp={handleLaunchApp} />
    </div>
  );
}