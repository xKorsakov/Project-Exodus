// src/components/BlogPostTemplate.jsx
import { Link, useParams } from 'react-router-dom';
import { getPost, formatDate } from '../data/posts';

/**
 * Renderiza un bloque del array `body`. Para soportar un tipo nuevo
 * (tabla, código, vídeo...) basta con añadir un case aquí.
 */
function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="mt-14 font-display text-2xl italic text-white">{block.text}</h2>;

    case 'quote':
      return (
        <figure className="my-12 border-l border-navy pl-6">
          <blockquote className="font-display text-xl italic leading-relaxed text-white/90">
            {block.text}
          </blockquote>
          {block.cite && <figcaption className="mt-3 text-xs text-ash/40">{block.cite}</figcaption>}
        </figure>
      );

    case 'list':
      return (
        <ul className="my-8 space-y-3 pl-5">
          {block.items.map((item, i) => (
            <li key={i} className="relative list-none before:absolute before:-left-5 before:top-3 before:h-px before:w-3 before:bg-navy">
              {item}
            </li>
          ))}
        </ul>
      );

    case 'image':
      return (
        <figure className="my-12">
          <img src={block.src} alt={block.alt} className="w-full border border-navy-deep" loading="lazy" />
          {block.caption && <figcaption className="mt-3 text-xs text-ash/40">{block.caption}</figcaption>}
        </figure>
      );

    case 'p':
    default:
      return <p className="mt-6 leading-[1.85] text-ash/85">{block.text}</p>;
  }
}

export default function BlogPostTemplate() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-8 py-40">
        <h1 className="font-display text-3xl italic text-white">Ese artículo no existe</h1>
        <p className="mt-4 text-ash/60">Puede que la dirección haya cambiado.</p>
        <Link to="/blog" className="mt-8 inline-block text-sm text-navy-line hover:text-white">
          Ver todos los artículos
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-2xl px-8 pb-40 pt-28">
      <Link to="/blog" className="text-xs text-ash/40 transition-colors hover:text-white">
        Blog
      </Link>

      <header className="mt-8">
        <h1 className="font-display text-4xl italic leading-tight text-white md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-xs text-ash/40">
          {formatDate(post.date)} · {post.readingTime} min de lectura
        </p>
      </header>

      {post.cover && (
        <img
          src={post.cover}
          alt={post.coverAlt}
          className="mt-10 aspect-[16/9] w-full border border-navy-deep object-cover"
        />
      )}

      {/* Cuerpo: medida corta (~68 caracteres) e interlineado alto para
          compensar el texto claro sobre fondo negro. */}
      <div className="mt-12 text-[17px]">
        {post.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </article>
  );
}
