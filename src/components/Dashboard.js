import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EnvironmentColumn from './EnvironmentColumn';

const Dashboard = ({ repository }) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${repository.owner.login}/${repository.name}/branches`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          }
        );
        setBranches(response.data);
      } catch (err) {
        setError('Error fetching branches');
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [repository]);

  if (loading) return <div>Loading branches...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: 'flex', flex: 1, padding: '10px' }}>
      {['DEV', 'QA', 'PROD'].map((env) => (
        <EnvironmentColumn
          key={env}
          environment={env}
          branches={branches}
          repository={repository}
        />
      ))}
    </div>
  );
};

export default Dashboard;
