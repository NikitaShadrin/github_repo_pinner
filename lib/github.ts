import { Repository } from "@/types/repository";

export async function searchRepositories(
  language: string,
  perPage: number = 30
): Promise<Repository[]> {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=language:${encodeURIComponent(language)}&sort=stars&order=desc&per_page=${perPage}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }

  const data = await response.json();
  return data.items;
}