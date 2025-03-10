'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Repository } from '@/types/repository';

type PinnedContextType = {
  pinnedRepos: Repository[];
  hasMounted: boolean;
  addPinnedRepo: (repo: Repository) => void;
  removePinnedRepo: (id: number) => void;
};

const PinnedContext = createContext<PinnedContextType>({
  pinnedRepos: [],
  hasMounted: false,
  addPinnedRepo: () => {},
  removePinnedRepo: () => {},
});

export function PinnedProvider({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [pinnedRepos, setPinnedRepos] = useState<Repository[]>([]);

  // Initialize from localStorage after mount
  useEffect(() => {
    const saved = localStorage.getItem('pinnedRepos');
    setPinnedRepos(saved ? JSON.parse(saved) : []);
    setHasMounted(true);
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('pinnedRepos', JSON.stringify(pinnedRepos));
    }
  }, [pinnedRepos, hasMounted]);

  const addPinnedRepo = (repo: Repository) => {
    setPinnedRepos((prev) => {
      const exists = prev.some((r) => r.id === repo.id);
      if (exists) return prev;
      return [...prev, repo];
    });
  };

  const removePinnedRepo = (id: number) => {
    setPinnedRepos((prev) => prev.filter((repo) => repo.id !== id));
  };

  return (
    <PinnedContext.Provider value={{ pinnedRepos, addPinnedRepo, removePinnedRepo, hasMounted }}>
      {children}
    </PinnedContext.Provider>
  );
}

export const usePinnedContext = () => useContext(PinnedContext);
