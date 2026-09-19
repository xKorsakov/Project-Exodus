// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './sections/Hero';
import Portfolio from './sections/Portfolio';
import BlogList from './sections/BlogList';
import BlogPost from './components/BlogPostTemplate';

/**
 * El Hero hace scroll-lock con ScrollTrigger, por eso vive en la ruta "/"
 * junto a Portafolio: ambos comparten un único contexto de scroll.
 * Blog usa rutas propias para que cada artículo tenga URL compartible.
 */
function Home() {
  return (
    <>
      <Hero />
      <Portfolio />
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
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
