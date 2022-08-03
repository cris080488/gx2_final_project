var global_user = ''
var page_history = ''
var data;

/* Load Data*/

fetch('./data/data.json').then(response=>{
    return response.json()
}).then(body=>{
    data = body.data
})


/* back page*/

/* Login */

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

/* Home */
function openWindow(url) {   
    
    window.location.assign(url)
}

/* Library */

function updateLibrary() {
    
    var books = data.books

    books.forEach(element => {
        
            let card = document.createElement("div")
            card.className = "book-card"
            card.name = element.tittle
        
            let photo = document.createElement('img')
            photo.src = element.image
            card.appendChild(photo)
        
            let name = document.createElement('p')
            name.innerText = element.tittle;
            card.appendChild(name);
        
            let container = document.getElementById("book-galery");
            container.appendChild(card);
        })

    var cards = document.getElementsByClassName('book-card')
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function (e) {

            book = books.find(b => b.tittle === this.children[1].innerHTML)
            document.getElementById("book-image").src = book.image
            document.getElementById("book-title").innerHTML = book.tittle
            document.getElementById("book-synopse").innerHTML = book.synopsis
            document.getElementById("book-author").innerHTML = book.author
            document.getElementById("book-gender").innerHTML = book.genre
            document.getElementById("book-date").innerHTML = book.systemEntryDate

            let modal = document.getElementById("book-modal");
            modal.style.display = "block" ;

        })
    }
}

/* Modals */

document.getElementById("button-rent").addEventListener("click", function() {
    let book_modal = document.getElementById("book-modal");
    let rent_modal = document.getElementById("rent-modal");
    rent_modal.style.display = "block" ;
    book_modal.style.display = "none" ;
})

document.getElementById("btn-edit").addEventListener("click", function() {
    let book_modal = document.getElementById("book-modal");
    book_modal.style.display = "none" ;
    openWindow('edit.html')
})

document.getElementById("btn-disable").addEventListener("click", function() {
    let book_modal = document.getElementById("book-modal");
    let dis_modal = document.getElementById("disable-modal");
    dis_modal.style.display = "block" ;
    book_modal.style.display = "none" ;
})

document.getElementById("btn-hist").addEventListener("click", function() {
    let book_modal = document.getElementById("book-modal");
    let hist_modal = document.getElementById("hist-modal");
    hist_modal.style.display = "block" ;
    book_modal.style.display = "none" ;
})

/* Historic */

function history() {

    var books = data.books
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