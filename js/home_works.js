//#1
const button = document.querySelector("#gmail_button")
const input = document.querySelector("#gmail_input")

const regExp = /^[a-z0-9]+@gmail\.com$/

button.onclick = () => {
    if (regExp.test(input.value)) {
        input.style.backgroundColor = 'green'
    }else {input.style.backgroundColor = 'red'
        console.log("error")
    }
}


const box = document. querySelector ( '.child_block')
let positionX = 0
let positionY = 0
let positionXEnd = 447
let positionYEnd = 447
const move = () => {
    if (positionX < 447 && positionY === 0) {
        positionX++
        box.style.left = `${positionX}px`
        setTimeout(move, 1)
    } else if (positionX >= 447 && positionY < 447) {
        positionY++
        box.style.top = `${positionY}px`
        setTimeout(move, 1)
    } else if (positionXEnd > 0) {
        positionXEnd--
        box.style.left = `${positionXEnd}px`
        setTimeout(move, 1)
    } else if (positionYEnd > 0) {
        positionYEnd--
        box.style.top = `${positionYEnd}px`
        setTimeout(move, 1)
    }else {
        positionX = 0
        positionY = 0
        positionXEnd = 447
        positionYEnd = 447
        move()
    }
}
move()

//#2

const start = document.querySelector("#start")
const stop = document.querySelector("#stop")
const reset = document.querySelector("#reset")
const resume = document.querySelector("#resume")

const intervalMinutes = document.querySelector("#minutes")
const intervalSeconds = document.querySelector("#seconds")
const intervalMlSeconds = document.querySelector("#ml-seconds")

let seconds = 0
let minutes = 0
let mlSeconds = 0
let idInterval
let resumed=false
let isRunning=false

function startSec(){
    return idInterval=setInterval(()=>{
        if(mlSeconds<60){
            mlSeconds++
            intervalMlSeconds.innerHTML=mlSeconds
        }else {
            mlSeconds = 0
        }
        if(mlSeconds===60) {
            if (seconds < 60) {
                seconds++
            } else {
                seconds = 0
            }
            intervalSeconds.innerHTML = seconds
            if (seconds === 60) {
                if (minutes < 60) {
                    minutes++
                } else {
                    minutes = 0
                }
                intervalMinutes.innerHTML = minutes
            }
        }

    },20)
}

start.onclick = () => {
    seconds = 0
    minutes = 0
    mlSeconds = 0
    intervalMlSeconds.innerHTML='00'
    intervalSeconds.innerHTML='00'
    intervalMinutes.innerHTML='00'
    resumed = false
    if (!isRunning){
        startSec()
        isRunning=true
    }
}

stop.onclick=()=>{
    clearInterval(idInterval)
    idInterval=null
    resumed = true
    isRunning=false
}

reset.onclick=()=>{
    clearInterval(idInterval)
    idInterval=null
    seconds = 0
    minutes = 0
    mlSeconds = 0
    resumed = false
    intervalMlSeconds.innerHTML='00'
    intervalSeconds.innerHTML='00'
    intervalMinutes.innerHTML='00'
    isRunning=false
}

resume.onclick=() => {
    if (!idInterval && resumed && !isRunning) {
        startSec()
    }
}