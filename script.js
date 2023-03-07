//imports, globala variabler och funktioner - den ordningen uppifrån och ned
let userList = document.getElementById("userList");
let newUser = document.getElementById("newUser");
let newUserPassword = document.getElementById("newUserPassword");
let saveUserBtn = document.getElementById("saveUserBtn");
let loginUsername = document.getElementById("loginUsername");
let loginPassword = document.getElementById("loginPassword");
let loginUserBtn = document.getElementById("loginUserBtn");
let logoutUserBtn = document.getElementById("logoutUserBtn");
let loginMessage = document.getElementById("loginMessage");

fetch("http://localhost:3000/users")    //hämtar datan. (Det här är en GET-fetch.)
.then(res => res.json())                
.then(data => {
    //console.log(data);
    printUsers(data);        //när datan är hämtad anropas den här funktionen
});

let loggedInUser = localStorage.getItem("username");
if(loggedInUser) {
    loginMessage.innerText ="Welcome!" + loggedInUser;
}

function printUsers(users) {
    console.log(users);

    userList.innerHTML = "";

    users.map(user => {
        let li = document.createElement("li")  //skapar html-element
        li.id = user.id;            //lägger till attribut till html-elementet
        li.innerText = user.name;
        userList.appendChild(li);   //metod att använda till elementet userList
    });
}

saveUserBtn.addEventListener("click", () => {

    //skapa en ny användare
    let user = {name: newUser.value, password: newUserPassword.value};
    console.log(user);

    //skicka till servern
    fetch("http://localhost:3000/users", {
    method: "POST",         //hämtar datan. (Det här är en POST-fetch.)
    headers: {
        "Content-Type": "application/json",        
    },
    body: JSON.stringify(user)      //body är det paketet som vi skickar
    })    
    .then(res => res.json())                
    .then(data => {
        printUsers(data);
    });    

    newUser.value = "";
    newUserPassword.value = "";
});

loginUserBtn.addEventListener("click", () => {

    //skapa en ny användare
    let loginUser = {
        name: loginUsername.value, 
        password: loginPassword.value
    }
    
    console.log(loginUser);

    //skicka till servern
    fetch("http://localhost:3000/users/login", {
    method: "POST",         //hämtar datan. (Det här är en POST-fetch.)
    headers: {
        "Content-Type": "application/json",        
    },
    body: JSON.stringify(loginUser)      //body är det paketet som vi skickar
    })    
    .then(res => res.json())                
    .then(data => {
        console.log(data);
        
        if(data.name) {
            loginMessage.innerText=`Welcome! ` + data.name;
            localStorage.setItem("username", data.name);
         } 
         else {
            loginMessage.innerText=`Incorrect username or password! Try again!`;
        }
    });
    loginUsername.value = "";
    loginPassword.value = "";
});

logoutUserBtn.addEventListener("click", () => {
    localStorage.removeItem("username");
    loginMessage.innerText = "You have been logged out!"
});