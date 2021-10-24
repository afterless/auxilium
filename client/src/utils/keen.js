const fetch = require('node-fetch')

/**
 * Query GPT-3 model on Keen.
 * @async
 * @param {object} options the parameters and prompt
 * @returns 
 */
 const gpt = async options => fetch('https://keenml.com/afterless/gpt', {
    method: 'POST',
    body: JSON.stringify(options),
    headers: {
        'Content-type': 'application/json'
    }
})
.then(response => response.json())

module.exports = {
    gpt
}
