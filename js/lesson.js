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

// TAB SLIDER
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
                hideTabContent()
                currentTab = i
                showTabContent(currentTab)
            }
        })
    }
}

// CONVERTER
const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const euro = document.querySelector('#euro')

const fetchData = async (rate) => {
    try {
        const response = await fetch("../data/converter.json")
        const data = await response.json()
        return data[rate]
    } catch (error) {
        console.error('Произошла ошибка:', error)
        return null
    }
}

const converter = async (element, target, rate) => {
    element.addEventListener('input', async () => {
        const rateValue = await fetchData(rate);
        if (rateValue !== null) {
            target.value = (element.value * rateValue).toFixed(2)
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

// CARD SWITCHER
const card = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')

let count = 1

const fetchTask = async (taskId) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`)
        const data = await response.json()

        card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'greenyellow' : 'red'};">${data.completed}</p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        console.error('Произошла ошибка:', error)
    }
}

const updateTask = (direction) => {
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

// Fetch запрос по ссылке
const fetchDataFromLink = async (link) => {
    try {
        const response = await fetch(link)
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error('Произошла ошибка:', error)
    }
}

fetchDataFromLink('https://jsonplaceholder.typicode.com/posts')

// WEATHER API
const cityName = document.querySelector('.cityName')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const apiKey = 'e417df62e04d3b1b111abeab19cea714'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const citySearch = () => {
    cityName.oninput = async (event) => {
        try {
            const response = await fetch(`${baseUrl}?q=${event.target.value}&appid=${apiKey}`)
            const data = await response.json();

            city.innerHTML = data?.name ? data?.name : 'Город не найден..'
            temp.innerHTML = data?.main?.temp ? `${Math.round(data.main.temp - 273)}&deg;C` : '...'
        } catch (error) {
            console.error('Произошла ошибка:', error)
        }
    }
}
citySearch()