let data;
let dt = JSON.parse(localStorage.json)
const n_date = new Date()
const actual_date = String(n_date.getDate()).padStart(2, '0') + '/' 
                    + String(n_date.getMonth()).padStart(2, '0') + '/'
                    + n_date.getFullYear()
            

//#region Fetch data

if(!data) {
    fetch('./data/data.json').then(response=>{
        return response.json()
    }).then(body=>{
        data = body.data
        localStorage.setItem('json', JSON.stringify(data))
        console.log('ok')
    })
}
//#endregion


//#region Page navigation

function openWindow(url) {   
    
    window.location.assign(url)
}
//#endregion


//#region Header

document.getElementById("header").addEventListener("load", get_user());

function get_user() {
    var li = '<li class="user-exit" id="user-exit"><a>Sair</a></li>'

    document.getElementById("usr-name").innerHTML = localStorage.user + li
}

let menu_user = document.getElementById("menu-user")
let user_exit_bt = document.getElementById("user-exit")
let user_ul = document.getElementById('usr-name')
let backpage = document.getElementById('backpage')

document.documentElement.onclick = function(event){

    if (event.target == user_ul) {
        user_exit_bt.style.display = 'block';
    }
    else {
        user_exit_bt.style.display = 'none'
    }
}

user_exit_bt.addEventListener("click", function () {
    localStorage.user = ''
    openWindow('index.html')
} )


backpage.addEventListener("click", function () {

    if (['/library.html', '/history.html', '/register.html' ].includes(window.location.pathname)){
        openWindow('home.html')
    } else{
        openWindow('library.html')
    }
})
//#endregion


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


//#region Library

document.getElementById("filter-button").addEventListener("click", function () {
    var word = document.getElementById("filter-input").value
    var category = document.getElementById("filter-list").value
    
    if(category == 'Gênero') {
        cat = 'genre'
    }

    console.log(Object.keys(dt.books[1]))
})

document.getElementById("lib-container").addEventListener("load", updateLibrary(dt.books));

function updateLibrary(books) {

    //Generate each card of the gallery
    books.forEach(element => {
        
            let card = document.createElement("div")
            
            card.className = "book-card"
            card.name = element.tittle
            card.innerHTML = `<img src='${element.image}'><p>${element.tittle}</p>`
        
            document.getElementById("book-galery").appendChild(card)

        })

    var cards = document.getElementsByClassName('book-card')
    
    //Generate click event for each book card
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
            let modal_container = document.getElementById("modal-content")
            let rent_btn = document.getElementById("button-rent")
            let rents = JSON.parse(localStorage.history)
            var last_rent = ''
            
            //Save actual date if last rental date is greater than actual date 
            if (rents[rents.length -1] >= actual_date) {
                last_rent = rents[rents.length -1]
            }

            //Builds the HTML elements, if last rent is not empty and the book is active
            if (last_rent & localStorage.status_active === true) {
                modal_container.innerHTML += 
            `<h3>Dados do aluno</h3> <table class="rent-table"> <tr> <th>Nome do aluno</th> <th>Turma</th> <th>Data da retirada</th> <th>Data da entrega</th> </tr> <tr> <th>${last_rent.studentName}</th><th>${last_rent.class}</th><th>${last_rent.withdrawalDate}</th><th>${last_rent.deliveryDate}</th></tr></table>`
                rent_btn.disabled = true
            }

            //Builds the HTML elements, if book is inactive
            if (localStorage.status_active === false) {
                modal_container.innerHTML += `<h3>Informações da inativação</h3><div class="disable-description-box"><p><strong>Motivo<strong></p><p>${localStorage.status_description}</p></div>`
                rent_btn.disabled = true

            }

            modal.style.display = "block"
        })
    }
}
//#endregion


//#region Modals

//------------------------rent modal----------------------------------------
//#region rent modal
document.getElementById("button-rent").addEventListener("click", function() {

    document.getElementById("book-modal").style.display = "none"
    document.getElementById("rent-modal").style.display = "block"
})

document.getElementById("button-rent-book").addEventListener("click", function() {
    
    var bk_rent = {}
    
    bk_rent.student = document.getElementById("inpt-modal-student").value
    bk_rent._class = document.getElementById("inpt-modal-class").value
    bk_rent.drawalDate = document.getElementById("inpt-modal-drawaldate").value
    bk_rent.deliveryDate = document.getElementById("inpt-modal-deliverydate").value  

    if (bk_rent.student !== '' & bk_rent._class !== '' 
        & bk_rent.drawalDate !== '' & bk_rent.deliveryDate !== '') {

            dt.books.find(b => b.tittle === localStorage.tittle).rentHistory.push(bk)
            localStorage.json = JSON.stringify(dt)

        } else {
            window.alert("Preencha todos os campos")
        }
    
})
//#endregion

//------------------------edit page----------------------------------------
//#region edit modal
document.getElementById("btn-edit").addEventListener("click", function() {

    document.getElementById("book-modal").style.display = "none"
    openWindow('edit.html')
})
//#endregion

//------------------------history modal----------------------------------------
//#region history modal
document.getElementById("btn-hist").addEventListener("click", function() {

    document.getElementById("book-modal").style.display = "none"
    document.getElementById("hist-modal").style.display = "block"

    let tb_body = document.getElementById('modal-historic-table')
    const book_hist = data.books.find( book => book.tittle === localStorage.tittle )

    book_hist.rentHistory.forEach((element, index) => {
        
        if(element.length !== 0) {
            var row = tb_body.insertRow(index)

            row.insertCell(0).innerHTML = element.studentName
            row.insertCell(1).innerHTML = element.class
            row.insertCell(2).innerHTML = element.withdrawalDate
            row.insertCell(3).innerHTML = element.deliveryDate

        }    
    })

})
//#endregion

//------------------------disable modal----------------------------------------
//#region disable modal
document.getElementById("btn-disable").addEventListener("click", function() {

    if (document.getElementById("btn-disable").textContent == "Inativar") {
        document.getElementById("book-modal").style.display = "none"
        document.getElementById("disable-modal").style.display = "block"
    } else {

    }
})


document.getElementById("btn-disable-func").addEventListener("click", function() {

    const description = document.getElementById("description-disable").value

    localStorage.status_active = false
    localStorage.status_description = description

    if (description !== '') {

            dt.books.find(b => b.tittle === localStorage.tittle).status.isActive = false
            dt.books.find(b => b.tittle === localStorage.tittle).status.description = false
            localStorage.json = JSON.stringify(dt)

        } else {
            window.alert("Preencha a descrição")
        }
    
    })


document.getElementById('btn-close').addEventListener("click", function () {
    
   let modals = document.getElementsByClassName('modal')
  
   console.log(modals)
   })
//#endregion


//#endregion


//#region History

function history() {

    var books = dt.books
    let tb_body = document.getElementById('bd-historic-table')

    books.forEach((element, index) => {

        var hist_length = element.rentHistory.length
        
        if(hist_length !== 0) {

            element.rentHistory.forEach((rent_elem, rent_index) => {

                var row = tb_body.insertRow(rent_index)

                row.insertCell(0).innerHTML = rent_elem.studentName
                row.insertCell(1).innerHTML = rent_elem.class
                row.insertCell(2).innerHTML = element.tittle
                row.insertCell(3).innerHTML = rent_elem.withdrawalDate
                row.insertCell(4).innerHTML = rent_elem.deliveryDate
            })
        }    
    })
}
//#endregion


//#region Register new book



//#endregion