import { randomInt } from "crypto"

const rn = Math.floor(Date.now() / 1000) + 30
const randomTime = rn 
const mock1 = {
    cooldown:  randomTime,
    id: 2615255,
    position: {
        x: 11,
        y: 14
    }
}

const mock2 = {
    cooldown:  randomTime,
    id: 2615402,
    position: {
        x: 11,
        y: 16
    }
}

const mock3 = {
    cooldown:  randomTime,
    id: 2615833,
    position: {
        x: 8,
        y: 16
    }
}

const mock4 = {
    cooldown:  randomTime,
    id: 2615947,
    position: {
        x: 8,
        y: 14
    }
}

const mock5 = {
    cooldown:  randomTime,
    id: 2615959,
    position: {
        x: 21,
        y: 14
    }
}

const mock6 = {
    cooldown:  randomTime,
    id: 2615971,
    position: {
        x: 21,
        y: 16
    }
}

const mock7 = {
    cooldown:  randomTime,
    id: 2615986,
    position: {
        x: 24,
        y: 16
    }
}

const mock8 = {
    cooldown:  randomTime,
    id: 2615999,
    position: {
        x: 24,
        y: 14
    }
}
const mockSummoners = [mock1, mock2, mock3, mock4, mock5, mock6, mock7 ,mock8]
export default  mockSummoners