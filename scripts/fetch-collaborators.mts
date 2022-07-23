import { Octokit } from '@octokit/core'
import fsExtra from 'fs-extra'

const octokit = new Octokit()
const org = 'edge-js'

/**
 * Returns a list of repos for the Edge-js organization
 * on Github
 */
async function fetchOrganizationRepos() {
  const { data: repos } = await octokit.request('GET /orgs/{org}/repos', {
    org,
    type: 'public',
    per_page: 100,
  })

  return repos.filter((repo) => repo.archived === false)
}

/**
 * Fetches collaborators for a given repo
 */
async function fetchCollaboratorsFor(repo: string) {
  const response = await octokit.request('GET /repos/{owner}/{repo}/contributors', {
    owner: org,
    repo,
  })

  if (!response.data) {
    return []
  }

  console.log(`"${repo}" repo has "${response.data.length}" collaborators`)

  return response.data.map((row) => {
    return {
      avatar_url: row.avatar_url,
      url: row.html_url,
      username: row.login,
    }
  })
}

/**
 * Filtering collaborators to only unique entries
 */
function filterUnique(collaborators: { username: string }[]) {
  return collaborators.filter((collaborator, index) => {
    return collaborators.findIndex((colab) => colab.username === collaborator.username) === index
  })
}

/**
 * Remove bots from the list of collaborators
 */
function removeBots(collaborators: { username: string }[]) {
  const botNames = ['dependabot[bot]', 'snyk-bot', 'fossabot']
  return collaborators.filter((collaborator) => {
    return !botNames.includes(collaborator.username)
  })
}

async function run() {
  let collaborators: any[] = []

  console.log(`Fetching repos of the organization...`)

  const repos = await fetchOrganizationRepos()
  console.log(`Fetching collaborators for "${repos.length}" repos`)
  for (const repo of repos) {
    collaborators = collaborators.concat(await fetchCollaboratorsFor(repo.name))
  }

  const uniqueCollaborators = removeBots(filterUnique(collaborators))
  await fsExtra.outputJSON('docs/collaborators.json', uniqueCollaborators)
  console.log(`contents/collaborators.json with "${uniqueCollaborators.length}" collaborators`)
}

run()
