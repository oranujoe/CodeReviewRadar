import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import SocialProof from '../components/SocialProof';
import Footer from '../components/Footer';
import AuthModal from '../components/auth/AuthModal';

export default function Landing() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLaunchApp = () => {
    if (user) {
      window.open('/dashboard', '_blank');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Small delay to ensure auth state is updated
    setTimeout(() => {
      window.open('/dashboard', '_blank');
    }, 100);
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
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}