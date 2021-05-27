//all data list
let dateList = ["Mon Sept 06 2021", "Tue Sept 21 2021", "Fri Oct 15 2021", "Sat Nov 06 2021", "Fri Nov 26 2021", "Wed Dec 15 2021"]
let venueList = ["Ronald Lane", "Pier 3 East", "View Lounge", "Hyatt Agency", "Moscow Center", "Press Club"]


//function for adding element
const addElement = (element, className) => {
    return (content) => {
        const el = document.createElement(element)
        el.className = className
        el.innerHTML = content
        return el
    }
}

const appendElement = (parentElment, child) => {
    child.forEach(element => {
        parentElment.append(element)
    })
}

//selecting body 
const main = document.querySelector('.main')

//adding title
let title = addElement("h2", "main__title")
title = title("Shows")
appendElement(main, [title])


//subtitle for tablet and desktop
let mainBody = addElement("section", "main__body")
let titleContainer = addElement("ul", "main__tablet-subtitle-box")
let dateTitle = addElement("li", "main__tablet-subtitle")
let venueTitle = addElement("li", "main__tablet-subtitle")
let locationTitle = addElement("li", "main__tablet-subtitle")
let lastBox = addElement("li", "main__tablet-subtitle")

//set default text
mainBody = mainBody("")
titleContainer = titleContainer("")
dateTitle = dateTitle("DATES")
venueTitle =venueTitle("VENUE")
locationTitle = locationTitle("LOCATION")
lastBox = lastBox("")


//add all elements to container
appendElement(titleContainer, [dateTitle, venueTitle, locationTitle,lastBox])
appendElement(mainBody, [titleContainer])
appendElement(main, [mainBody])

dateList.forEach((element, index) => {

    //variable for new elements
    let infoCard = addElement('ul', "card")
    let dateTitle = addElement('li', "card__subtitle")
    let dateText = addElement('li', "card__date")
    let venueTitle = addElement('li', "card__subtitle")
    let venueText = addElement('li', "card__text")
    let locationTitle = addElement('li', "card__subtitle")
    let locationText = addElement('li', "card__text")
    let buyBtn = addElement('button', "button")

    //setting content
    infoCard = infoCard("")
    dateTitle = dateTitle("DATES")
    venueTitle = venueTitle("VENUE")
    locationTitle = locationTitle("LOCATION")
    locationText = locationText("San Francisco, CA")
    buyBtn = buyBtn("BUY TICKETS")
    dateText = dateText(dateList[index])
    venueText = venueText(venueList[index])

    //adding all data to HTML
    
    appendElement(infoCard,[dateTitle,dateText,venueTitle,venueText,locationTitle,locationText,buyBtn])
    appendElement(mainBody, [infoCard])

})

//button function
document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", (e) => buttonFunction(e))
})

const buttonFunction = (e) => {
    const location = e.target.parentNode.querySelectorAll('.card__text')
    const address = ["Venue location: "]
    location.forEach(tag => {
        address.push(tag.textContent)
    })
    console.log(address.join(' '))
}

