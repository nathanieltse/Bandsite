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

//selecting body 
const main = document.querySelector('.main')

//variable for new elements
let commentcontainer = addEmptyElement("section", "comment")
let wrapper = addEmptyElement("div", "comment__wrapper")
let header = addElement("h2", "comment__title")
let commentBody = addEmptyElement("section", "comment__body")
let form = addEmptyElement("form", "form")
let avatar = addEmptyElement("div", "form__avatar")
let profile = addEmptyElement("img","form__profile")
let inputWrapper = addEmptyElement("div", "form__wrapper")
let nameLabel = addElement("label", "form__label")
let nameBox = addEmptyElement("input", "form__nameinput")
let commentLabel = addElement("label","form__label")
let commentBox = addEmptyElement("textarea", "form__commentinput")
let submit = addElement("button","form__submit")

//add text
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
commentBody.append(form)
wrapper.append(header,commentBody)
commentcontainer.append(wrapper)
main.append(commentcontainer)

//all comments
comments.forEach(comment => {
    //all new elements
});

