'use strict'
const cote = require('cote')
const client = new cote.Requester({ name: 'Proof of uptime client',key:'eskill_proofofuptime' });
let task = {
    variables: [
        {name:'job_msg',value:'RK'}
    ]
}
client.send({ type: 'task',task }, (err, task, result) => {
    if(err) console.log(task)
    else console.log(result)
});
