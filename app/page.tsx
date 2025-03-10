'use client';
import { useState, useContext } from 'react';
import { searchRepositories } from '../lib/github';
import LanguageSelector from '../components/LanguageSelector';
import RepositoryCard from '../components/RepositoryCard';
import PinnedRepos from '../components/PinnedRepos';
import { usePinnedContext } from '../context/PinnedContext';
import { Repository } from '@/types/repository';

export default function Home() {
  const [language, setLanguage] = useState('');
  const [numToFetch, setNumToFetch] = useState(6)
  const [fetchedRepos, setFetchedRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const { pinnedRepos, addPinnedRepo } = usePinnedContext();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const repos = await searchRepositories(language);
      const randomRepo = repos[Math.floor(Math.random() * repos.length)];
      setFetchedRepos(repos.slice(0, numToFetch));
    } catch (error) {
      console.error('Error fetching repos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className='max-w-4xl mx-auto text-center mb-12'>
        <h1 className="text-3xl font-bold mb-10 mt-6">GitHub Repo Finder</h1>
        
        <div className="flex flex-col items-center gap-y-6 md:flex-row md:items-start justify-evenly pb-12">
          <LanguageSelector value={language} onChange={setLanguage} />

          <div className="w-full max-w-xs">
            <input
              type="number"
              min="1"
              max="100"
              value={numToFetch}
              onChange={(e) => setNumToFetch(Math.min(100, Math.max(1, +e.target.value)))}
              className="p-2 border rounded focus:ring-2 focus:ring-(--blu) focus:outline-none"
              placeholder="Number to fetch"
            />
            <p className="text-sm text-gray-400 mt-1">Enter number (1-100)</p>
          </div>

          <button 
            onClick={handleSearch}
            className="px-5 py-3 bg-(--porp) text-foreground text-lg font-semibold rounded-2xl hover:bg-(--deeporp) disabled:bg-gray-500 transition-colors cursor-pointer"
            disabled={!language || loading}
          >
            {loading ? 'Searching...' : 'Find Repository'}
          </button>
        </div>

        {fetchedRepos.length > 0 && (
          <section className="max-w-7xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fetchedRepos.map((repo) => (
                <RepositoryCard
                  key={repo.id}
                  repo={repo}
                  onPin={() => addPinnedRepo(repo)}
                />
              ))}
            </div>
          </section>
        )}

        <PinnedRepos/>
      </div>
    </main>
  );
}