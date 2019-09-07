var fetch = require('node-fetch')

const queryPivotal = async (url, method = 'get', body) => {
  if (!process.env.PIVOTAL_TOKEN)
    throw new Error('PIVOTAL_TOKEN env var not set.')

  if (!process.env.PROJECT_ID)
    throw new Error('PROJECT_ID env var not set.')

  var response = await fetch(
    `https://www.pivotaltracker.com/services/v5/projects/${process.env.PROJECT_ID}/${url}`,
    {
      headers: {
        'X-TrackerToken': process.env.PIVOTAL_TOKEN,
        'Content-Type': 'application/json',
      },
      method,
      body: typeof body === 'object' ? JSON.stringify(body) : body,
    }
  )
  return await response.json()
}

const updateStoryName = async function(storyId, name){
  return queryPivotal(`stories/${storyId}`, 'put', { name })
}

const sanitizeName = function(description, issueId){
  if (description.startsWith(`**PAD-${issueId}**`)) return description
  return `**PAD-${issueId}** ` + description
}

const matchPAD = function(name){
  var regex = /PAD[-_](\d+)/
  var match = name.match(regex)
  if (match) return Number(match[1])
  return null
}

module.exports = {
  queryPivotal,
  updateStoryName,
  sanitizeName,
  matchPAD,
}
