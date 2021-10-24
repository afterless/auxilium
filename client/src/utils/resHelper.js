let resList = []

const addRes = res => {
    resList.push(res) 
} 

const checkResAval = res => {
    for (let i = 0; i < resList.length; i++) {
        if (res.time === resList[i].time && res.date.diff(resList[i].date) === 0 && res.people === resList[i].people) {
            return false;            
        }
    }
    return true;
}

module.exports = {
    addRes,
    checkResAval
}
