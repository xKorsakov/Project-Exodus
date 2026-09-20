// src/data/projects.js

/* ══════════════════════════════════════════════════════════════
   PLANTILLA — copia este bloque, pégalo al principio del array
   `projects` de abajo y rellénalo.

{
  title: 'Nombre del proyecto',
  description: 'Una o dos frases sobre qué hace y con qué se hizo.',
  image: '/portfolio/mi-proyecto.jpg',   // ver nota de imágenes abajo
  href: null,                            // o una URL si quieres que la tarjeta enlace afuera
},

   NOTA SOBRE IMÁGENES:
   Pon el archivo de imagen dentro de la carpeta public/portfolio/ de tu
   proyecto (créala si no existe). Si el archivo se llama por ejemplo
   "creador-horarios.png", la ruta que va en `image` es exactamente
   "/portfolio/creador-horarios.png" — con la barra al inicio, sin "public".
   ══════════════════════════════════════════════════════════════ */

export const projects = [
  {
    title: 'Creador de Horarios Escolares Dinámico',
    description:
      'Aplicación web para armar horarios de clase de forma visual, con guardado local en el navegador.',
    image: '/portfolio/horarios.jpg',
    href: null,
  },
  {
    title: 'Project Exodus',
    description: 'Esta misma web: portafolio y blog personal, construida con React, Three.js y GSAP.',
    image: '/portfolio/exodus.jpg',
    href: null,
  },
  {
    title: 'Chat Clase 1º ESO (Outdated)',
    description: 'La hice para comunicarme con mis compañeros en medio de la clase y hacer el tonto, al final la utilizamos poco :P',
    image: '/portfolio/chat-eso.jpg',
    href: null,
  },
];