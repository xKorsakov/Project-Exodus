// src/sections/Portfolio.jsx
import { projects } from '../data/projects';

/**
 * Cada tarjeta viene de src/data/projects.js — para añadir un proyecto,
 * copia la plantilla comentada en ese archivo y pégala al array.
 * Si sobra espacio en el grid (menos de 6 proyectos), se completa con
 * huecos vacíos para no romper el ritmo visual.
 */
const MIN_SLOTS = 6;

function Card({ project }) {
  const content = (
    <>
      <div className="aspect-[4/3] overflow-hidden border-b border-navy-deep bg-navy-deep/10">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl italic text-white">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ash/60">{project.description}</p>
      </div>
    </>
  );

  const cls =
    'group block border border-navy-deep bg-black/40 transition-colors duration-500 hover:border-navy';

  return project.href ? (
    <a href={project.href} target="_blank" rel="noreferrer" className={cls}>
      {content}
    </a>
  ) : (
    <article className={cls}>{content}</article>
  );
}

export default function Portfolio() {
  const emptySlots = Math.max(0, MIN_SLOTS - projects.length);

  return (
    <section className="mx-auto max-w-5xl px-8 py-32">
      <header className="mb-16 max-w-xl">
        <h2 className="font-display text-4xl italic text-white">Portafolio</h2>
        <p className="mt-4 text-sm leading-relaxed text-ash/60">
          Proyectos de desarrollo web y herramientas que he construido.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title} project={project} />
        ))}

        {/* Huecos reservados para mantener el grid parejo mientras se suman proyectos */}
        {Array.from({ length: emptySlots }, (_, i) => (
          <div key={`empty-${i}`} className="aspect-[4/3] border border-navy-deep/50" />
        ))}
      </div>
    </section>
  );
}