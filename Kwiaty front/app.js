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
    if (elementID === "flowerbed") {
        document.getElementById("flowerbed").style.display = 'block'
    }
}


localStorage.setItem('lang', 'en')
localStorage.setItem('token', '')
var page_id = 0

function swap_lang() {
    if (localStorage.getItem('lang') === "en") {
        localStorage.setItem('lang', 'PL')
        document.getElementById("l").textContent = "PL"
    } else {
        localStorage.setItem('lang', 'en')
        document.getElementById("l").textContent = "en"
    }
}

function get() {
    var idd = document.getElementById("flower_id").value;
    fetch('http://localhost:8080/api/product/' + idd, {
            method: 'GET',
            headers: {
                'Accept-Language': localStorage.getItem('lang'),
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            displayFlower(data, "flower")
        })
}

function put() {
    var name = document.getElementById("flower_name").value;
    var desc = document.getElementById("flower_desc").value;
    var price = document.getElementById("flower_price").value;
    fetch('http://localhost:8080/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body: JSON.stringify({
                categories: [
                    0
                ],
                descriptionEn: desc,
                descriptionPl: desc,
                images: [
                    0
                ],
                nameEn: name,
                namePl: name,
                price: price
            })
        })
        .then(res => { return res.json() })
        .then(data => console.log(data))
}



function displayFlower(data, id) {
    if (document.getElementById(id).innerHTML !== "") {
        document.getElementById(id).innerHTML = ""
    }
    if (data === null) {
        const flowerDiv = document.getElementById("flower");
        const heading = document.createElement("h2");
        if (localStorage.getItem('lang') === "en") heading.innerHTML = "There is no such flower"
        else heading.innerHTML = "Brak kwiatu"
        flowerDiv.appendChild(heading);
        return
    }
    let name, desc, rc
    if (data.name === null) {
        if (localStorage.getItem('lang') === "en") name = "No name set"
        else name = "Brak nazwy"
    } else name = data.name
    if (data.description === null) {
        if (localStorage.getItem('lang') === "en") desc = "No description set"
        else desc = "Brak opisu"
    } else desc = data.description
    if (data.price === null) {
        if (localStorage.getItem('lang') === "en") rc = "No price set"
        else rc = "Brak ceny"
    } else rc = data.price
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
}

function swap_page(id) {
    page_id = id
    const flowerDiv = document.getElementById("flowerbed");
    flowerDiv.innerHTML = ""
    FlowersMain()
}

function add_page_button(id) {
    const flowerDiv = document.getElementById("flowerbed");
    const page = document.createElement("button");
    page.id = "page_" + id
    page.className = "Page_button"
    page.innerHTML = "Page " + (id + 1)
    page.addEventListener('click',function(){swap_page(id)})
    flowerDiv.appendChild(page);
}

function FlowersMain() {
    const flowerDiv = document.getElementById("flowerbed");
    flowerDiv.innerHTML = ""
    fetch('http://localhost:8080/api/product/all/?page=' + page_id+'&sort='+document.getElementById("sorting").value, {
            method: 'GET',
            headers: {
                'Accept-Language': localStorage.getItem('lang'),
            }
        })
        .then(res => res.json())
        .then(data => {console.log(data); for (let i = 0; i < data.data.length; i++) { displayFlowersMain(data.data[i]) }for (let i = 0; i < ((data.count) / 10 ); i++) { add_page_button(i) } })
}

