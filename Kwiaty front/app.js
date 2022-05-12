function show(elementID) {
    document.getElementById("Log_res").innerHTML = ""
    document.getElementById("lemail").value="";
    document.getElementById("lpass").value="";
    if (document.getElementById("flower").innerHTML !== "") {
        document.getElementById("flower").innerHTML = ""
    }
    document.getElementById("flower_id").value="";
    document.getElementById("lpass").value="";
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
        document.getElementById("l").textContent = "pl"
        document.getElementById("r").textContent ="Zarejestruj"
        document.getElementById("log").textContent ="Zaloguj"
        document.getElementById("menu1").textContent ="Znajdz przez ID"
        document.getElementById("menu2").textContent ="Dodaj nowy kwiat"
        document.getElementById("FindID1").innerHTML ="Podaj ID kwiatu"
        document.getElementById("b1").textContent ="Wyszukaj"
        document.getElementById("FindID2").textContent ="Powrot"
        document.getElementById("AddF1").innerHTML ="Podaj Nazwe Kwiatu"
        document.getElementById("AddF2").innerHTML ="Podaj opis Kwiatu"
        document.getElementById("AddF3").innerHTML ="Podaj cene kwiatu"
        document.getElementById("b2").textContent ="Dodaj"
        document.getElementById("AddF4").textContent ="Powrot"
        document.getElementById("register1").innerHTML ="Imie"
        document.getElementById("register2").innerHTML ="Nazwisko"
        document.getElementById("register3").innerHTML ="Email"
        document.getElementById("register4").innerHTML ="Haslo"
        document.getElementById("register5").innerHTML ="Potwierdz haslo"
        document.getElementById("reg").textContent ="Zarejestruj"
        document.getElementById("register6").textContent ="Powrot"
        document.getElementById("login1").innerHTML ="Email"
        document.getElementById("login2").innerHTML ="Haslo"
        document.getElementById("log2").textContent ="Zaloguj"
        document.getElementById("login3").textContent ="Powrot"
        document.getElementById("cartb").textContent ="Koszyk"
        document.getElementById("out").textContent ="Wyloguj"
        document.getElementById("sorting").innerHTML=""
        var option1=document.createElement("option")
        option1.value="id"
        option1.text="Domyslny"
        var option2=document.createElement("option")
        option2.value="price"
        option2.text="Cena"
        var option3=document.createElement("option")
        option3.value="namePl"
        option3.text="Nazwa"
        var option4=document.createElement("option")
        option4.value="categories"
        option4.text="Kategoria"
        document.getElementById("sorting").appendChild(option1)
        document.getElementById("sorting").appendChild(option2)
        document.getElementById("sorting").appendChild(option3)
        document.getElementById("sorting").appendChild(option4)

    } else {
        localStorage.setItem('lang', 'en')
        document.getElementById("l").textContent = "en"
        document.getElementById("r").textContent ="Sign up"
        document.getElementById("log").textContent ="Sign in"
        document.getElementById("menu1").textContent ="Find Flower by ID"
        document.getElementById("menu2").textContent ="Add new flower"
        document.getElementById("FindID1").innerHTML ="Enter flower id"
        document.getElementById("b1").textContent ="Get Flower"
        document.getElementById("FindID2").textContent ="Back"
        document.getElementById("AddF1").innerHTML ="Enter flower name"
        document.getElementById("AddF2").innerHTML ="Enter flower description"
        document.getElementById("AddF3").innerHTML ="Enter flower price"
        document.getElementById("b2").textContent ="Put Flower"
        document.getElementById("AddF4").textContent ="Back"
        document.getElementById("register1").innerHTML ="Name"
        document.getElementById("register2").innerHTML ="Surname"
        document.getElementById("register3").innerHTML ="Email"
        document.getElementById("register4").innerHTML ="Password"
        document.getElementById("register5").innerHTML ="Confirm Password"
        document.getElementById("reg").textContent ="Register"
        document.getElementById("register6").textContent ="Back"
        document.getElementById("login1").innerHTML ="Email"
        document.getElementById("login2").innerHTML ="Password"
        document.getElementById("log2").textContent ="Login"
        document.getElementById("login3").textContent ="Back"
        document.getElementById("cartb").textContent ="Cart"
        document.getElementById("out").textContent ="Sign out"
        document.getElementById("sorting").innerHTML=""
        var option1=document.createElement("option")
        option1.value="id"
        option1.text="Default order"
        var option2=document.createElement("option")
        option2.value="price"
        option2.text="Price"
        var option3=document.createElement("option")
        option3.value="nameEn"
        option3.text="Name"
        var option4=document.createElement("option")
        option4.value="categories"
        option4.text="Category"
        document.getElementById("sorting").appendChild(option1)
        document.getElementById("sorting").appendChild(option2)
        document.getElementById("sorting").appendChild(option3)
        document.getElementById("sorting").appendChild(option4)
    }
    if(localStorage.getItem('token')!=='') get_cart()
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
            displayFlower(data)
        })
}

function put() {
    if(localStorage.getItem('lang')==='en') {
        var nameen = document.getElementById("flower_name").value;
        var descen = document.getElementById("flower_desc").value;
        var namepl = undefined
        var descpl = undefined

    }
    else{
        var namepl = document.getElementById("flower_name").value;
        var descpl = document.getElementById("flower_desc").value;
        var nameen = undefined
        var descen = undefined
    }
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
                descriptionEn: descen,
                descriptionPl: descpl,
                images: [
                    0
                ],
                nameEn: descen,
                namePl: descpl,
                price: price
            })
        })
        .then(res => { return res.json() })
        .then(data => console.log(data))
}



