// src/sections/BlogList.jsx
import { Link } from 'react-router-dom';
import { posts, formatDate } from '../data/posts';

export default function BlogList() {
  const ordered = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className="mx-auto max-w-3xl px-8 pb-40 pt-28">
      <h1 className="font-display text-4xl italic text-white">Blog</h1>
      <p className="mt-4 max-w-md text-sm text-ash/50">
        Tonterias que escribo cuando me aburro y que me da por publicar para no olvidarme de ellas.
      </p>

      {ordered.length === 0 ? (
        <p className="mt-20 text-ash/40">Todavía no hay artículos. El primero llega pronto.</p>
      ) : (
        <div className="mt-16 divide-y divide-navy-deep border-t border-navy-deep">
          {ordered.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block py-10 transition-colors duration-500 hover:bg-navy-deep/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-navy"
            >
              <p className="text-xs text-ash/35">
                {formatDate(post.date)} · {post.tags.join(', ')}
              </p>
              <h2 className="mt-3 font-display text-2xl italic leading-snug text-white/90 transition-colors group-hover:text-white">
                {post.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ash/55">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
