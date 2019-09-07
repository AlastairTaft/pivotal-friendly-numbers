
var { updateStoryName, sanitizeName } = require('./lib/pivotal')
var { insertRecord, getRecordByPivotalId } = require('./lib/db')

const main = async function(e) {
  var event = JSON.parse(
    e.body
      .replace(new RegExp('\n', 'g'), '')
      .replace(new RegExp('\t', 'g'), ''),
  )
  console.log('#args', JSON.stringify(event, null, 2))

  await handleEvent(event)

  return {
    statusCode: 204,
  }
}


const handleEvent = async (event) => {
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


/*
{ 
  kind: 'story_create_activity',
  guid: '2396790_2',
  project_version: 2,
  message: 'Alastair Taft added this feature',
  highlight: 'added',
  changes:
  [ { kind: 'story',
  change_type: 'create',
  id: 168358550,
  new_values: [Object],
  name: 'This is a test story.',
  story_type: 'feature' } ],
  primary_resources:
  [ { kind: 'story',
  id: 168358550,va
  name: 'This is a test story.',
  story_type: 'feature',
  url: 'https://www.pivotaltracker.com/story/show/168358550' } ],
  secondary_resources: [],
  project: { kind: 'project', id: 2396790, name: 'Test Project' },
  performed_by:
  { kind: 'person',
  id: 3281383,
  name: 'Alastair Taft',
  initials: 'AT' },
  occurred_at: 1567848015000 }*/