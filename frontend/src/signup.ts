let full_name = document.getElementById('name') as HTMLInputElement;
let user_email = document.getElementById('email') as HTMLInputElement;
let phone = document.getElementById('phone_no') as HTMLInputElement;
let pass = document.getElementById('password') as HTMLInputElement;
let confirm_password = document.getElementById('confirm_password') as HTMLInputElement;
let registerError= document.getElementById('response') as HTMLElement

let reg_form = document.getElementById("signup-form") as HTMLFormElement;

reg_form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let userName = full_name.value.trim();
    let email = user_email.value.trim();
    let phone_no = phone.value.trim();
    let password = pass.value.trim();
    let confirm_pass = confirm_password.value.trim();

    if (userName === '' || email === '' || phone_no === '' || password === '' || confirm_pass === '') {
        registerError.textContent = 'please fill all fields'
        return; 
    }

    if (password.length < 8) {
        registerError.textContent = "Password must be at least 8 characters";
        return;
    }
    if (password !== confirm_pass) {
        registerError.textContent = 'Passwords do not match'
        return; 
    }

    try {
        const response = await fetch('http://localhost:4600/user/register', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "userName": userName,
                "email": email,
                "phone_no": phone_no,
                "password": password
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            gotoLogin();
        } else {
            const errorData = await response.json();
            console.log("Registration failed. Server returned:", errorData);
            registerError.textContent = `registration failed :${JSON.stringify({errorData})}`
        }
    } catch (error) {
        const {message}:any
         = error
        console.log(message);
        
        console.error("An error occurred during registration:", error);
        
        
    }
});

function gotoLogin() {
    location.href = 'signin.html';
}