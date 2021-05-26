//all data list
let dateList = ["Mon Sept 06 2021", "Tue Sept 21 2021", "Fri Oct 15 2021", "Sat Nov 06 2021", "Fri Nov 26 2021", "Wed Dec 15 2021"]
let venueList = ["Ronald Lane", "Pier 3 East", "View Lounge", "Hyatt Agency", "Moscow Center", "Press Club"]

//adding title
const main = document.querySelector('.main')
const title = document.createElement('h2')
title.innerText = "Shows"
title.className="main__title"
main.append(title)

//subtitle for tablet and desktop
const mainBody = document.createElement('section')
const titleContainer = document.createElement('section')
const dateTitle = document.createElement('p')
const venueTitle = document.createElement('p')
const locationTitle = document.createElement('p')
const lastBox = document.createElement('p')

//set default text
dateTitle.innerText = "DATES"
venueTitle.innerText = "VENUE"
locationTitle.innerText = "LOCATION"
lastBox.innerText = ""

//set class names
mainBody.className = "main__body"
titleContainer.className = "main__tablet-subtitle-box"
dateTitle.className = "main__tablet-subtitle"
venueTitle.className = "main__tablet-subtitle"
locationTitle.className = "main__tablet-subtitle"
lastBox.className = "main__tablet-subtitle"


//add all elements to container
titleContainer.append(dateTitle, venueTitle, locationTitle,lastBox)
mainBody.append(titleContainer)
main.append(mainBody)


for(let i= 0; i < dateList.length; i++){

    //variable for new elements
    const infoCard = document.createElement('article')
    const dateTitle = document.createElement('p')
    const dateText = document.createElement('p')
    const venueTitle = document.createElement('p')
    const venueText = document.createElement('p')
    const locationTitle = document.createElement('p')
    const locationText = document.createElement('p')
    const buyBtn = document.createElement('button')

    //setting default value
    dateTitle.innerText = "DATES"
    venueTitle.innerText = "VENUE"
    locationTitle.innerText = "LOCATION"
    locationText.innerText = "San Francisco, CA"
    buyBtn.innerHTML = "BUY TICKETS"

    //setting class for all variables
    infoCard.className = "card"
    dateTitle.className = "card__subtitle"
    dateText.className = "card__date"
    venueTitle.className = "card__subtitle"
    venueText.className = "card__text"
    locationTitle.className = "card__subtitle"
    locationText.className = "card__text"
    buyBtn.className = "button"

    //adding all data to HTML
    dateText.innerText = dateList[i]
    venueText.innerText = venueList[i]
    infoCard.append(dateTitle,dateText,venueTitle,venueText,locationTitle,locationText,buyBtn);
    mainBody.append(infoCard)
}

