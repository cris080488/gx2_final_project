let data;
let dt = JSON.parse(localStorage.json)
const n_date = new Date()
const actual_date = n_date.getFullYear() + '-' 
                    + String(n_date.getMonth()).padStart(2, '0') + '-'
                    + String(n_date.getDate()).padStart(2, '0')
            

//#region Fetch data

if(localStorage.json === "") {
    fetch('./data/data.json').then(response=>{
        return response.json()
    }).then(body=>{
        data = body.data
        localStorage.setItem('json', JSON.stringify(data))
    })
}
//#endregion


//#region Page navigation

function openWindow(url) {   
    
    window.location.assign(url)
}
//#endregion


//#region Header

if (document.getElementById("header")) {
    document.getElementById("header").addEventListener("load", get_user());
}

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

if (user_exit_bt) {
user_exit_bt.addEventListener("click", function () {
    localStorage.user = ''
    openWindow('index.html')
} )
}


backpage.addEventListener("click", function () {

    if (['/library.html', '/history.html', '/register.html' ].includes(window.location.pathname)){
        openWindow('home.html')
    } 

    if (window.location.pathname == '/edit') {
        openWindow('library.html')
    }
})
//#endregion


//#region Library
//#region Objects
let book_modal = document.getElementById("book-modal")
let rent_modal = document.getElementById("rent-modal")
let hist_modal = document.getElementById("hist-modal")
let disable_modal = document.getElementById("disable-modal")

let modal_container = document.getElementById("modal-content")
let disable_box = document.getElementById('disable-cont')
let hist_box = document.getElementById('rent-card-hist')
    
let btn_rent = document.getElementById("button-rent")
let btn_disable = document.getElementById("btn-disable")
let btn_rent_book = document.getElementById("button-rent-book")
let btn_edit = document.getElementById("btn-edit")
let btn_hist = document.getElementById("btn-hist")
let btn_disable_func = document.getElementById("btn-disable-func")
let btn_close_book = document.getElementById('btn-close-book')
let btn_close_rent = document.getElementById('btn-close-rent')
let btn_close_hist = document.getElementById('btn-close-hist')
let btn_close_dis = document.getElementById('btn-close-dis')


let book = {}

var book_rent = {}

//#endregion

//#region Modal function
function update_modal() {

    btn_disable.style.border = '1px solid #ED5E5E'
    btn_disable.style.color = '#ED5E5E'
    btn_disable.innerText = 'Inativar'

    btn_rent.disabled = false

   if(modal_container.contains(disable_box)) {
        disable_box.parentNode.removeChild(disable_box) 
    }
 
    if(modal_container.contains(hist_box)) {
        hist_box.parentNode.removeChild(hist_box)
    }

    var delivery_rent = actual_date

    if (book.rentHistory.length > 0) {
        delivery_rent = book.rentHistory[book.rentHistory.length -1].deliveryDate
    }

if ((book.status.isActive == 'true' || book.status.isActive == true) & delivery_rent > actual_date) {
        
        last_rent = book.rentHistory[book.rentHistory.length -1]
    

        hist_box = document.createElement("div")

        hist_box.innerHTML = `<p class="rent-table-title">Dados do aluno</p>` + 
        `<table class="rent-table"> <tr> <th>Nome do aluno</th> <th>Turma</th> <th>Data da retirada</th> <th>Data da entrega</th> </tr>` + 
        `<tr> <td>${last_rent.studentName}</td><td>${last_rent.class}</td><td>${last_rent.withdrawalDate}</td><td>${last_rent.deliveryDate}</td></tr></table>`
        
        hist_box.style.borderRadius = '5px'
        hist_box.style.textAlign = "left"

        modal_container.appendChild(hist_box)

        btn_rent.style.backgroundColor = '#F4F4F4'
        btn_rent.style.border = '1px solid #ADB5BD'
        btn_rent.innerText = 'Devolver'



    } 
    else if (book.status.isActive == true && Date(delivery_rent) <= Date(actual_date)){
        
        btn_rent.style.backgroundColor = '#FFC501'
        btn_rent.style.border = '1px solid #ADB5BD'
        btn_rent.innerText = 'Emprestar'
    }
     else if (book.status.isActive == false) {
          
        disable_box = document.createElement("div")

        disable_box.innerHTML = `<p class="disable-title">Informações da inativação</p>` + 
        `<div class="disable-description-box"><p class="desc-title"><strong>Motivo</strong></p><p>${book.status.description}</p></div>`
        
        modal_container.appendChild(disable_box)

        btn_disable.style.border = '1px solid #49D749'
        btn_disable.style.color = '#49D749'
        btn_disable.innerText = 'Ativar'

        btn_rent.disabled = true
    }
}
//#endregion


//#region Filter
document.getElementById("filter-button").addEventListener("click", function () {
    
    var word = document.getElementById("filter-input").value
    var category = document.getElementById("filter-list").value
    var book = []
    var cat

    if(category == 'Gênero') {
        
        cat = 'genre'
    } else if(category == 'Autor') {
        
        cat = 'author'
    } else if(category == 'Data de Entrada') {

        cat = 'systemEntryDate'
    } if(category == 'Título') {

        cat = 'tittle'
    }

    if (word !== ''){
        dt.books.forEach(e => {
            if(e[cat].toLowerCase().includes(word.toLowerCase())){
                book.push(e)
            }

        })

    } else {

        book = dt.books
    }
        
    updateLibrary(book)
})
//#endregion

//#region Build Library
document.getElementById("lib-container").addEventListener("load", updateLibrary(dt.books))

