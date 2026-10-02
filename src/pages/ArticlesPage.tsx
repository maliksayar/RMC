import React, { useState } from 'react';
import { BookOpen, Search, ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ArticlesPage: React.FC = () => {
  const { articles, setActiveArticle } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Overthinking & Anxiety', 'Clinical Hypnotherapy', 'Sleep Problems'];

  const filtered = articles.filter((art) => {
    const matchCat = selectedCategory === 'All' || art.category.includes(selectedCategory);
    const matchSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-8 text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 font-bold">
          Reality Mind Clinic · Section 5
        </span>
        <h1 className="font-garamond text-4xl sm:text-5xl font-bold text-neutral-950">
          Psychoeducation & Clinical Guidance
        </h1>
        <p className="text-xs sm:text-base text-neutral-600 leading-relaxed font-sans">
          Public psychological guidance authored by our clinical team on anxiety, overthinking, sleep hygiene, and clinical hypnotherapy.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:border-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 border border-neutral-300 rounded focus:border-black focus:outline-hidden bg-white"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((art) => (
          <div
            key={art.id}
            onClick={() => setActiveArticle(art)}
            className="border border-neutral-200 bg-white rounded-lg overflow-hidden hover:border-black transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
          >
            <div>
              <div className="aspect-16/10 overflow-hidden bg-neutral-900">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span className="uppercase font-bold tracking-wider">{art.category}</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="font-garamond text-2xl font-bold text-neutral-950 leading-snug group-hover:underline">
                  {art.title}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs text-neutral-900 font-semibold border-t border-neutral-100 mt-4">
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
