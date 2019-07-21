'use strict'
const cote = require('cote')({ statusLogsEnabled: false })
const StellarSdk = require('stellar-sdk')

function main () {
  startMicroservice()
}

const msKey = 'eskill_proofofuptime'

function startMicroservice () {
  const svc = new cote.Responder({
    name: 'ESkill proof of uptime Service',
    key: msKey
  })

  svc.on('task', (req, cb) => {
    const suffix = getsuffix(req.task)
    getStellarPvtKey(suffix, (err, jobResult) => {
      if (err) cb(err)
      else cb(null, req.task, jobResult)
    })
  })
}

function getsuffix (task) {
  const variables = task.variables
  for (let i = 0; i < variables.length; i++) {
    if (variables[i].name === 'job_msg') {
      return variables[i].value
    }
  }
}
main()

/**
 * Find the stellar key pair for given suffix value of the public key
 * returns private key of given suffix value of stellar 
 * @param {*} suffix 
 * @param {*} cb 
 */
function getStellarPvtKey (suffix, cb) {
  try {
    let pair = StellarSdk.Keypair.random()
    suffix = suffix.toUpperCase()
    while (true) {
      if (pair.publicKey().endsWith(suffix)) {
        break
      }
      pair = StellarSdk.Keypair.random()
    }
    var privateKey = pair.secret()
    const jobResult = {
      pvtkey: privateKey
    }
    cb(null, jobResult)
  } catch (error) {
    cb(error)
  };
}
