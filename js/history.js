let data;
let dt = JSON.parse(localStorage.json)
const n_date = new Date()
/*const actual_date = String(n_date.getDate()).padStart(2, '0') + '/' 
                    + String(n_date.getMonth()).padStart(2, '0') + '/'
                    + n_date.getFullYear()*/
            

const actual_date = "10/07/2022"

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

if (user_exit_bt) {
user_exit_bt.addEventListener("click", function () {
    localStorage.user = ''
    openWindow('index.html')
} )
}


backpage.addEventListener("click", function () {

    window.location.assign('home.html')
})

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
