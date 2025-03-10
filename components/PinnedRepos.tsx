'use client';

import { usePinnedContext } from '@/context/PinnedContext';
import { Repository } from '@/types/repository';

export default function PinnedRepos() {
  const { pinnedRepos, removePinnedRepo, hasMounted } = usePinnedContext();
  if (!hasMounted) return null

  return (
    <section className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Pinned Repositories</h2>
      
      {pinnedRepos.length === 0 ? (
        <p className="text-center text-gray-500">No pinned repositories yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pinnedRepos.map((repo) => (
            <div key={repo.id} className="h-full border-2 border-gray-600 p-6 rounded-xl 
            shadow-indigo-600 hover:shadow-sm transition-shadow flex flex-col justify-between">
              <h2 className="text-xl font-bold mb-2">
                <a
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-(--blu) relative group"
                >
                  {repo.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-(--blu) transition-all duration-300 group-hover:w-full"></span>
                </a>
              </h2>
              <p className="text-gray-400 mb-4">{repo.description || 'No description available'}</p>
              
              <div className="flex gap-4 text-sm text-gray-400">
                <div className="flex items-center">
                  ⭐ <span className="ml-1">{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center">
                  🍴 <span className="ml-1">{repo.forks_count}</span>
                </div>
                <div className="flex items-center">
                  ❗ <span className="ml-1">{repo.open_issues_count}</span>
                </div>
              </div>

              <button
                onClick={() => removePinnedRepo(repo.id)}
                className="mt-3 mx-4 py-1 text-sm border-2 border-gray-600 rounded hover:border-red-400 transition-colors cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}