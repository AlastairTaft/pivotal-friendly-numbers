var fetch = require('node-fetch')

/**
 * Query the Pivotal api
 * @param {string} url 
 * @param {string} opt_method GET, PUT, POST, etc
 * @param {object|string} opt_body The request body data.
 * @returns {Promise<object>} 
 */
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

/**
 * Update the story name
 * @param {string} storyId
 * @param {string} newName The new story name
 * @returns {Promise}
 */
const updateStoryName = async function(storyId, newName){
  return queryPivotal(`stories/${storyId}`, 'put', { name: newName })
}

/**
 * Ensures the passed in ticket name starts with our desired ticket id
 * @param {string} name
 * @param {string} desiredTicketId
 * @returns {string}
 */
const sanitizeName = function(name, desiredTicketId){
  if (name.startsWith(`**${process.env.TICKET_PREFIX || ''}${desiredTicketId}**`)) return name
  return `**${process.env.TICKET_PREFIX || ''}${desiredTicketId}** ` + name
}

module.exports = {
  queryPivotal,
  updateStoryName,
  sanitizeName,
}
