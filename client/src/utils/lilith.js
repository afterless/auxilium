const fs = require('fs')
const moment = require('moment')
const { gpt } = require('./keen')
const axios = require('axios').default
const { checkResAval, addRes } = require('./resHelper')

let state = {}

const classify = async input => {
    let prompt = `Q: I would like to place an order for fries
A: order
Q: One carbonara pizza and a coke please
A: order
Q: i would like to make a reservation for today 4pm
A: reservation
Q: 4:14 pm tomorrow on 7pm
A: reservation
Q: one large chicken menu
A: order
Q: tuesday 5am
A: reservation
Q: today
A: reservation
Q: 4:00 pm
A: order
Q: 3:13 pm
A: order
Q: Ayush Panda
A: reservation
Q: Jochem Stoel
A: reservation
Q: ${input}
A:`
    return gpt({
        prompt,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['\n', 'Q:', 'A:']
    }).then(response => response.text).then(text => text.trim())
}

const parseOrder = input => {
    let prompt = `Q: I would like to place an order for fries
A: {"order": ["fries"]}
Q: I'll order fries and slushie
A: {"order": ["fries", "slushie"]}
Q: I want fries and diet soda
A: {"order": ["fries", "diet soda"]}
Q: One carbarona pizza and a red bull please
A: {"order": ["carbarona pizza", "red bull"]}
Q: I'll have a tomato sandwich and orange soda and I'll pick it up at 9
A: {"order": ["tomato sandwich", "orange soda"], "time": "9:00"}
Q: I'll pickup my order at 9 am
A: {"time": "9:00 am"}
Q: I'll pickup my order at 9:15 pm
A: {"time": "9:15 pm"}
Q: I'll order fries and diet soda and pickup at 9:30
A: {"order": ["fries", "diet soda"], "time": "9:30"}
Q: Can I get a garlic sandwich with a coke, I'll pickup around 4:45
A: {"order": ["garlic sandwich", "coke"], "time": "4:45"}
Q: ${input}
A:`

    return gpt({
        prompt,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['\n', 'Q:', 'A:']
    }).then(response => response.text).then(text => text.trim())
}

const parseReservation = async input => {
    let prompt = `Q: Can I place a reservation at 4:00 for five people today?
A: {"time": "4:00", "date": "today", "people": 5}
Q: I would like to place a reservation at 5:15 today for 4 people
A: {"time": "5:15", "date": "today", "people": 4}
Q: 5:15 on Tuesday for 3 people
A: {"time": "5:15", "date": "Tuesday", "people": 3}
Q: 4:30 today
A: {"time": "4:30", "date": "today"}
Q: Ayush 
A: {"name": "Ayush"}
Q: I would like to place a reservation for 3 at 5:15 under Jochem
A: {"time": "5:15", "people": 3, "name": "Jochem"}
Q: ${input}
A:`

    return gpt({
        prompt,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['\n', 'Q:', 'A:']
    }).then(response => response.text).then(text => text.trim())
}

const resp = async (num, num1, res) => {
    let classification = await classify(res)
    if (classification === 'reservation') {
        let resState = await parseReservation(res)
        resState = JSON.parse(resState)
        if (!(num in state)) {
            state[num] = resState
        } else {
            state[num] = Object.assign({}, state[num], resState)
        }
        if (!resState.hasOwnProperty('people')) {
            return 'How many people are in your party?' 
        } else if (!resState.hasOwnProperty('date')) {
            return 'What day do you wish to place your reservation?'
        } else if (!resState.hasOwnProperty('name')) {
            return 'What is thte name for the reservation'
        }

        if(!checkResAval(state[num])) {
            state[num] = {}
            return 'Reservation not available, other times?'
        }
        addRes(state[num]);
        return 'Your Reservation is Set!'
    }  else if (classification === 'order') {
        let orderState = await parseOrder(res)
        orderState = JSON.parse(orderState)
        if (!(num in state)) {
            state[num] = orderState
        } else {
            state[num] = Object.assign({}, state[num], orderState)
        }
        if (!state[num].hasOwnProperty('time')) {
            return 'What time would you like to pickup your order?'
        } else if (!state[num].hasOwnProperty('order')) {
            return 'What will your order be?'
        }
        let cost = 0
        let exists = true

        await axios.get(`/api/entities/${num1}/menu`, {
            proxy: {
                host: 'localhost',
                port: 5000
            }
        }).then((res) => {
            if (res.data) {
                for (let i = 0; i < state[num].order.length; i++) {
                    let key = state[num].order[i].toLowerCase(); 
                    console.log(key, res.data[0].menu[key])
                    exists &= (key in res.data[0].menu)
                    console.log(exists)
                    if (exists) {
                        console.log(res.data[0].menu[key])
                        cost += res.data[0].menu[key]
                    } else {
                        exists = false
                        cost = 0
                    }             
                }
            }
        }).catch(err => console.log(err))

        if (exists) {
            return `Your order of ${state[num].order.join(', ')} costs ${Number(cost).toPrecision(4)}, please pickup by ${state[num].time}`
        } else {
            state[num].order = [] 
            return 'Please repeat your order again, some items were invalid'
        }
    }
    return null
}

const getState = async () => {
    return state;
}

const resetState = async () => {
    state = {}
}

module.exports = {
    resp,
    getState,
    resetState
} 
