"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let full_name = document.getElementById('name');
let user_email = document.getElementById('email');
let phone = document.getElementById('phone_no');
let pass = document.getElementById('password');
let confirm_password = document.getElementById('confirm_password');
let registerError = document.getElementById('response');
let reg_form = document.getElementById("signup-form");
reg_form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    let userName = full_name.value.trim();
    let email = user_email.value.trim();
    let phone_no = phone.value.trim();
    let password = pass.value.trim();
    let confirm_pass = confirm_password.value.trim();
    if (userName === '' || email === '' || phone_no === '' || password === '' || confirm_pass === '') {
        registerError.textContent = 'please fill all fields';
        return;
    }
    if (password.length < 8) {
        registerError.textContent = "Password must be at least 8 characters";
        return;
    }
    if (password !== confirm_pass) {
        registerError.textContent = 'Passwords do not match';
        return;
    }
    try {
        const response = yield fetch('http://localhost:4600/user/register', {
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
            const data = yield response.json();
            console.log(data);
            gotoLogin();
        }
        else {
            const errorData = yield response.json();
            console.log("Registration failed. Server returned:", errorData);
            registerError.textContent = `registration failed :${JSON.stringify({ errorData })}`;
        }
    }
    catch (error) {
        const { message } = error;
        console.log(message);
        console.error("An error occurred during registration:", error);
    }
}));
function gotoLogin() {
    location.href = 'signin.html';
}
