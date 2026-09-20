// src/components/Sidebar.jsx
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const LINKS = [
  { label: 'Inicio', to: '/', hash: '#inicio' },
  { label: 'Portafolio', to: '/portafolio', hash: null },
  { label: 'Sobre mí', to: '/sobre-mi', hash: null },
  { label: 'Blog', to: '/blog', hash: null },
];

function Nav({ onNavigate }) {
  const { pathname } = useLocation();

  const go = (link) => (e) => {
    if (link.hash && pathname === '/') {
      e.preventDefault();
      document.querySelector(link.hash)?.scrollIntoView({ behavior: 'smooth' });
    }
    onNavigate?.();
  };

  return (
    <nav className="flex flex-col gap-1">
      {LINKS.map((link) => (
        <NavLink
          key={link.label}
          to={link.to}
          onClick={go(link)}
          className={({ isActive }) =>
            [
              'group relative px-4 py-3 text-sm tracking-wide transition-colors duration-300',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-navy',
              isActive && link.to === pathname ? 'text-white' : 'text-ash/60 hover:text-white',
            ].join(' ')
          }
        >
          {/* Barra de acento que crece en hover: el único movimiento del menú */}
          <span className="absolute left-0 top-1/2 h-0 w-px -translate-y-1/2 bg-navy transition-all duration-300 group-hover:h-6 group-hover:shadow-glow" />
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop: panel fijo translúcido */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col justify-between border-r border-navy-deep bg-black/40 px-6 py-10 backdrop-blur-xl lg:flex">
        <div>
          <p className="font-display text-2xl italic text-white">Aaron</p>
          <p className="mt-1 text-xs text-ash/40">Desarrollador</p>
        </div>
        <Nav />
        <p className="text-xs text-ash/30">© {new Date().getFullYear()}</p>
      </aside>

      {/* Móvil: botón + overlay a pantalla completa */}
      <button
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-6 top-6 z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-navy-deep bg-black/60 backdrop-blur lg:hidden"
      >
        <span className={`h-px w-4 bg-white transition-transform duration-300 ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
        <span className={`h-px w-4 bg-white transition-transform duration-300 ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-opacity duration-500 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col justify-center px-10 text-2xl">
          <Nav onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}