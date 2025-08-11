import React from "react";
import styles from "./SearchResults.module.css";

interface SearchResult {
  id: number;
  username: string;
  email: string;
  profilePicture: string | null;
}

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
}

const SearchResults = ({ results, loading, error }: SearchResultsProps) => {
  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {results.length === 0 ? (
        <div className={styles.noResults}>No results found.</div>
      ) : (
        results.map((result) => (
          <div key={result.id} className={styles.resultItem}>
            <div>
              <strong>{result.username}</strong>
            </div>
            <div>{result.email}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
