let card = document.querySelector(".body");
let addPost = document.querySelector(".form");
let nameValue = document.getElementById("name");
let emailValue = document.getElementById("email");
let positionValue = document.getElementById("position");
let phoneValue = document.getElementById("phone");
let imageValue = document.getElementById("image");
let button = document.querySelector(".button")


let url = "http://localhost:3000/users";
async function school(someData) {
    let data = await (await fetch(url)).json()
    someData(data)
}

school(someData)
//GET METHOD
function someData(data) {
    data.forEach((e) => {
        card.innerHTML += `
        <div class="card" style="width: 18rem;" >
        <div class="card-body" data-id="${e.id}" >
        <h5 class="card-title">${e.name}</h5>
        <p class="card-text">${e.email}</p>
        <p class="card-textpos">${e.position}</p>
        <p class="card-textpho">${e.phone}</p>
        <button href="" class="btn btn-primary " id="delete">Delete</button>
        <button href="" class="btn btn-primary" id="edit">Edit</button>
        </div>`
    })
}

//POST METHOD
addPost.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameValue.value,
            email: emailValue.value,
            position: positionValue.value,
            phone: phoneValue.value,
        })
    })
        .then(res => res.json())
        .then(data => {
            let dataArr = [];
            dataArr.push(data);
            someData(dataArr)
        })
})


//DELETE AND UPDATE  METHOD
card.addEventListener("click", (e) => {
    e.preventDefault()
    let deletePress = e.target.id == "delete"
    let editPress = e.target.id == "edit"
    let id = e.target.parentElement.dataset.id;
    if (deletePress) {
        fetch(`${url}/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(() => location.reload())
    }

    if (editPress) {
        let parent = e.target.parentElement;
        let titleName = parent.querySelector(".card-title").textContent;
        let email = parent.querySelector(".card-text").textContent;
        let posit = parent.querySelector(".card-textpos").textContent;
        let pho = parent.querySelector(".card-textpho").textContent;

        nameValue.value = titleName;
        emailValue.value = email;
        positionValue.value = posit;
        phoneValue.value = pho;
    }
    button.addEventListener("click", (e) => {
        e.preventDefault()
        fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nameValue.value,
                email: emailValue.value,
                position: positionValue.value,
                phone: phoneValue.value,
            })
        })
            .then(res => res.json())
            .then(() => location.reload())

    })
})