function updateLibrary(books) {
    
    let gallery_book = document.getElementById("book-galery")

    while(gallery_book.firstChild) {
        gallery_book.removeChild(gallery_book.firstChild)
    }

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

            document.getElementById("book-image").src = book.image
            document.getElementById("book-title").innerHTML = book.tittle
            document.getElementById("book-synopse").innerHTML = book.synopsis
            document.getElementById("book-author").innerHTML = book.author
            document.getElementById("book-gender").innerHTML = book.genre
            document.getElementById("book-date").innerHTML = book.systemEntryDate
            
            update_modal()

            book_modal.style.display = "block"

            })
        }
    }
//#endregion

//#region Rent book modal
btn_rent.addEventListener("click", function() {
    
   
    if (btn_rent.textContent == "Emprestar"){
        
        book_modal.style.display = "none"
        rent_modal.style.display = "block"
    } 
    else if (disable_box !== null){

        dt.books.find(b => b.tittle === localStorage.tittle).status.isActive = 'true'
        localStorage.json = JSON.stringify(dt)
        disable_box.parentNode.removeChild(disable_box)
        update_modal()
    }
    else if (hist_box !== null){

        len_hist = book.rentHistory.length -1
        dt.books.find(b => b.tittle === localStorage.tittle).rentHistory[len_hist].deliveryDate = actual_date
    
        localStorage.json = JSON.stringify(dt)
        hist_box.parentNode.removeChild(hist_box)
        
        update_modal()
    }
})

//////////////////////////////////////////////////////////////////////////////////////

btn_rent_book.addEventListener("click", function() {
    
    book_rent.studentName = document.getElementById("inpt-modal-student").value
    book_rent.class = document.getElementById("inpt-modal-class").value
    book_rent.withdrawalDate = document.getElementById("inpt-modal-drawaldate").value
    book_rent.deliveryDate = document.getElementById("inpt-modal-deliverydate").value  

    if (book_rent.studentName !== '' & book_rent.class !== '' 
        & book_rent.withdrawalDate !== '' & book_rent.deliveryDate !== '') {
            dt.books.find(b => b.tittle === localStorage.tittle).rentHistory.push(book_rent)
            localStorage.json = JSON.stringify(dt)
            rent_modal.style.display = 'none'
            
        } else {
            window.alert("Preencha todos os campos")
        }

        updateLibrary(dt.books)
    })

    

//#endregion

//#region edit modal
btn_edit.addEventListener("click", function() {

    book_modal.style.display = "none"
    openWindow('edit.html')
})
//#endregion

//#region history modal
btn_hist.addEventListener("click", function() {

    book_modal.style.display = "none"
    hist_modal.style.display = "block"
    view_hist(dt.books)
})

function view_hist (d) {

    let tb_body = document.getElementById('modal-historic-table')

    while (tb_body.rows.length > 0)
    { tb_body.deleteRow(0) }

    const book_hist = d.find( bk => bk.tittle === localStorage.tittle )

    book_hist.rentHistory.forEach((element, index) => {
        
        if(element.length !== 0) {
            var row = tb_body.insertRow(index)

            row.insertCell(0).innerHTML = element.studentName
            row.insertCell(1).innerHTML = element.class
            row.insertCell(2).innerHTML = element.withdrawalDate
            row.insertCell(3).innerHTML = element.deliveryDate

        }    
    })
}

//filter table
function filter_data(word, obj_name) {

    let rent_hist_book = []
    let temp_book = []

    temp_book.push(book)

    if (word !== '' & book.rentHistory.length > 0){
        temp_book[0].rentHistory.forEach(element => {

            if(element[obj_name].toLowerCase().includes(word.toLowerCase())){
                rent_hist_book.push(element)
            }
        })

    } else if (word == ''){
        rent_hist_book = book.rentHistory
    }
    temp_book[0].rentHistory = rent_hist_book
    view_hist(temp_book)
}

//#endregion

//#region disable modal
btn_disable.addEventListener("click", function() {


    if (btn_disable.textContent == "Inativar") {
        book_modal.style.display = "none"
        disable_modal.style.display = "block"
        
    } else {
        dt.books.find(b => b.tittle === localStorage.tittle).status.isActive = 'true'
        dt.books.find(b => b.tittle === localStorage.tittle).status.description = ''
        
        btn_disable.style.border = '1px solid #ED5E5E'
        btn_disable.style.color = '#ED5E5E'
        btn_disable.innerText = 'Inativar'

        btn_rent.disabled = false
        disable_box.parentNode.removeChild(disable_box)
    }
})


btn_disable_func.addEventListener("click", function() {

    const description = document.getElementById("description-disable").value

    localStorage.status_active = false
    localStorage.status_description = description

    if (description !== '') {

            dt.books.find(b => b.tittle === localStorage.tittle).status.isActive = false
            dt.books.find(b => b.tittle === localStorage.tittle).status.description = description
            localStorage.json = JSON.stringify(dt)
            book_modal.style.display = "none"
            disable_modal.style.display = "none"

        } else {
            window.alert("Preencha a descrição")
        }
    
    })

//#endregion

//#region btn Close
btn_close_book.addEventListener("click", function () {
    
    book_modal.style.display = 'none'
})
btn_close_rent.addEventListener("click", function () {
    
    rent_modal.style.display = 'none'
})
btn_close_hist.addEventListener("click", function () {
    
    hist_modal.style.display = 'none'
})
btn_close_dis.addEventListener("click", function () {
    
    disable_modal.style.display = 'none'
})

//#endregion
//#endregion

