import React from 'react';
import { PaperCard } from './PaperCard';

interface Paper {
  title: string;
  author: string;
  year: number;
  abstract: string;
  keywords: string[];
  doi: string;
}

interface PapersListProps {
  papers: Paper[];
}

export function PapersList({ papers }: PapersListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {papers.map((paper) => (
        <PaperCard key={paper.doi} paper={paper} />
      ))}
    </div>
  );
}