function displayFlower(data) {
    if (document.getElementById("flower").innerHTML !== "") {
        document.getElementById("flower").innerHTML = ""
    }
    if (data === null) {
        const flowerDiv = document.getElementById("flower");
        const heading = document.createElement("h2");
        if (localStorage.getItem('lang') === "en") heading.innerHTML = "There is no such flower"
        else heading.innerHTML = "Brak kwiatu"
        flowerDiv.appendChild(heading);
        return
    }
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
    const flowerDiv = document.getElementById("flower");

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

    if (localStorage.getItem('lang') === "en")add.innerHTML="Add to cart"
    else add.innerHTML="Dodaj"
    add.onclick=function(){add_to_cart(data.id)}


    flower.appendChild(named);
    flower.appendChild(imagd);
    flower.appendChild(descd);
    flower.appendChild(document.createElement("br"))
    flower.appendChild(priced);
    if(localStorage.getItem('token')!=='') {
        flower.appendChild(qnt);
        flower.appendChild(add);
    }
    flowerDiv.appendChild(flower);
}

function swap_page(id) {
    page_id = id
    const flowerDiv = document.getElementById("flowerbed");
    flowerDiv.innerHTML = ""
    FlowersMain()
}

function add_page_button(id) {
    const flowerDiv = document.getElementById("flowerbed");
    const pagediv = document.createElement("div")
    pagediv.id="pagediv"

    for(let i=0;i<=id;i++) {
        const page = document.createElement("button");
        page.id = "page_" + i
        page.className = "Page_button"
        if (localStorage.getItem('lang') === "en") page.innerHTML = "Page " + (i + 1)
        else page.innerHTML = "Strona " + (i + 1)
        page.addEventListener('click', function () {
            swap_page(i)
        })
        pagediv.appendChild(page);
    }
    flowerDiv.appendChild(pagediv)
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
        .then(data => {console.log(data); for (let i = 0; i < data.data.length; i++) { displayFlowersMain(data.data[i]) }add_page_button(Math.floor(data.count/10)) })
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

    if (localStorage.getItem('lang') === "en")add.innerHTML="Add to cart"
    else add.innerHTML="Dodaj"
    add.onclick=function(){add_to_cart(data.id)}


    flower.appendChild(named);
    flower.appendChild(imagd);
    flower.appendChild(descd);
    flower.appendChild(document.createElement("br"))
    flower.appendChild(priced);
    if(localStorage.getItem('token')!=='') {
        flower.appendChild(qnt);
        flower.appendChild(add);
    }
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
    if(localStorage.getItem('lang')==='en') {document.getElementById("Reg_res").innerHTML = "Registered"}
    else {document.getElementById("Reg_res").innerHTML = "Zarejestrowano"}
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
        document.getElementById("lpass").value="";
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
    if(localStorage.getItem('lang')==='en') {
        document.getElementById("Log_res").className = "success"
        document.getElementById("Log_res").innerHTML = "Logged in"
        document.getElementById('auth').style.display = 'none'
        document.getElementById('Greeting').innerHTML = "Hello " + user.name + ' ' + user.surname + '!'
    }else{
        document.getElementById("Log_res").className = "success"
        document.getElementById("Log_res").innerHTML = "Zalogowano"
        document.getElementById('auth').style.display = 'none'
        document.getElementById('Greeting').innerHTML = "Witaj " + user.name + ' ' + user.surname + '!'
    }
    document.getElementById('auth2').style.display = 'block'
    FlowersMain();
}

function logout() {
    localStorage.setItem('token', '')
    document.getElementById('auth').style.display = 'block'
    document.getElementById('auth2').style.display = 'none'
    FlowersMain();
}

function show_menu() {
    const menu = document.getElementById("main");
    if (menu.style.display === 'block') menu.style.display = 'none';
    else if (menu.style.display === 'none') menu.style.display = 'block';

}

function get_cart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = ""
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
        .then(data => {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    displaycart(data[i])
                }
                const clear = document.createElement("button")

                if(localStorage.getItem('lang')==='en') {clear.innerHTML = "Clear Cart"}
                else {clear.innerHTML = "Wyczysc koszyk"}
                clear.onclick = function (){clear_cart()}
                cartDiv.appendChild(clear);
                cartDiv.appendChild(document.createElement("br"))
                const exit = document.createElement("button")
                if(localStorage.getItem('lang')==='en') {exit.textContent = "Back"}
                else exit.textContent = "Wstecz";
                exit.onclick=function () {show('flowerbed')}
                cartDiv.appendChild(exit);
            } else {
                if(localStorage.getItem('lang')==='en') {cartDiv.innerHTML = "Cart is empty";}
                else {cartDiv.innerHTML = "Koszyk jest pusty";}
                cartDiv.appendChild(document.createElement("br"))
                const exit = document.createElement("button")
                if(localStorage.getItem('lang')==='en') {exit.textContent = "Back";}
                else exit.textContent = "Wstecz";
                exit.onclick=function () {show('flowerbed')}
                cartDiv.appendChild(exit);
            }
        })
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

    if(localStorage.getItem('lang')==='en') {del.innerHTML="Remove from cart"}
    else {del.innerHTML="Usun z koszyka"}
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
