
let data;
let dt = JSON.parse(localStorage.json)
let ed_book
var book_index = 0
let book_date = document.getElementById("ed-book-date")
let genre_list = document.getElementById("genres")


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
    window.location.assign('index.html')
} )

backpage.addEventListener("click", function () {

    window.location.assign('library.html')
    } )

//#endregion


//#region Register new book
//checks if the register page has been loaded 

//Document listener

document.addEventListener('DOMContentLoaded', fill)
//document.getElementById('edit').addEventListener('load', fill)

//Button listener to add new book
document.getElementById('save').addEventListener("click", edit_book)

//Button listener to clear inputs
document.getElementById('cancel').addEventListener("click", clear_fields)

//function to add new book
function fill () {

    ed_book = dt.books.find(b => b.tittle === localStorage.tittle)
    book_index = dt.books.indexOf(ed_book)

    document.getElementById("ed-book-title").value = ed_book.tittle
    document.getElementById("ed-book-author").value = ed_book.author
    genre_list.selectedIndex = select_option(genre_list, ed_book.genre)
    document.getElementById("edit-image").src = ed_book.image
    document.getElementById("ed-book-synopsis").value = ed_book.synopsis

}

function select_option (dropdown_obj, text_opt){

    for (var i = 0; i <dropdown_obj.options.length; i++) {
        if (dropdown_obj.options[i].text === text_opt) {
            return i
        }
    }
}
//function to clear inputs
function clear_fields () {

    document.getElementById("ed-book-title").value = ''
    document.getElementById("ed-book-author").value = ''
    document.getElementById("ed-input-image").value = ''
    document.getElementById("ed-book-date").value = ''
    document.getElementById("ed-book-synopsis").value = ''
}


//Save dataset
function edit_book() {

    let temp_data = JSON.parse(localStorage.json)
    
    ed_book.tittle = document.getElementById("ed-book-title").value
    ed_book.author = document.getElementById("ed-book-author").value
    ed_book.genre = document.getElementById("ed-book-gender").value
    
    ed_book.systemEntryDate = document.getElementById("ed-book-date").value 
    ed_book.synopsis = document.getElementById("ed-book-synopsis").value
    
    temp_data.books[book_index] = ed_book

    localStorage.json = JSON.stringify(temp_data)

}
//#endregion


//#region Convert image
function encodeImageFileAsURL(element) {

    if (element.files.length > 0){
    var file = element.files[0]
    var reader = new FileReader()
    reader.onloadend = function (file_loaded) {
        
        var src_data = file_loaded.target.result

        ed_book.image = src_data
        }
    }
}
//#endregion