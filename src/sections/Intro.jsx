// src/sections/Intro.jsx

/**
 * Vive justo debajo del Hero, en la ruta "/". Aparece cuando el scroll-lock
 * del hero se libera (al terminar la animación de la estrella).
 */
export default function Intro() {
  return (
    <section className="mx-auto max-w-2xl px-8 py-32">
      <p className="font-display text-3xl italic leading-snug text-white md:text-4xl">
        Bienvenido a mi página web, soy Aaron.
      </p>
      <p className="mt-8 text-lg leading-relaxed text-ash/80">
        Project Exodus fue creada para que puedas ver tanto lo que he hecho
        como alguna que otra opinión en el blog
        <span className="text-ash/45"> (no supe qué nombre ponerle a la sección, lol)</span>.
      </p>
    </section>
  );
}