function displayFlowersMain(data) {
    let name, desc, rc, imag;
    console.log(data)
    if (data.name === null) {
        if (localStorage.getItem('lang') === "en") name = "No name set"
        else name = "Brak nazwy"
    } else name = data.name
    if (data.description === null) {
        if (localStorage.getItem('lang') === "en") desc = "No description set"
        else desc = "Brak opisu"
    } else desc = data.description
    if (data.price === null) {
        if (localStorage.getItem('lang') === "en") rc = "No price set"
        else rc = "Brak ceny"
    } else rc = data.price
    if (data.images.length === 0) imag = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F002%2F261%2F129%2Foriginal%2Fno-sign-empty-red-crossed-out-circle-not-allowed-sign-isolate-on-white-background-illustration-eps-10-free-vector.jpg&f=1&nofb=1"
    else imag = data.images[0].url
    const flowerDiv = document.getElementById("flowerbed");

    const flower = document.createElement("div");

    flower.className = "flowerbed"
    flower.id = data.id
    flower.onmouseover = function() { this.style.opacity = "100%" }
    flower.onmouseout = function() { this.style.opacity = "45%" }
    const imagd = document.createElement("img");
    const named = document.createElement("h3");
    const descd = document.createElement("p");
    const priced = document.createElement("p");
    const qnt= document.createElement("input")
    const add= document.createElement("button")

    imagd.src = imag;
    imagd.className = "FlowerImg"

    named.innerHTML = name;

    descd.innerHTML = desc;

    if (localStorage.getItem('lang') === "en") priced.innerHTML = rc + " PLN";
    else priced.innerHTML = rc + " ZL";

    qnt.type="number"
    qnt.id="FQ"+data.id;
    qnt.name="quantity"
    qnt.min=0
    qnt.defaultValue=0
    qnt.style="width: 50px"

    add.innerHTML="Add to cart"
    add.onclick=function(){add_to_cart(data.id)}


    flower.appendChild(named);
    flower.appendChild(imagd);
    flower.appendChild(descd);
    flower.appendChild(document.createElement("br"))
    flower.appendChild(priced);
    flower.appendChild(qnt);
    flower.appendChild(add);
    flowerDiv.appendChild(flower);


}

function register() {
    document.getElementById("Reg_res").innerHTML = ""
    var nam = document.getElementById("name").value;
    var surnam = document.getElementById("surname").value;
    var mail = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    var pass2 = document.getElementById("pass2").value;
    if (pass2 !== pass) {
        document.getElementById("Reg_res").className = "error"
        document.getElementById("Reg_res").innerHTML = "Passwords do not match!"
        return
    }

    fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: mail,
                name: nam,
                password: pass,
                surname: surnam
            })
        })
        .then(res => { return res.json() })
        .then(data => console.log(data))
    document.getElementById("Reg_res").className = "success"
    document.getElementById("Reg_res").innerHTML = "Registered"
    setTimeout(show, 3000, 'flowerbed')
}

function login1() {
    document.getElementById("Log_res").innerHTML = ""
    var mail = document.getElementById("lemail").value;
    var pass = document.getElementById("lpass").value;
    fetch('http://localhost:8080/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: mail,
                password: pass,
            })
        })
        .then(res => { return res.json() })
        .then(data => login2(data.jwt))

}
function login2(auth) {
    if(auth===undefined){
        document.getElementById("Log_res").className = "error"
        document.getElementById("Log_res").innerHTML = "Incorrect email or password!"
        return
    }
    console.log(auth)
    localStorage.setItem('token',auth)
    fetch('http://localhost:8080/auth/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }
    })
        .then(res => { return res.json() })
        .then(data => login3(data))

}
function login3(user){
    document.getElementById("Log_res").className = "success"
    document.getElementById("Log_res").innerHTML = "Logged in"
    document.getElementById('auth').style.display = 'none'
    document.getElementById('Greeting').innerHTML="Hello "+user.name + ' '+ user.surname+'!'
    document.getElementById('auth2').style.display = 'block'
    setTimeout(show, 3000, 'flowerbed')
}

function logout() {
    localStorage.setItem('token', '')
    document.getElementById('auth').style.display = 'block'
    document.getElementById('auth2').style.display = 'none'
    setTimeout(show, 3000, 'flowerbed')
}

function show_menu() {
    const menu = document.getElementById("main");
    if (menu.style.display === 'block') menu.style.display = 'none';
    else if (menu.style.display === 'none') menu.style.display = 'block';

}

