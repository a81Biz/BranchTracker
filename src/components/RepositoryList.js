import React from 'react';
import BranchList from './BranchList';

const RepositoryList = ({ repositories }) => {
  return (
    <div>
      {repositories.map((repo) => (
        <div key={repo.id} style={{ marginBottom: '20px' }}>
          <h2>{repo.name}</h2>
          <BranchList repositoryName={repo.name} owner={repo.owner.login} />
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
