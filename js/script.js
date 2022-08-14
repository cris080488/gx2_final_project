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


//#region Login

function login() {
    
    var user = document.getElementById('login-email').value
    var pwd = document.getElementById('login-pwd').value
    
    var logins = dt.login

    const result = logins.find( usr => usr.email === user )
    localStorage.setItem('user', user)

    if(result.password === pwd && result.email === user){
        global_user = result.email.value
        window.location.assign('./home.html')
    } else {
        alert("Usuário e/ou senha incorreta!")
    }
}
//#endregion
