import React, { useEffect, useRef } from 'react';
import { animatePageEnter } from '../utils/animations.js';

export default function ArticleReaderView({ article, navigate }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current && article) {
      animatePageEnter(contentRef.current);
    }
  }, [article?.id]);
  if (!article) {
    return (
      <section className="view-section" id="view-article-reader">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
          <button
            className="inline-flex items-center gap-2 text-primary text-label-md font-label-md mb-8 hover:underline cursor-pointer"
            onClick={() => navigate('community')}
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Journal Articles</span>
          </button>
          <p className="text-secondary">No article selected.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="view-section" id="view-article-reader">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
        <button
          className="inline-flex items-center gap-2 text-primary text-label-md font-label-md mb-8 hover:underline cursor-pointer"
          onClick={() => navigate('community')}
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Journal Articles</span>
        </button>
        <div ref={contentRef} className="bg-surface-container-lowest p-6 sm:p-10 rounded-2xl border border-outline-variant/30 shadow-xs" id="article-reader-content">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-80 object-cover rounded-xl mb-6 shadow-xs"
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: article.fullContent }} />
        </div>
      </div>
    </section>
  );
}
