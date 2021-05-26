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
let titleContainer = addElement("section", "main__tablet-subtitle-box")
let dateTitle = addElement("p", "main__tablet-subtitle")
let venueTitle = addElement("p", "main__tablet-subtitle")
let locationTitle = addElement("p", "main__tablet-subtitle")
let lastBox = addElement("p", "main__tablet-subtitle")

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
    let infoCard = addElement('section', "card")
    let dateTitle = addElement('p', "card__subtitle")
    let dateText = addElement('p', "card__date")
    let venueTitle = addElement('p', "card__subtitle")
    let venueText = addElement('p', "card__date")
    let locationTitle = addElement('p', "card__subtitle")
    let locationText = addElement('p', "card__date")
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



