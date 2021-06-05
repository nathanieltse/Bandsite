// API info
apiKey = "41b2250c-5703-45b8-ae77-b9d83119b3d2"
apiUrl = "https://project-1-api.herokuapp.com"

//API call
const apiCall = () => {
axios
    .get(`${apiUrl}/comments?api_key=${apiKey}`)
    .then(response => {
        displayComment(response.data)
    })
    .catch(error => {
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
    // remove all comments
    document.querySelectorAll(".comment__body").forEach(element =>{
        element.remove()
    })
    //order commments by timestamp
    comments.sort((a,b) => {
        return b.timestamp - a.timestamp 
    })
    //display all comments
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
        let commentLike = addElement("p","comment__like-count")
        

        //set Date
        const fullDate = new Date(comment.timestamp)
        const year = fullDate.getFullYear()
        const month = ("0" + (fullDate.getMonth()+1)).slice(-2)
        const day = ("0" + fullDate.getDate()).slice(-2)
        const showDate = `${month}/${day}/${year}`

        //add text
        commentBody.id = comment.id
        commentName = commentName(comment.name)
        commentText = commentText(comment.comment)
        commentDate = commentDate(dateConvert(showDate))
        commentLike = commentLike(`${comment.likes} likes`)

        //buttons
        deletebtn.dataset.comment=comment.id
        deleteIcon.src = "./assets/icons/icon-delete.svg"
        deleteIcon.alt = "delete icon"
        likebtn.dataset.comment=comment.id
        likeIcon.src = "./assets/icons/icon-like.svg"
        likeIcon.alt = "delete icon"


        // add all elements together
        deletebtn.append(deleteIcon)
        likebtn.append(likeIcon)
        commentSubWrapper.append(commentName, deletebtn, commentDate, commentText, likebtn, commentLike)
        commentCard.append(avatar, commentSubWrapper)
        commentBody.append(commentCard)
        commentWrapper.append(commentBody)
    })

    //delete function
    document.querySelectorAll(".comment__delete").forEach(button => {
        button.addEventListener("click",(e)=> {
            deleteComment(e)
        })
    })

    //like function
    document.querySelectorAll(".comment__like").forEach(button => {
        button.addEventListener("click",(e) =>{
            addLike(e)
        })
    })

    //add comment animation
    document.querySelector(".comment__card").classList.add("comment__body--new")

}
//if page reload do not play animation
window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector(".comment__card").classList.remove("comment__body--new")
    }, 100);
})

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

//add comment form

//select body 
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

//add text
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


//add all elements together
avatar.append(profile)
inputWrapper.append(nameLabel,nameBox,commentLabel,commentBox,submit)
form.append(avatar,inputWrapper)
commentForm.append(form)
commentWrapper.append(header,commentForm)
commentcontainer.append(commentWrapper)
main.append(commentcontainer)

//form state listener
const nameField = document.querySelector(".form__nameinput")
const commentField = document.querySelector(".form__commentinput")
document.querySelector(".form").addEventListener("keydown",() => {
    nameField.classList.remove("form__commentinput--invalid")
    commentField.classList.remove("form__commentinput--invalid")
})

//form submit
document.querySelector(".form").addEventListener("submit",(e)=>{
    e.preventDefault()
    //valid form
    if (e.target.fullName.value && e.target.comment.value !== ""){
        //API call to add comment
        axios
            .post(`${apiUrl}/comments?api_key=${apiKey}`,{
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
            })
            
        //clearing form
        e.target.reset()
    } 
    //invalid form
    else if (e.target.fullName.value === "" && e.target.comment.value === ""){
        nameField.classList.add("form__commentinput--invalid")
        commentField.classList.add("form__commentinput--invalid")
    }
    else if (e.target.fullName.value === ""){
        nameField.classList.add("form__commentinput--invalid")
    }
    else if (e.target.comment.value === "") {
        commentField.classList.add("form__commentinput--invalid")
    }
})
//delete function
const deleteComment = (e) => {
    const commentId = e.currentTarget.dataset.comment
    document.getElementById(commentId).classList.add("comment__body--ondelete")
    axios
        .delete(`${apiUrl}/comments/${commentId}?api_key=${apiKey}`)
        .then(response => {
        })
        .catch(error => {
        })
}
//add like function
const addLike = (e) => {
    const likeId = e.currentTarget.dataset.comment
    const likeCount = document.getElementById(`${likeId}`).querySelector("article > div > .comment__like-count")
    likeCount.innerHTML = `${Number(likeCount.innerHTML.split(" ")[0])+1} likes`
    axios
        .put(`${apiUrl}/comments/${likeId}/like?api_key=${apiKey}`)
        .then(response => {
        })
        .catch(error => {
        })
}
//call API onload
apiCall()