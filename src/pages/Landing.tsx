import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import SocialProof from '../components/SocialProof';
import Footer from '../components/Footer';

function Landing() {
  const navigate = useNavigate();

  const handleLaunchApp = () => {
    navigate('/dashboard');
  };

  return (
    <div className="app bg-[--vc-bg] min-h-screen">
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