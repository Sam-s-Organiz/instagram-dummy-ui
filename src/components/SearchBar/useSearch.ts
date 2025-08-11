import { useState, useEffect } from 'react';

interface SearchResult {
  id: number;
  username: string;
  email: string;
  profilePicture: string | null;
}

interface UseSearchResult {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
}

export const useSearch = (query: string, token: string): UseSearchResult => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:8081/api/user/search?term=${query}&start=0&pageSize=10`, // Adjust start & pageSize as needed
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`, // Pass the JWT token
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }

        const data = await response.json();
        setResults(data || []); // Assuming API response is a list
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchData, 300); // Debounce API calls
    return () => clearTimeout(delayDebounce);
  }, [query, token]);

  return { results, loading, error };
};
