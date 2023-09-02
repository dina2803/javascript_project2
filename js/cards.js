// async await
async function fetchCards() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (!response.ok) {
            throw new Error('Ошибка')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

async function renderCards() {
    const cardContainer = document.querySelector('.card-container')
    const cardsData = await fetchCards()

    cardsData.forEach((card, index) => {
        const cardElement = document.createElement('div')
        cardElement.classList.add('card')
        cardElement.innerHTML = `
            <h2>${index + 1}. ${card.title}</h2>
            <p>${card.body}</p>
        `
        cardElement.addEventListener('mouseenter', () => {
            cardElement.classList.add('highlighted-card')
        })
        cardElement.addEventListener('mouseleave', () => {
            cardElement.classList.remove('highlighted-card')
        })
        cardContainer.appendChild(cardElement)
    })
}

window.onload = () => {
    renderCards()
}