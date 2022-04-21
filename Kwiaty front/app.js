
function show(elementID) {
    const ele = document.getElementById(elementID);
    if (!ele) {
        alert("no such element");
        return;
    }

    var pages = document.getElementsByClassName('page');
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    ele.style.display = 'block';
}


localStorage.setItem('lang','en')
localStorage.setItem('auth','')
function swap_lang(){
    if(localStorage.getItem('lang')==="en") {
        localStorage.setItem('lang','pl')
        document.getElementById("l").textContent="pl"
    }
    else {
        localStorage.setItem('lang','en')
        document.getElementById("l").textContent="en"
    }
    Flowers()
}

function get(){
    var idd=document.getElementById("flower_id").value;
    fetch('http://localhost:8080/api/product/'+idd,{method:'GET',headers:{
            'Accept-Language': localStorage.getItem('lang'),
        }})
        .then(res => res.json())
        .then(data=>{console.log(data);displayFlower(data,"flower")})
}

function put(){
    var name=document.getElementById("flower_name").value;
    var desc=document.getElementById("flower_desc").value;
    var price=document.getElementById("flower_price").value;
    fetch('http://localhost:8080/api/product',{method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')
        },
        body: JSON.stringify({
            descriptionEn: desc,
            nameEn: name,
            price: price
        })
    })
        .then(res => {return res.json()})
        .then(data=>console.log(data))
}


function displayFlowers(data) {
    let name,desc,rc
    if(data.name===null) {
        if(localStorage.getItem('lang')==="en") name = "No name set"
        else name = "Brak nazwy"
    }
    else  name = data.name
    if(data.description===null) {
        if(localStorage.getItem('lang')==="en")  desc = "No description set"
        else desc = "Brak opisu"
    }
    else desc=data.description
    if(data.price===null) {
        if(localStorage.getItem('lang')==="en") rc = "No price set"
        else rc="Brak ceny"
    }
    else rc=data.price
    const flowerDiv = document.getElementById("flower3");
    const heading = document.createElement("h3");
    heading.innerHTML = name
    flowerDiv.appendChild(heading);
    const descr = document.createElement("p");
    descr.innerHTML = desc;
    flowerDiv.appendChild(descr);
    flowerDiv.appendChild(document.createElement("br"))
    const prc = document.createElement("p");
    prc.innerHTML = rc;
    flowerDiv.appendChild(prc);
    flowerDiv.appendChild(document.createElement("br"))
    flowerDiv.appendChild(document.createElement("br"))
}

function displayFlower(data,id) {
    if(document.getElementById(id).innerHTML!==""){
        document.getElementById(id).innerHTML=""
    }
    if(data===null){
        const flowerDiv = document.getElementById("flower");
        const heading = document.createElement("h2");
        if(localStorage.getItem('lang')==="en") heading.innerHTML = "There is no such flower"
        else heading.innerHTML = "Brak kwiatu"
        flowerDiv.appendChild(heading);
        return
    }
    let name,desc,rc
    if(data.name===null) {
        if(localStorage.getItem('lang')==="en") name = "No name set"
        else name = "Brak nazwy"
    }
    else  name = data.name
    if(data.description===null) {
        if(localStorage.getItem('lang')==="en")  desc = "No description set"
        else desc = "Brak opisu"
    }
    else desc=data.description
    if(data.price===null) {
        if(localStorage.getItem('lang')==="en") rc = "No price set"
        else rc="Brak ceny"
    }
    else rc=data.price
    const flowerDiv = document.getElementById("flower");
    const heading = document.createElement("h2");
    heading.innerHTML = name
    flowerDiv.appendChild(heading);
    const descr = document.createElement("p");
    descr.innerHTML = desc;
    flowerDiv.appendChild(descr);
    flowerDiv.appendChild(document.createElement("br"))
    const prc = document.createElement("p");
    prc.innerHTML = rc;
    flowerDiv.appendChild(prc);
    flowerDiv.appendChild(document.createElement("br"))
}

function Flowers(){
    const flowerDiv = document.getElementById("flower3");
    flowerDiv.innerHTML=""
    fetch('http://localhost:8080/api/product/all',{method:'GET',headers:{
            'Accept-Language': localStorage.getItem('lang'),
        }})
        .then(res => res.json())
        .then(data=>{console.log(data);for(let i=0; i<data.length;i++){displayFlowers(data[i])}})
}

function register(){
    document.getElementById("Reg_res").innerHTML=""
    var nam=document.getElementById("name").value;
    var surnam=document.getElementById("surname").value;
    var mail=document.getElementById("email").value;
    var pass=document.getElementById("pass").value;
    var pass2=document.getElementById("pass2").value;
    if(pass2!==pass){
        document.getElementById("Reg_res").className="error"
        document.getElementById("Reg_res").innerHTML="Passwords do not match!"
        return
    }

    fetch('http://localhost:8080/auth/register',{method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: mail,
            name: nam,
            password: pass,
            surname: surnam
        })
    })
        .then(res => {return res.json()})
        .then(data=>console.log(data))
    document.getElementById("Reg_res").className="success"
    document.getElementById("Reg_res").innerHTML="Registered"
    setTimeout(show, 3000,'main')
}

function login(){
    document.getElementById("Log_res").innerHTML=""
    var mail=document.getElementById("lemail").value;
    var pass=document.getElementById("lpass").value;
    fetch('http://localhost:8080/auth/authenticate',{method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: mail,
            password: pass,
        })
    })
        .then(res => {return res.json()})
        .then(data=>localStorage.setItem('auth',data.jwt))
    document.getElementById("Log_res").className="success"
    document.getElementById("Log_res").innerHTML="Logged in"
    document.getElementById('auth').style.display = 'none'
    document.getElementById('auth2').style.display = 'block'
    setTimeout(show, 3000,'main')
}

function logout(){
    localStorage.setItem('auth','')
    document.getElementById('auth').style.display = 'block'
    document.getElementById('auth2').style.display = 'none'
    setTimeout(show, 3000,'main')
}