function get_cart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = ""
    if (localStorage.getItem('token') !== '') {
        fetch('http://localhost:8080/cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept-Language': localStorage.getItem('lang')
            }
        })
            .then(res => {
                return res.json()
            })
            //.then(data => function (){if(data)})
            .then(data => {
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        displaycart(data[i])
                    }
                    const clear = document.createElement("button")
                    clear.innerHTML = "Clear Cart"
                    clear.onclick = function (){clear_cart()}
                    cartDiv.appendChild(clear);
                    cartDiv.appendChild(document.createElement("br"))
                    const exit = document.createElement("button")
                    exit.textContent = "Back"
                    exit.onclick=function () {show('flowerbed')}
                    cartDiv.appendChild(exit);
                } else {
                    cartDiv.innerHTML = "Cart is empty";
                    cartDiv.appendChild(document.createElement("br"))
                    const exit = document.createElement("button")
                    exit.textContent = "Back"
                    exit.onclick=function () {show('flowerbed')}
                    cartDiv.appendChild(exit);
                }
            })
    }
    else{
        document.getElementById("cart").innerHTML = "Not Logged In";
        document.getElementById("cart").appendChild(document.createElement("br"))
        const exit = document.createElement("button")
        exit.textContent = "Back"
        exit.onclick=function () {show('flowerbed')}
        cartDiv.appendChild(exit);
    }
}


function add_to_cart(id){
    fetch('http://localhost:8080/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token'),
        },
        body: JSON.stringify({
            product: id,
            quantity: document.getElementById(("FQ"+id)).value
        })
    })
        .then(res => { return res.json() })
}
function displaycart(data){
    let name, desc, rc, imag;
    if (data.product.name === null) {
        if (localStorage.getItem('lang') === "en") name = "No name set"
        else name = "Brak nazwy"
    } else name = data.product.name
    if (data.product.description === null) {
        if (localStorage.getItem('lang') === "en") desc = "No description set"
        else desc = "Brak opisu"
    } else desc = data.product.description
    if (data.product.price === null) {
        if (localStorage.getItem('lang') === "en") rc = "No price set"
        else rc = "Brak ceny"
    } else rc = data.product.price
    if (data.product.images.length === 0) imag = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F002%2F261%2F129%2Foriginal%2Fno-sign-empty-red-crossed-out-circle-not-allowed-sign-isolate-on-white-background-illustration-eps-10-free-vector.jpg&f=1&nofb=1"
    else imag = data.product.images[0].url
    const cartdiv = document.getElementById("cart");

    const flower = document.createElement("div");

    flower.className = "flowerbed"
    flower.id = data.product.id
    flower.onmouseover = function() { this.style.opacity = "100%" }
    flower.onmouseout = function() { this.style.opacity = "45%" }
    const imagd = document.createElement("img");
    const named = document.createElement("h3");
    const descd = document.createElement("p");
    const priced = document.createElement("p");
    const del = document.createElement("button")


    imagd.src = imag;
    imagd.className = "FlowerImg"

    named.innerHTML = data.quantity+"x"+name;

    descd.innerHTML = desc;

    del.innerHTML="Remove from cart"
    del.onclick=function(){remove_from_cart(data.product.id);get_cart()}

    if (localStorage.getItem('lang') === "en") priced.innerHTML=rc +"( "+data.quantity*rc+") " +" PLN";
    else priced.innerHTML = rc +"( "+data.quantity*rc+") " +" ZL";



    flower.appendChild(named);
    flower.appendChild(imagd);
    flower.appendChild(descd);
    flower.appendChild(document.createElement("br"))
    flower.appendChild(priced);
    flower.appendChild(del)
    cartdiv.appendChild(flower);
}

function remove_from_cart(id){
    fetch('http://localhost:8080/cart/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token'),
        },
    })
        .then(res => { return res.json() })
        .then(()=>get_cart())
}

function clear_cart(){
    fetch('http://localhost:8080/cart/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token'),
        },
    })
        .then(res => { return res.text() })
        .then(()=>get_cart())
}
