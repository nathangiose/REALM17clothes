function admin(){
    fetch('https://serene-hamlet-94464.herokuapp.com/register-admin/', {
    method: "POST",
    body: JSON.stringify({
        'admin_username': document.getElementById("username").value,
        'admin_password': document.getElementById("password").value,
    }),
    headers: {
        'Content-type': 'application/json',
    }
    }).then(response => response.json()).then(data => {
        console.log(data)
        if (data['message'] == 'failed'){
        alert("error failed to register")
        }
    else{
        window.location.href = './login.html'
    }    
    });
    
}

function user(){
    fetch('https://serene-hamlet-94464.herokuapp.com/user-registration/', {
    method: "POST",
    body: JSON.stringify({
        'first_name': document.getElementById("first_name").value,
        'last_name': document.getElementById("last_name").value,
        'address': document.getElementById("address").value,
        'email': document.getElementById("email").value,
        'username': document.getElementById("username").value,
        'password': document.getElementById("password").value,
    }),
    headers: {
        'Content-type': 'application/json',
    }
    }).then(response => response.json()).then(data => {
        console.log(data)
        if (data['message'] == 'Please enter a valid email address'){
        alert("Please enter a valid email address!")
        }
    else{
        window.location.href = './login.html'
    }
    });
    
}