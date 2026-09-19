// src/sections/Hero.jsx
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroCanvas from '../components/HeroCanvas';

gsap.registerPlugin(ScrollTrigger);

/**
 * SCROLL-LOCK
 * -----------
 * `pin: true` mantiene la sección clavada en el viewport mientras el usuario
 * hace scroll durante SCROLL_DISTANCE píxeles. Ese recorrido no mueve la página:
 * alimenta `progress.current` (0 → 1), que HeroCanvas lee en cada frame.
 * Cuando progress llega a 1 el pin termina y el scroll continúa hacia Portafolio.
 *
 * Se usa un ref mutable en vez de useState a propósito: actualizar estado de React
 * 60 veces por segundo re-renderizaría el árbol entero del canvas.
 */
const SCROLL_DISTANCE = 2600; // px de scroll "consumidos" por la animación

export default function Hero() {
  const root = useRef(null);
  const progress = useRef(0);
  const headline = useRef(null);
  const hint = useRef(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      progress.current = 1; // figura completa, sin scrolljacking
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: `+=${SCROLL_DISTANCE}`,
        pin: true,
        scrub: 1,          // suaviza: la geometría persigue al scroll con inercia
        anticipatePin: 1,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      // El texto cede protagonismo a la figura y vuelve al final.
      gsap.to(headline.current, {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: `+=${SCROLL_DISTANCE * 0.35}`,
          scrub: true,
        },
      });

      gsap.to(hint.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: `+=${SCROLL_DISTANCE * 0.2}`,
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="inicio" ref={root} className="relative h-screen w-full overflow-hidden">
      <HeroCanvas progress={progress} />

      {/* Viñeta: apaga los bordes para que el negro del canvas funda con la página */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#000_85%)]" />

      <div ref={headline} className="pointer-events-none absolute inset-x-0 top-[18vh] px-8 text-center">
        <h1 className="font-display text-5xl italic leading-tight text-white md:text-7xl">
          Lo que se construye,
          <br />
          observa.
        </h1>
      </div>

      <p ref={hint} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-ash/40">
        Desliza para construir
      </p>
    </section>
  );
}
