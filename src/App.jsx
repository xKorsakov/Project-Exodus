// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Portfolio from './sections/Portfolio';
import BlogList from './sections/BlogList';
import BlogPost from './components/BlogPostTemplate';

/**
 * Inicio sólo contiene el Hero (con su scroll-lock) y la introducción que
 * aparece al liberarse el scroll. Portafolio ahora vive en su propia ruta
 * para no alargar el recorrido de esta página.
 */
function Home() {
  return (
    <>
      <Hero />
      <Intro />
    </>
  );
}

// Reinicia el scroll al cambiar de ruta (ScrollTrigger no lo hace por sí solo).
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollReset />
      <div className="min-h-screen bg-void">
        <Sidebar />
        {/* El desplazamiento izquierdo sólo aplica en desktop: en móvil el
            sidebar se convierte en overlay y el contenido ocupa todo el ancho. */}
        <main className="lg:pl-64">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portafolio" element={<Portfolio />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}