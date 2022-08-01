var global_user = ''
var page_history = ''
let data;

fetch('./data/data.json').then(response=>{
    return response.json()
}).then(body=>{
    data = body.data
})

/* login */

function login() {
    var user = document.getElementById('login-email').value
    var pwd = document.getElementById('login-pwd').value
    
    var logins = data.login

    const result = logins.find( usr => usr.email === user )

    if(result.password === pwd && result.email === user){
        global_user = result.email.value
        console.log(global_user)
        window.location.assign('./home.html')
    } else {
        alert("Usuário e/ou senha incorreta!")
    }
}

/* home */

function openWindow(url) {   
    
    window.location.assign(url)
}


/*document.getElementById("home-library").addEventListener("click", updateLibrary);*/


/* Library */

function updateLibrary() {
    
    var books = data['books']

    books.forEach(element => {
        
            let card = document.createElement("div")
            card.className = "book-card"
        
            let photo = document.createElement('img')
            photo.src = element.image
            card.appendChild(photo)
        
            let name = document.createTextNode(element.tittle);
            card.appendChild(name);
        
            let container = document.getElementById("book-galery");
            container.appendChild(card);
        })
}

/* historic */

function historic() {

    var books = data['books']
    var i = 0
    let tb_body = document.getElementById('bd-historic-table')

    books.forEach(element => {
        
        if(element.rentHistory.length !== 0) {
            var row = tb_body.insertRow(i)

            var cell1 = row.insertCell(0)
            var cell2 = row.insertCell(1)
            var cell3 = row.insertCell(2)
            var cell4 = row.insertCell(3)
            var cell5 = row.insertCell(4)

            var hist = element.rentHistory[element.rentHistory.length - 1]

            cell1.innerHTML = hist.studentName
            cell2.innerHTML = hist.class
            cell3.innerHTML = element.tittle
            cell4.innerHTML = hist.withdrawalDate
            cell5.innerHTML = hist.deliveryDate


        }    


    })
}