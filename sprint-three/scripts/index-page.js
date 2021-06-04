//all comments
// comments = [
//     {
//         fullName:"Connor Walton",
//         timestamp:"02/17/2021",
//         comment:"This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
//     },
//     {
//         fullName:"Emilie Beach",
//         timestamp:"01/09/2021",
//         comment:"I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
//     },
//     {
//         fullName:"Miles Acosta",
//         timestamp:"12/20/2020",
//         comment:"I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
//     }
// ]
// API call
apiKey = "41b2250c-5703-45b8-ae77-b9d83119b3d2"

const apiCall = () => {
axios
    .get(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`)
    .then(response => {
        displayComment(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}


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
const displayComment = (comments) => {
    //order commments by timestamp
    comments.sort((a,b) => {
        return b.timestamp - a.timestamp 
    })
    comments.forEach(comment => {
        //all new elements
        const commentBody = addEmptyElement("section", "comment__body")
        const commentCard = addEmptyElement("article", "comment__card")
        const avatar = addEmptyElement("div", "comment__avatar")
        const commentSubWrapper = addEmptyElement("div", "comment__sub-wrapper")
        let commentName = addElement("p","comment__name")
        let commentText = addElement("p", "comment__text")
        let commentDate = addElement("p", "comment__date")

        //set Date
        const fullDate = new Date(comment.timestamp)
        const year = fullDate.getFullYear()
        const month = ("0" + (fullDate.getMonth()+1)).slice(-2)
        const day = ("0" + fullDate.getDate()).slice(-2)
        const showDate = `${month}/${day}/${year}`

        //adding text
        commentName = commentName(comment.name)
        commentText = commentText(comment.comment)
        commentDate = commentDate(dateConvert(showDate))


        // adding all elements together
        commentSubWrapper.append(commentName, commentDate,commentText)
        commentCard.append(avatar, commentSubWrapper)
        commentBody.append(commentCard)
        commentWrapper.append(commentBody)
        })
}

//function for converting timestamp
const dateConvert = (date) => {
    const today = new Date()

    const pastMonth = Number(date.slice(0,2))-1
    const pastDay = Number(date.slice(3,5))
    const pastYear = Number(date.slice(6,10))
    const past = new Date(pastYear, pastMonth, pastDay)

    //calculate millisecond to day difference
    let difference = today.getTime() - past.getTime()
    difference = difference/(24*60*60*1000)
    
    if (difference < 1){
        return "today"
    } else {
        return `${parseInt(difference)} days ago`
    }

}

//Comment form
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
profile.alt = "photo of monha muruge"
nameLabel.htmlFor = "fullName"
nameBox.name = "fullName"
nameBox.placeholder = "Enter your name"
commentLabel.htmlFor = "comment"
commentBox.name = "comment"
commentBox.placeholder = "Add a new comment"
submit.type="submit"


//adding all elements together
avatar.append(profile)
inputWrapper.append(nameLabel,nameBox,commentLabel,commentBox,submit)
form.append(avatar,inputWrapper)
commentForm.append(form)
commentWrapper.append(header,commentForm)
commentcontainer.append(commentWrapper)
main.append(commentcontainer)

//form submit
document.querySelector(".form").addEventListener("submit",(e)=>{
    if (e.target.fullName.value && e.target.comment.value !== ""){
        e.preventDefault()
        //API call to add comment
        axios
            .post(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`,{
                name: e.target.fullName.value,
                comment: e.target.comment.value
            },{
            header:{
                "Content-Type": "application/json"
            } 
            })
            .then(response => {
                apiCall()
            })
            .catch(error => {
                console.log(error)
            })

        //removing all comments and display all comments
        document.querySelectorAll(".comment__body").forEach(element =>{
            element.remove()
        })
        
        //clearing form
        e.target.reset()
        
        
    } 
    else if (e.target.fullName.value === "" && e.target.comment.value === ""){
        e.preventDefault()
        console.log("both")
    }
    else if (e.target.fullName.value === ""){
        e.preventDefault()
        console.log("namered")
    }
    else if (e.target.comment.value === "") {
        e.preventDefault()
        console.log("comment")
    }
    
    
})

apiCall()