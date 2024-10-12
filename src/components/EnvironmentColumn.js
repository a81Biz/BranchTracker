import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnvironmentColumn = ({ environment, branch, repository }) => {
  const [commitDetails, setCommitDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    const fetchCommitDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${repository.owner.login}/${repository.name}/commits/${branch.commit.sha}`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          }
        );
        const commitData = response.data;
        setCommitDetails(commitData);
      } catch (err) {
        setError('Error fetching commit details');
      } finally {
        setLoading(false);
      }
    };

    fetchCommitDetails();
  }, [branch, repository, GITHUB_TOKEN]);

  if (loading) return <div>Loading details for {environment}...</div>;
  if (error) return <div>{error}</div>;

  // Determina de qué rama proviene el último commit (si es posible)
  const findParentBranch = () => {
    const commitMessage = commitDetails.commit.message;
    const possibleBranches = ['dev', 'qa', 'uat', 'main', 'master'];
    for (let possibleBranch of possibleBranches) {
      if (commitMessage.toLowerCase().includes(possibleBranch)) {
        return possibleBranch.toUpperCase();
      }
    }
    return 'Unknown';
  };

  const parentBranch = findParentBranch();

  return (
    <div
      style={{
        flex: 1,
        padding: '10px',
        borderRight: environment !== 'PROD' ? '1px solid #ccc' : 'none',
      }}
    >
      <h3>{environment} Environment</h3>
      <h4>Branch: {branch.name}</h4>
      <p>Last Update: {new Date(commitDetails.commit.author.date).toLocaleString()}</p>
      <p>Author: {commitDetails.commit.author.name}</p>
      <p>Message: {commitDetails.commit.message}</p>
      <p>Parent Branch: {parentBranch}</p>
    </div>
  );
};

export default EnvironmentColumn;
