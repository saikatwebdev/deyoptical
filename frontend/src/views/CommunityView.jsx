import React, { useEffect, useRef } from 'react';
import { ARTICLES } from '../data/mockData.js';
import { animateStagger } from '../utils/animations.js';

export default function CommunityView({ navigate, openArticle }) {
  const articlesGridRef = useRef(null);

  useEffect(() => {
    if (articlesGridRef.current) {
      animateStagger(articlesGridRef.current.children, { delay: 60, duration: 450 });
    }
  }, []);
  return (
    <section className="view-section" id="view-community">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-body-sm font-body-sm text-secondary mb-6">
          <button className="hover:underline cursor-pointer" onClick={() => navigate('home')}>
            Home
          </button>
          <span>/</span>
          <span className="text-on-surface font-semibold">Eye Health Journal</span>
        </div>

        <div className="max-w-3xl mb-12">
          <span className="text-label-sm font-label-sm text-primary tracking-wide uppercase font-semibold">
            Clinical Insights
          </span>
          <h1 className="text-headline-lg md:text-display font-display text-on-surface mt-2">
            Eye Health Journal
          </h1>
          <p className="text-body-lg font-body-lg text-secondary mt-4">
            Educational articles authored by our optometric team on optical technology, preventative vision care, and
            lens care guides.
          </p>
        </div>

        {/* Articles Grid */}
        <div ref={articlesGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8" id="full-articles-grid">
          {ARTICLES.map((a) => (
            <article
              key={a.id}
              onClick={() => openArticle(a.id)}
              className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xs hover:border-primary/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="overflow-hidden h-56 w-full bg-surface-container">
                <img
                  alt={a.title}
                  src={a.image || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1160'}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    <span>{a.category}</span>
                    <span className="text-secondary font-mono-data font-normal">{a.readTime}</span>
                  </div>

                  <a
                    href="javascript:void(0)"
                    onClick={(e) => {
                      e.stopPropagation();
                      openArticle(a.id);
                    }}
                    className="block"
                  >
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {a.title}
                    </h3>
                  </a>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {a.summary}
                  </p>
                </div>

                <a
                  href="javascript:void(0)"
                  onClick={(e) => {
                    e.stopPropagation();
                    openArticle(a.id);
                  }}
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-container"
                >
                  Find out more
                  <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                    &rarr;
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
