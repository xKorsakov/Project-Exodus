// src/data/posts.js

/* ══════════════════════════════════════════════════════════════
   PLANTILLA — copia este bloque, pégalo al principio del array
   `posts` de abajo y rellénalo. No hay que tocar ningún componente.

{
  slug: 'url-del-articulo',            // único, sin espacios ni tildes
  title: 'Título del artículo',
  date: '2026-09-19',                  // ISO, se formatea solo
  readingTime: 6,                      // minutos
  tags: ['Derecho procesal'],
  excerpt: 'Una o dos frases que aparecen en la tarjeta del índice.',
  cover: '/covers/mi-imagen.jpg',      // o null si no hay cabecera
  coverAlt: 'Descripción de la imagen',
  body: [
    { type: 'p', text: 'Párrafo normal.' },
    { type: 'h2', text: 'Un subtítulo' },
    { type: 'quote', text: 'Una cita destacada.', cite: 'Fuente, año' },
    { type: 'list', items: ['Primer punto', 'Segundo punto'] },
    { type: 'image', src: '/covers/otra.jpg', alt: 'Alt', caption: 'Pie de foto' },
  ],
},

   Tipos de bloque admitidos: p · h2 · quote · list · image
   Para añadir uno nuevo, amplía el switch de BlogPostTemplate.jsx.
   ══════════════════════════════════════════════════════════════ */

export const posts = [
  {
    slug: 'precedente-y-jurisprudencia',
    title: 'Precedente y jurisprudencia: dos formas de recordar',
    date: '2026-09-12',
    readingTime: 7,
    tags: ['Derecho comparado'],
    excerpt:
      'El common law obliga hacia atrás y el derecho continental orienta hacia adelante. La diferencia no es de técnica, sino de a quién se le confía la memoria del sistema.',
    cover: null,
    coverAlt: '',
    body: [
      {
        type: 'p',
        text: 'Cuando un tribunal inglés resuelve, no sólo cierra un conflicto: deja una regla en el camino. Cuando lo hace uno español, en cambio, aplica una regla que ya estaba puesta.',
      },
      { type: 'h2', text: 'La fuerza vinculante' },
      {
        type: 'p',
        text: 'Stare decisis no es una costumbre amable entre jueces. Es una obligación estructural que distribuye poder normativo fuera del legislador.',
      },
      {
        type: 'quote',
        text: 'La doctrina jurisprudencial complementa el ordenamiento jurídico; no lo sustituye.',
        cite: 'Código Civil español, art. 1.6',
      },
      {
        type: 'list',
        items: [
          'El precedente ata al tribunal inferior de forma directa.',
          'La jurisprudencia exige reiteración antes de pesar.',
          'Ambos sistemas terminan buscando lo mismo: previsibilidad.',
        ],
      },
    ],
  },
  {
    slug: 'escribir-normas-para-que-se-cumplan',
    title: 'Escribir normas para que se cumplan',
    date: '2026-08-28',
    readingTime: 5,
    tags: ['Redacción normativa'],
    excerpt:
      'Una norma que nadie entiende no se incumple: se ignora. Notas sobre estructura, supuesto de hecho y consecuencia jurídica.',
    cover: null,
    coverAlt: '',
    body: [
      {
        type: 'p',
        text: 'Toda norma útil se deja partir en dos: qué tiene que pasar, y qué ocurre entonces. Si un artículo no admite ese corte, casi siempre sobra o está incompleto.',
      },
      { type: 'h2', text: 'El problema de las definiciones' },
      {
        type: 'p',
        text: 'Definir dentro del articulado es tentador y caro. Cada definición enterrada en un inciso es una remisión que el lector tendrá que reconstruir de memoria.',
      },
    ],
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
