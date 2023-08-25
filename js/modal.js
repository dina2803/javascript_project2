//MODAL

const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const closeModalButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

const openModalAfterDelay = () => {
    setTimeout(() => {
        openModal()
    }, 10000)
}

let isModalOpened = false

const showModalOnScroll = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrolled = window.scrollY

    if (!isModalOpened && windowHeight + scrolled >= documentHeight) {
        openModal()
        isModalOpened = true
        window.removeEventListener('scroll', showModalOnScroll)
    }
}

modalTrigger.onclick = () => openModal()
closeModalButton.onclick = () => closeModal()
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}

openModalAfterDelay()
window.addEventListener('scroll', showModalOnScroll)