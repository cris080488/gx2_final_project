
let data
let dt = JSON.parse(localStorage.json)
var img 

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

    window.location.assign('home.html')
    } )

//#endregion


//#region Register new book
//checks if the register page has been loaded 

//Button listener to add new book
document.getElementById('new-book').addEventListener("click", add_book)

//Button listener to clear inputs
document.getElementById('cancel').addEventListener("click", clear_fields)

//function to add new book
function add_book () {

    let new_book = {}

    new_book['tittle'] = document.getElementById("reg-book-title").value
    new_book['author'] = document.getElementById("reg-book-author").value
    new_book['genre'] = document.getElementById("reg-book-gender").value
    new_book['status'] = {"isActive": true, "description": ""}
    new_book['image'] = img
    new_book['systemEntryDate'] = document.getElementById("reg-book-date").value
    new_book['Synopsis'] = document.getElementById("reg-book-synopsis").value
    new_book['rentHistory'] = []

    save_json(new_book)
}

//function to clear inputs
function clear_fields () {

    document.getElementById("reg-book-title").value = ''
    document.getElementById("reg-book-author").value = ''
    document.getElementById("reg-book-gender").value = ''
    document.getElementById("reg-input-image").value = ''
    document.getElementById("reg-book-date").value = ''
    document.getElementById("reg-book-synopsis").value = ''
}


//Save dataset
function save_json(book) {

    let temp_data = JSON.parse(localStorage.json)
    
    temp_data.books.push(book)
    localStorage.json = JSON.stringify(temp_data)

}
//#endregion

function encodeImageFileAsURL(element) {

    if (element.files.length > 0){
    var file = element.files[0]
    var reader = new FileReader()
    reader.onloadend = function (file_loaded) {
        
        var src_data = file_loaded.target.result

        img = src_data
        }
    }
}
