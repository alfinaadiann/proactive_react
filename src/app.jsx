// src/App.js
import React from 'react';
import Navbar from './components/navbar';
import LandingPage from './components/landingpage';
import ProPage from './components/propage';
import AboutProActive from './components/aboutproactive';
import FiturPage from './components/fiturpage';
import Footer from './components/footer';

function App() {
  return (
    <div>
    
      <Navbar />
      <LandingPage />
      <ProPage />
      <AboutProActive />
      <FiturPage />
      <Footer />
    </div>
  );
}

export default App;
