import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/user/repos`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          }
        );
        setRepositories(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [GITHUB_TOKEN]);

  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo);
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial' }}>
      <Sidebar repositories={repositories} onRepoSelect={handleRepoSelect} />
      <ErrorBoundary>
        {loading ? (
          <div>Loading repositories...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          selectedRepo && <Dashboard repository={selectedRepo} />
        )}
      </ErrorBoundary>
    </div>
  );
};

export default App;
