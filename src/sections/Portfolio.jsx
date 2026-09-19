// src/sections/Portfolio.jsx

/**
 * ESQUELETO — v0
 * Esta sección se estructura a fondo en una versión posterior. Ahora mismo sólo
 * reserva el espacio y fija el ritmo visual: grid de 2 columnas en tablet y 3 en
 * desktop, tarjetas 4:3, borde navy fino, sin sombras.
 *
 * Al cablear datos reales: sustituir SLOTS por el array de proyectos y mover la
 * tarjeta a components/ProjectCard.jsx con props { title, year, stack, cover, href }.
 */
const SLOTS = Array.from({ length: 6 }, (_, i) => i);

export default function Portfolio() {
  return (
    <section id="portafolio" className="mx-auto max-w-5xl px-8 py-32">
      <header className="mb-16 max-w-xl">
        <h2 className="font-display text-4xl italic text-white">Portafolio</h2>
        <p className="mt-4 text-sm leading-relaxed text-ash/60">
          Proyectos de derecho aplicado, herramientas web y sistemas normativos.
          En preparación.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SLOTS.map((i) => (
          <article
            key={i}
            className="aspect-[4/3] border border-navy-deep bg-gradient-to-br from-navy-deep/25 to-transparent transition-colors duration-500 hover:border-navy"
          >
            {/* Placeholder: se reemplaza por <img> de portada + título */}
            <div className="flex h-full items-end p-5">
              <span className="text-xs text-ash/25">Espacio reservado</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
