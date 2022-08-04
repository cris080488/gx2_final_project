var data;

/* Load Data*/

fetch('./data/data.json').then(response=>{
    return response.json()
}).then(body=>{
    data = body.data
})

/* back page*/

//#region Login

function login() {
    
    var user = document.getElementById('login-email').value
    var pwd = document.getElementById('login-pwd').value
    
    var logins = data.login

    const result = logins.find( usr => usr.email === user )
    localStorage.setItem('user', user)

    if(result.password === pwd && result.email === user){
        global_user = result.email.value
        console.log(global_user)
        window.location.assign('./home.html')
    } else {
        alert("Usuário e/ou senha incorreta!")
    }
}
//#endregion


//#region Home

function openWindow(url) {   
    
    window.location.assign(url)
}


//#endregion


//#region Library Functions

document.getElementById("lib-container").onload = updateLibrary;


function updateLibrary() {

    books = data.books

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
            localStorage.setItem('tittle', book.tittle)
            localStorage.setItem('author',  book.author)
            localStorage.setItem('genre', book.genre)
            localStorage.setItem('status_active', book.status.isActive)
            localStorage.setItem('status_description', book.status.description)
            localStorage.setItem('image', book.image)
            localStorage.setItem('systemEntryDate', book.systemEntryDate)
            localStorage.setItem('synopsis', book.synopsis)
            localStorage.setItem('history', JSON.stringify(book.rentHistory))

            document.getElementById("book-image").src = localStorage.image
            document.getElementById("book-title").innerHTML = localStorage.tittle
            document.getElementById("book-synopse").innerHTML = localStorage.synopsis
            document.getElementById("book-author").innerHTML = localStorage.author
            document.getElementById("book-gender").innerHTML = localStorage.genre
            document.getElementById("book-date").innerHTML = localStorage.systemEntryDate

            let modal = document.getElementById("book-modal");
            modal.style.display = "block" ;

        })
    }
}

//#endregion


//#region Modals
//------------------------rent modal----------------------------------------

document.getElementById("button-rent").addEventListener("click", function() {
    let book_modal = document.getElementById("book-modal");
    let rent_modal = document.getElementById("rent-modal");
    rent_modal.style.display = "block" ;
    book_modal.style.display = "none" ;
})

//------------------------edit page----------------------------------------

document.getElementById("btn-edit").addEventListener("click", function() {
    let book_modal = document.getElementById("book-modal");
    book_modal.style.display = "none" ;
    openWindow('edit.html')
})


//------------------------history modal----------------------------------------

document.getElementById("btn-hist").addEventListener("click", function() {
    let book_modal = document.getElementById("book-modal");
    let hist_modal = document.getElementById("hist-modal");
    hist_modal.style.display = "block" ;
    book_modal.style.display = "none" ;

    let tb_body = document.getElementById('modal-historic-table')
    const book_hist = data.books.find( book => book.tittle === localStorage.tittle )

    book_hist.rentHistory.forEach((element, index) => {
        
        if(element.length !== 0) {
            var row = tb_body.insertRow(index)

            var cell1 = row.insertCell(0)
            var cell2 = row.insertCell(1)
            var cell3 = row.insertCell(2)
            var cell4 = row.insertCell(3)

            cell1.innerHTML = element.studentName
            cell2.innerHTML = element.class
            cell3.innerHTML = element.withdrawalDate
            cell4.innerHTML = element.deliveryDate
        }    
    })

})


//------------------------disable modal----------------------------------------

document.getElementById("btn-disable").addEventListener("click", function() {
    let book_modal = document.getElementById("book-modal");
    let dis_modal = document.getElementById("disable-modal");
    dis_modal.style.display = "block" ;
    book_modal.style.display = "none" ;
})


document.getElementById("btn-disable-func").addEventListener("click", function() {

    const description = document.getElementById("description-disable").value

    localStorage.status_active = false
    localStorage.status_description = description
    
    })

//#endregion


//#region history

function history() {

    var books = data.books
    let tb_body = document.getElementById('bd-historic-table')

    books.forEach((element, index) => {
        
        if(element.rentHistory.length !== 0) {
            var row = tb_body.insertRow(index)

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
//#endregion


