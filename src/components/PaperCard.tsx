import React from 'react';
import { BookOpen, Calendar, Tag, Link2 } from 'lucide-react';

interface Paper {
  title: string;
  author: string;
  year: number;
  abstract: string;
  keywords: string[];
  doi: string;
}

interface PaperCardProps {
  paper: Paper;
}

export function PaperCard({ paper }: PaperCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] duration-300">
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">
            {paper.title}
          </h2>
          <div className="flex items-center text-gray-600 text-sm">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>{paper.author}</span>
            <span className="mx-2">•</span>
            <Calendar className="h-4 w-4 mr-2" />
            <span>{paper.year}</span>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">
          {paper.abstract}
        </p>

        <div className="flex flex-wrap gap-2">
          <Tag className="h-4 w-4 text-indigo-600" />
          {paper.keywords.map((keyword) => (
            <span
              key={keyword}
              className="text-xs px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="pt-2 flex items-center text-sm text-indigo-600 hover:text-indigo-800">
          <Link2 className="h-4 w-4 mr-2" />
          <a
            href={`https://doi.org/${paper.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {paper.doi}
          </a>
        </div>
      </div>
    </article>
  );
}