


function get(){
    var idd=document.getElementById("flower_id").value;
    fetch('http://localhost:8080/api/product/'+idd)
    .then(res => res.json())
    .then(data=>{console.log(data);displayFlower(data)})
}

function put(){
    var name=document.getElementById("flower_name").value;
    var desc=document.getElementById("flower_desc").value;
    var price=document.getElementById("flower_price").value;
    fetch('http://localhost:8080/api/product',{method:'POST',
headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTY1MDgyNTc4NywiaWF0IjoxNjQ5OTYxNzg3fQ.miH4qHV9eBAxOnSFBEmj0kBvWcb3aFL0u648XIu1Vms'
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


function displayFlower(data) {
    if(document.getElementById("flower").innerHTML!==""){
        document.getElementById("flower").innerHTML=""
    }
    const name = data.name
    const desc=data.description
    const rc=data.price
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