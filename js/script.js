var global_user = ''
var page_history = ''
let data;

fetch('./data/data.json').then(response=>{
    return response.json()
}).then(body=>{
    data = body.data
})



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


function openWindow(url) {   

    window.location.assign(url)
}


function b(){
    
    var books = data['books']

    books.forEach(element => {
        
        if(element.status.isActive === true) {
            let card = document.createElement("div")
            card.className = "book-card"
        
            let photo = document.createElement('img')
            photo.src = element.image
            card.appendChild(photo)
        
            let name = document.createTextNode(element.tittle);
            card.appendChild(name);
        
            let container = document.getElementById("book-galery");
            container.appendChild(card);
        }
        })
}


