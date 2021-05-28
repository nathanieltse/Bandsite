//all comments
comments = [
    {
        fullName:"Connor Walton",
        date:"02/17/2021",
        comment:"This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    },
    {
        fullName:"Emilie Beach",
        date:"01/09/2021",
        comment:"I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    },
    {
        fullName:"Miles Acosta",
        date:"12/20/2020",
        comment:"I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    }
]

//function for adding element
const addElement = (element, className) => {
    return (content) => {
        const el = document.createElement(element)
        el.className = className
        el.innerHTML = content
        return el
    }
}

const addEmptyElement = (element, className) => {
    const el = document.createElement(element)
    el.className = className
    return el
}

//function for displaying comment
const displayComment = (comment) => {
    //all new elements
    const commentBody = addEmptyElement("section", "comment__body")
    const commentCard = addEmptyElement("article", "comment__card")
    const avatar = addEmptyElement("div", "comment__avatar")
    const commentSubWrapper = addEmptyElement("div", "comment__sub-wrapper")
    let commentName = addElement("p","comment__name")
    let commentText = addElement("p", "comment__text")
    let commentDate = addElement("p", "comment__date")

    //adding text
    commentName = commentName(comment.fullName)
    commentText = commentText(comment.comment)
    commentDate = commentDate(dateConvert(comment.date))

    // adding all elements
    commentSubWrapper.append(commentName, commentDate,commentText)
    commentCard.append(avatar, commentSubWrapper)
    commentBody.append(commentCard)
    commentWrapper.append(commentBody)

}

//function for convert date
const dateConvert = (date) => {
    const today = new Date()

    const pastMonth = Number(date.slice(0,2))-1
    const pastDay = Number(date.slice(3,5))
    const pastYear = Number(date.slice(6,10))
    const past = new Date(pastYear,pastMonth, pastDay)

    //calculate millisecond to day difference
    let difference = today.getTime() - past.getTime()
    difference = difference/(24*60*60*1000)

    if (difference < 1 ){
        return "Today"
    } else {
        return `${parseInt(difference)} days ago`
    }

}




//selecting body 
const main = document.querySelector('.main')

//variable for new elements
const commentcontainer = addEmptyElement("section", "comment")
const commentWrapper = addEmptyElement("div", "comment__wrapper")
const commentForm = addEmptyElement("section", "comment__form")
const form = addEmptyElement("form", "form")
const avatar = addEmptyElement("div", "form__avatar")
const profile = addEmptyElement("img","form__profile")
const inputWrapper = addEmptyElement("div", "form__wrapper")
const nameBox = addEmptyElement("input", "form__nameinput")
const commentBox = addEmptyElement("textarea", "form__commentinput")
let header = addElement("h2", "comment__title")
let nameLabel = addElement("label", "form__label")
let commentLabel = addElement("label","form__label")
let submit = addElement("button","form__submit")

//adding text
header = header("Join the Conversation")
nameLabel = nameLabel("NAME")
commentLabel = commentLabel("COMMENT")
submit = submit("COMMENT")

//all attributes
profile.src = "./assets/images/Mohan-muruge.jpg"
profile.alt = "photot of monha muruge"
nameLabel.htmlFor = "fullName"
nameBox.name = "fullName"
nameBox.placeholder = "Enter your name"
nameBox.required = true
commentLabel.htmlFor = "comment"
commentBox.name = "comment"
commentBox.placeholder = "Add a new comment"
commentBox.required = true
submit.type="submit"


//adding all elements
avatar.append(profile)
inputWrapper.append(nameLabel,nameBox,commentLabel,commentBox,submit)
form.append(avatar,inputWrapper)
commentForm.append(form)
commentWrapper.append(header,commentForm)
commentcontainer.append(commentWrapper)
main.append(commentcontainer)

//all comments
comments.forEach(comment => {
    displayComment(comment)
});


//form submit
document.querySelector(".form").addEventListener("submit",(e)=>{
    e.preventDefault()
    //date contructor
    const today = new Date()
    const month = ("0" + (today.getMonth()+1)).slice(0,2)
    //adding data to array
    comments.unshift({
        fullName: e.target.fullName.value,
        date:`${month}/${today.getDate()}/${today.getFullYear()}`,
        comment: e.target.comment.value
    })
    //reload all comments and add new comment
    document.querySelectorAll(".comment__body").forEach(element =>{
        element.remove()
    })
    comments.forEach(comment => {
        displayComment(comment)
    });
    document.querySelector(".comment__card").classList.add("comment__body--new")
    const newElProfile = addEmptyElement("img","form__profile")
    document.querySelector(".comment__card .comment__avatar").append(newElProfile)
    newElProfile.src = "./assets/images/Mohan-muruge.jpg"
    newElProfile.alt = "photot of monha muruge"

    //clear form
    e.target.reset()
    
})
