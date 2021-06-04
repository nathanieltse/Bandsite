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
    // removing all comments and display all comments
    document.querySelectorAll(".comment__body").forEach(element =>{
        element.remove()
    })
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
        const deletebtn = addEmptyElement("button", "comment__delete")
        const likebtn = addEmptyElement("button", "comment__like")
        const deleteIcon = addEmptyElement("img", "comment__delete-icon")
        const likeIcon = addEmptyElement("img","comment__like-icon")
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
        commentBody.id = comment.id
        commentName = commentName(comment.name)
        commentText = commentText(comment.comment)
        commentDate = commentDate(dateConvert(showDate))

        //buttons
        deletebtn.dataset.comment=comment.id
        deleteIcon.src = "./assets/icons/icon-delete.svg"
        deleteIcon.alt = "delete icon"
        likebtn.dataset.comment=comment.id
        likeIcon.src = "./assets/icons/icon-like.svg"
        likeIcon.alt = "delete icon"


        // adding all elements together
        deletebtn.append(deleteIcon)
        likebtn.append(likeIcon)
        commentSubWrapper.append(commentName, deletebtn, commentDate, commentText, likebtn)
        commentCard.append(avatar, commentSubWrapper)
        commentBody.append(commentCard)
        commentWrapper.append(commentBody)
    })
    //delete function
    document.querySelectorAll(".comment__delete").forEach(button => {
        button.addEventListener("click",(e)=> {
        deleteComment(e)
    })
    //add comment animation
    document.querySelector(".comment__card").classList.add("comment__body--new")
    
})
}

//function for converting timestamp to days
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

//adding comment form

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

//form state
const nameField = document.querySelector(".form__nameinput")
const commentField = document.querySelector(".form__commentinput")
document.querySelector(".form").addEventListener("keydown",() => {
    nameField.classList.remove("form__commentinput--invalid")
    commentField.classList.remove("form__commentinput--invalid")
})

//form submit
document.querySelector(".form").addEventListener("submit",(e)=>{
    //valid form
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
            
        //clearing form
        e.target.reset()
    } 
    //invalid form
    else if (e.target.fullName.value === "" && e.target.comment.value === ""){
        e.preventDefault()
        nameField.classList.add("form__commentinput--invalid")
        commentField.classList.add("form__commentinput--invalid")

    }
    else if (e.target.fullName.value === ""){
        e.preventDefault()
        nameField.classList.add("form__commentinput--invalid")
    }
    else if (e.target.comment.value === "") {
        e.preventDefault()
        commentField.classList.add("form__commentinput--invalid")
    }
    
})

const deleteComment = (e) => {
    const commentId = e.currentTarget.dataset.comment
    document.getElementById(commentId).classList.add("comment__body--ondelete")
    axios
        .delete(`https://project-1-api.herokuapp.com/comments/${commentId}?api_key=${apiKey}`)
        .then(response => {
        })
        .catch(error => {
            console.log(error)
        })
    
}
apiCall()