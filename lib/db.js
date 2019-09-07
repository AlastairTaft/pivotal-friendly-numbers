const { Client } = require('pg')

const query = async (sql, args) => {
  const client = new Client()
  await client.connect()
  var result = (await client.query(sql, args)).rows
  await client.end()
  return result
}

const getRecordByPivotalId = async function(pivotalId){
  return (await query(`
    select * from tickets where pivotal_id = $1
  `, [pivotalId]))[0]
}

const insertRecord = async function(pivotalId){
  return (await query(`
    INSERT INTO tickets (pivotal_id)
      values
    ($1)
    returning id, pivotal_id
  ;`, [pivotalId]))[0]
}

module.exports = {
  insertRecord,
  getRecordByPivotalId,
}
