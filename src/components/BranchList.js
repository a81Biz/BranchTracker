import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BranchCard from './BranchCard';

const BranchList = ({ repositoryName, owner }) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repositoryName}/branches`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          }
        );
        setBranches(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching branches');
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [repositoryName, owner]);

  if (loading) return <div>Loading branches for {repositoryName}...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {branches.map((branch) => (
        <BranchCard key={branch.name} branch={branch} owner={owner} repo={repositoryName} />
      ))}
    </div>
  );
};

export default BranchList;
