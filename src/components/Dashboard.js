import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EnvironmentColumn from './EnvironmentColumn'
import PropTypes from 'prop-types'

const Dashboard = ({ repository }) => {
  const [branches, setBranches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [environments, setEnvironments] = useState([])

  // eslint-disable-next-line no-undef
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${repository.owner.login}/${repository.name}/branches`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`
            }
          }
        )
        setBranches(response.data)
        determineEnvironments(response.data)
      } catch (err) {
        setError('Error fetching branches')
      } finally {
        setLoading(false)
      }
    }

    fetchBranches()
  }, [repository, GITHUB_TOKEN])

  const determineEnvironments = (branches) => {
    const environmentNames = ['dev', 'qa', 'uat', 'prod']
    const detectedEnvironments = []

    environmentNames.forEach((env) => {
      const branch = branches.find((branch) => branch.name.toLowerCase() === env)

      if (branch) {
        detectedEnvironments.push({ name: env.toUpperCase(), branch })
      }
    })

    // Si no se detectan entornos específicos, busca la rama main o master
    if (detectedEnvironments.length === 0) {
      const mainBranch = branches.find(
        (branch) => branch.name === 'main' || branch.name === 'master'
      )

      if (mainBranch) {
        setEnvironments([{ name: 'Main or Master', branch: mainBranch }])
      } else {
        setEnvironments(['No Active Environments'])
      }
    } else {
      setEnvironments(detectedEnvironments)
    }
  }

  if (loading) return <div>Loading branches...</div>
  if (error) return <div>{error}</div>

  return (
    <div style={{ display: 'flex', flex: 1, padding: '10px' }}>
      {environments.map((env) =>
        typeof env === 'string'
          ? (<EnvironmentColumn
              key={env}
              environment={env}
              branches={branches}
              repository={repository}
             />
            )
          : (<EnvironmentColumn
              key={env.name}
              environment={env.name}
              branch={env.branch}
              repository={repository}
             />
            )
      )}
    </div>
  )
}

Dashboard.propTypes = {
  repository: PropTypes.shape({
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default Dashboard
