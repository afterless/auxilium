const express = require('express');
const router = express.Router();
const { resp } = require('../client/src/utils/lilith')
const axios = require('axios').default

const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.post('/sms', async (req, res) => {
    const twiml = new MessagingResponse();

    console.log(resp)

    let message = await resp(req.body.From, req.body.To, req.body.Body)

    console.log(message)

    if (message) {
        twiml.message(message);
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
})

module.exports = router
