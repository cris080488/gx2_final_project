let data;
let dt = JSON.parse(localStorage.json)


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


//#endregion
