import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { LibraryPage } from './pages/LibraryPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ContactPage } from './pages/ContactPage';
import { PsychologistDashboard } from './pages/PsychologistDashboard';
import { PatientPortal } from './pages/PatientPortal';
import { PinUnlockModal } from './components/PinUnlockModal';
import { BookingModal } from './components/BookingModal';
import { InterventionPlayerModal } from './components/InterventionPlayerModal';
import { ArticleModal } from './components/ArticleModal';

// Auto-scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] text-[#121212] selection:bg-neutral-900 selection:text-white">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/interventions" element={<LibraryPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/psychologist-dashboard" element={<PsychologistDashboard />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Clinical Interactive Modals */}
      <PinUnlockModal />
      <BookingModal />
      <InterventionPlayerModal />
      <ArticleModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
