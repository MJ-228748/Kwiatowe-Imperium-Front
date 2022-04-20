
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
function create_lang() {
    var button = document.createElement('button');
    button.textContent = localStorage.getItem('lang');
    button.setAttribute('id', 'l');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'language');
    button.setAttribute('onclick', 'swap_lang()');
    document.getElementById('1').appendChild(button);
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
            'Authorization': 'Login to do, for now just paste your own'
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
    const prc = document.createElement("p");
    prc.innerHTML = rc;
    flowerDiv.appendChild(prc);
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
    const prc = document.createElement("p");
    prc.innerHTML = rc;
    flowerDiv.appendChild(prc);
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