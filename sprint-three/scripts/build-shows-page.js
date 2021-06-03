//all data list
const dateList = ["Mon Sept 06 2021", "Tue Sept 21 2021", "Fri Oct 15 2021", "Sat Nov 06 2021", "Fri Nov 26 2021", "Wed Dec 15 2021"]
const venueList = [1,2,3,4,5,6]



//function for adding element
const addElement = (element, className) => {
    return (content) => {
        const el = document.createElement(element)
        el.className = className
        el.innerHTML = content
        return el
    }
}

//selecting body 
const main = document.querySelector('.main')

//adding title
let title = addElement("h2", "main__title")
title = title("Shows")
main.append(title)


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
titleContainer.append(dateTitle, venueTitle, locationTitle,lastBox)
mainBody.append(titleContainer)
main.append(mainBody)

//API call
apiKey = "41b2250c-5703-45b8-ae77-b9d83119b3d2"
axios.get(`https://project-1-api.herokuapp.com/showdates?api_key=${apiKey}`)
.then(response => {
    const showsList = response.data
    displayShows(showsList)
})
.catch(error => {
    console.log(error)
})

const displayShows = (showsList) =>{
    showsList.forEach(show => {
        //variable for new elements
        let infoCard = addElement('ul', "card")
        let dateTitle = addElement('li', "card__subtitle")
        let dateText = addElement('li', "card__date")
        let venueTitle = addElement('li', "card__subtitle")
        let venueText = addElement('li', "card__text")
        let locationTitle = addElement('li', "card__subtitle")
        let locationText = addElement('li', "card__text")
        let buyBtn = addElement('button', "button")

        //set Date
        const showDate = new Date(Number(show.date)).toDateString()

        //setting content
        infoCard = infoCard("")
        dateTitle = dateTitle("DATES")
        venueTitle = venueTitle("VENUE")
        locationTitle = locationTitle("LOCATION")
        locationText = locationText(show.location)
        dateText = dateText(showDate)
        venueText = venueText(show.place)
        buyBtn = buyBtn("BUY TICKETS")

        
        //adding all data to HTML
        infoCard.append(dateTitle,dateText,venueTitle,venueText,locationTitle,locationText,buyBtn)
        mainBody.append(infoCard)

        
    })
    document.querySelectorAll(".button").forEach(button => {
        button.addEventListener("click", (e) => buttonFunction(e))
    })
    
}

//button function
const buttonFunction = (e) => {
    const location = e.target.parentNode.querySelectorAll('.card__text')
    const address = ["Venue location: "]
    location.forEach(tag => {
        address.push(tag.textContent)
    })
    console.log(address.join(' '))
}

