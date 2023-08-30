// REG EXP
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'YOUR NUMBER IS VALID!'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'YOUR NUMBER IS NOT VALID'
        phoneResult.style.color = 'red'
    }
}

//TAB SLIDERowTabContent()
const tabContent = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')

let currentTab = 0

const hideTabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index) => {
    tabContent[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
}

const switchToNextTab = () => {
    hideTabContent()
    currentTab = (currentTab + 1) % tabs.length
    showTabContent(currentTab)
};
hideTabContent()
showTabContent(currentTab)

let intervalId = setInterval(switchToNextTab, 4000)

tabsParent.addEventListener('mouseenter', () => {
    clearInterval(intervalId)
})

tabsParent.addEventListener('mouseleave', () => {
    intervalId = setInterval(switchToNextTab, 4000)
})

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item, i) => {
            if (item === event.target) {
                hideTabContent();
                currentTab = i;
                showTabContent(currentTab)
            }
        })
    }
}

//CONVERTER
const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const euro = document.querySelector('#euro')

const converter = (element, target, rate) => {
    element.addEventListener('input', () => {
        const request = new XMLHttpRequest()
        request.open("GET", "../data/converter.json")
        request.setRequestHeader("Content-type", "application/json")
        request.send()

        request.onload = () => {
            const response = JSON.parse(request.response)
            target.value = (element.value * response[rate]).toFixed(2)
            element.value === '' && (target.value = '')
        }
    })
}

converter(som, usd, "som")
converter(som, euro, "som")


converter(usd, som, "usd")
converter(usd, euro, 'usd_euro')

converter(euro, som, "euro")
converter(euro, usd, 'euro_usd')


//CARD SWITCHER
const card = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')

let count = 1

function fetchTask(taskId) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`)
        .then(response => response.json())
        .then(data => {
            card.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'greenyellow' : 'red'};">${data.completed}</p>
                <span>${data.id}</span>
            `
        })
}

function updateTask(direction) {
    if (direction === 'prev') {
        count = count === 1 ? 200 : count - 1
    } else if (direction === 'next') {
        count = count === 200 ? 1 : count + 1
    }
    fetchTask(count)
}
btnPrev.onclick = () => {
    updateTask('prev')
}
btnNext.onclick = () => {
    updateTask('next')
}
fetchTask(count)

//fetch запрос по ссылке
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })