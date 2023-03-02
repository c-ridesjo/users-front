//imports, globala variabler och funktioner - den ordningen uppifrån och ned
let userList = document.getElementById("userList");
let newUser = document.getElementById("newUser");
let saveUserBtn = document.getElementById("saveUserBtn");


fetch("http://localhost:3000/users")    //hämtar datan. (Det här är en GET-fetch.)
.then(res => res.json())                
.then(data => {
    //console.log(data);
    printUsers(data);        //när datan är hämtad anropas den här funktionen
});

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
    let user = {name: newUser.value, password: newUser.value};
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
        print.user(data);
    });    
})