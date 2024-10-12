import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnvironmentColumn = ({ environment, branches, repository }) => {
  // Filtrar ramas por entorno (DEV, QA, PROD)
  const filteredBranches = branches.filter((branch) =>
    branch.name.startsWith(environment.toLowerCase())
  );

  return (
    <div
      style={{
        flex: 1,
        padding: '10px',
        borderRight: environment !== 'PROD' ? '1px solid #ccc' : 'none',
      }}
    >
      <h3>{environment} Environment</h3>
      {filteredBranches.length > 0 ? (
        filteredBranches.map((branch) => (
          <BranchDetails
            key={branch.name}
            branch={branch}
            repository={repository}
          />
        ))
      ) : (
        <p>No branches in {environment}</p>
      )}
    </div>
  );
};

const BranchDetails = ({ branch, repository }) => {
  const [commitDetails, setCommitDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    const fetchCommitDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${repository.owner.login}/${repository.name}/commits/${branch.commit.sha}`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          }
        );
        setCommitDetails(response.data);
      } catch (err) {
        setError('Error fetching commit details');
      } finally {
        setLoading(false);
      }
    };

    fetchCommitDetails();
  }, [branch, repository, GITHUB_TOKEN]);

  if (loading) return <div>Loading branch details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h4>{branch.name}</h4>
      <p>Last Update: {new Date(commitDetails.commit.author.date).toLocaleString()}</p>
      <p>Author: {commitDetails.commit.author.name}</p>
      <p>Message: {commitDetails.commit.message}</p>
    </div>
  );
};

export default EnvironmentColumn;
