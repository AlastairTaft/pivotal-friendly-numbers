
var { updateStoryName, sanitizeName } = require('./lib/pivotal')
var { insertRecord, getRecordByPivotalId } = require('./lib/db')

const main = async function(e) {
  var event = JSON.parse(
    e.body
      .replace(new RegExp('\n', 'g'), '')
      .replace(new RegExp('\t', 'g'), ''),
  )
  console.log('#event', JSON.stringify(event, null, 2))
  await handleEvent(event)
  return {
    statusCode: 204,
  }
}

const handleEvent = async (event) => {

  // If this event was triggered by our service account then don't react to 
  // it, helps avoid getting stuck in update loops if there's any bugs
  if (process.env.SERVICE_ACCOUNT_ID && event['performed_by']['id'] == process.env.SERVICE_ACCOUNT_ID){
    console.log('Operation performed by service account, ignoring.')
    return
  }

  if (event['primary_resources'][0]['story_type'] == 'release'){
    console.log('Ignoring because ticket type is \'release\'.')
    return
  }
  
  switch(event['kind']){
    case 'story_create_activity':
    case 'story_update_activity':
      var pivotalId = event['primary_resources'][0]['id']
      var record = await getRecordByPivotalId(pivotalId)
      if (!record)  
        record = await insertRecord(pivotalId)
      var name = sanitizeName(event['primary_resources'][0]['name'], record.id)
      await updateStoryName(pivotalId, name)
    default: return
  }
}

module.exports = { 
  main,
}
