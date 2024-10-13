
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const BranchCard = ({ branch, owner, repo }) => {
  const [commitDetails, setCommitDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // eslint-disable-next-line no-undef
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    const fetchCommitDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/commits/${branch.commit.sha}`,
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
  }, [branch.commit.sha, owner, repo]);

  if (loading) return <div>Loading branch details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h3>{branch.name}</h3>
      <p>Last Commit: {commitDetails.sha}</p>
      <p>Message: {commitDetails.commit.message}</p>
      <p>Author: {commitDetails.commit.author.name}</p>
    </div>
  );
};

BranchCard.propTypes = {
  branch: PropTypes.shape({
    name: PropTypes.string.isRequired,
    commit: PropTypes.shape({
      sha: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  owner: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
};

export default BranchCard;
