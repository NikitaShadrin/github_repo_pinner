'use client';

import { Repository } from '@/types/repository';
import { usePinnedContext } from '@/context/PinnedContext'

interface RepositoryCardProps {
  repo: Repository;
  onPin: () => void;
}

export default function RepositoryCard({ repo, onPin }: RepositoryCardProps) {
  const { pinnedRepos, removePinnedRepo, hasMounted } = usePinnedContext();
  const isPinned = pinnedRepos.some((r) => r.id === repo.id);
  if (!hasMounted) return null

  return (
    <div className="h-full border-2 border-gray-600 p-6 rounded-xl 
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
        onClick={() => isPinned ? removePinnedRepo(repo.id) : onPin()}
        className={`mt-4 mx-4 py-2 rounded transition-colors cursor-pointer ${
          isPinned 
            ? 'border-2 border-gray-600 group hover:border-red-400'
            : 'bg-(--grin) hover:bg-green-800'
        }`}
      >
        <span className="block group-hover:hidden">
          {isPinned ? 'Pinned!' : 'Pin Repository'}
        </span>
        <span className="hidden group-hover:block">
          {isPinned ? 'Unpin?' : 'Pin Repository'}
        </span>
      </button>
    </div>
  );
}