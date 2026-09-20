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
 ];

export const getPost = (slug) => posts.find((p) => p.slug === slug);

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
