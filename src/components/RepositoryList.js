import PropTypes from 'prop-types';

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

RepositoryList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RepositoryList;
