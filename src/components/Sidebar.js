import React from 'react';
import PropTypes from 'prop-types'

const Sidebar = ({ repositories, onRepoSelect }) => {
  return (
    <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px' }}>
      <h2>Projects</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {repositories.map((repo) => (
          <li
            key={repo.id}
            onClick={() => onRepoSelect(repo)}
            style={{ cursor: 'pointer', marginBottom: '10px' }}
          >
            {repo.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

Sidebar.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onRepoSelect: PropTypes.func.isRequired
}

export default Sidebar
