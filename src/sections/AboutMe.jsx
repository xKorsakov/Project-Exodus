// src/sections/AboutMe.jsx

const COURSES = [
  { name: 'Desarrollador de Juegos con Roblox (Lua)', level: 'Poca o nula — sin práctica desde que acabó el curso' },
  { name: 'Diseño de mundos fantásticos (dibujo)', level: 'Poca — oxidado, tanto en digital como en papel' },
  { name: 'Python nivel 1', level: 'Media — lo uso seguido pero necesito repracticar escritura' },
  { name: 'Inicio de desarrollo web', level: 'Media — bases sólidas, algunas cosas por reforzar' },
  { name: 'Programación con Minecraft', level: 'Profesional — 4 años continuos por favor ya saquenme de aqui necesito un descanso' },
];

const HOBBIES = [
  {
    title: 'Política',
    text: 'Cómo los líderes mundiales manejan el mundo. Leo noticias políticas y me gusta debatir sobre ellas.',
  },
  {
    title: 'Aeronáutica militar',
    text: 'Aviones militares y cómo están hechos por dentro. Mi caza favorito es el F-22 Raptor ("Zombie" / "Symbiote"), incluida en su etapa como YF-22 y el Matte Black, un acabado experimental descartado pensado para absorber ondas electromagnéticas de alta frecuencia.',
  },
  {
    title: 'Derecho',
    text: 'Un dia lleve la Constitucion Española a clase, jurao jurao.',
  },
  {
    title: 'Guerra',
    text: 'Tácticas militares, filtraciones y cómo se ejecutan las operaciones, tipo, me encanta ver como caen las bombas, no significa que sea un psicópata, es solo que me gusta ver como se destruye la infraestructura enemiga y como se ejecutan las operaciones.',
  },
];

export default function AboutMe() {
  return (
    <section className="mx-auto max-w-2xl px-8 pb-40 pt-28">
      <h1 className="font-display text-4xl italic text-white md:text-5xl">Sobre mí</h1>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-ash/85">
        <p>
          Soy Aaron, tengo 13 años y llevo 5 añosprogramando. Empecé a los ocho, con unas clases
          de programación por medio de Minecraft — lo que en su momento parecía una tontería
          terminó llevándome a aprender a programar en serio.
        </p>
        <p>
          Mi madre hizo la carrera de programación y pensó que a mí también me gustaría. Una
          noche de tantas, decidió apuntarme a un curso. Ese curso fue lo que me introdujo a todo
          esto.
        </p>
      </div>

      <h2 className="mt-20 font-display text-2xl italic text-white">Cursos</h2>
      <ul className="mt-8 divide-y divide-navy-deep border-t border-navy-deep">
        {COURSES.map((course) => (
          <li key={course.name} className="py-5">
            <p className="text-white/90">{course.name}</p>
            <p className="mt-1 text-sm text-ash/50">{course.level}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-20 font-display text-2xl italic text-white">Hobbies</h2>
      <div className="mt-8 space-y-8">
        {HOBBIES.map((hobby) => (
          <div key={hobby.title} className="border-l border-navy pl-6">
            <p className="text-white/90">{hobby.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ash/60">{hobby.text}</p>
          </div>
        ))}
        <p className="text-xs text-ash/35">Y alguna más que ahora mismo no recuerdo.</p>
      </div>

      <h2 className="mt-20 font-display text-2xl italic text-white">Sueño</h2>
      <p className="mt-8 text-lg leading-relaxed text-ash/85">
        Convertirme en Red Teamer, Pentester, o desarrollador de IA. Principalmente porque me
        apasiona la ciberseguridad — y, siendo sincero, también porque pagan una pasta cabron, si me pagaran lo mismo en todos lso trabajos tiraria de jugador profesional de videojuegos sabes, pero vamos, no soy retrasado
      </p>
    </section>
  );
}