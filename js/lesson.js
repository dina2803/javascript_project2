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