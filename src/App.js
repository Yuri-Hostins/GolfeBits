import React, { useEffect} from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import I18nProvider from "./i18n/I18nProvider";

// Rotas
import Homepage from "./pages/homepage";
import Apresentacao from "./pages/Apresentacao.jsx";

export default function App() {

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      // Bloqueia F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (key === 'i' || key === 'c' || key === 'j')) ||
        (e.ctrlKey && key === 'u')
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault(); // Bloqueia botão direito
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <I18nProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/apresentacao2" element={<Apresentacao />} />
        </Routes>
      </Router>
    </I18nProvider>
  );
}