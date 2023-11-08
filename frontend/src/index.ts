let login_email = document.getElementById('email') as HTMLInputElement
let login_password = document.getElementById('password') as HTMLInputElement

let login_form = document.getElementById('login-form') as HTMLFormElement

let email_error = document.querySelector('#email-error') as HTMLElement
let password_error = document.querySelector('#password-error') as HTMLElement

login_form.addEventListener('submit', (e)=>{
    e.preventDefault()

    let email = login_email.value
    let password = login_password.value

    if(!email){
        email_error.textContent = 'Email address is required'

        setTimeout(() => {
             email_error.textContent = ''
        }, 3000);
    }

    if(!password){
        password_error.textContent = 'Password is required'

         setTimeout(() => {
             password_error.textContent = ''
         }, 3000);
    }

    if(password && email){
        const promise2 = new Promise<{error?:String, message?:string, token?:string}>((res, rej)=>{
            fetch('http://localhost:4600/user/login',{
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            }).then(res=>res.json()).then(data=>{
                console.log(data);

                localStorage.setItem('token', data.token)

                redirect()

                res(data)
                
            }).catch(error=>{
                console.log(error);

                rej(error)
                
            })
        })

        function redirect(){
            const token = localStorage.getItem('token') as string

            new Promise <{info:{
                employee_id?:string, role?:string, name?:string, email?:string
            }}>((resolve, reject)=>{
                fetch('http://localhost:4600/user/check_user_details', {
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'token': token
                    },
                    method: "GET"
                }).then(res =>{
                   
                    resolve(res.json())
                }).catch(error=>{
                    reject(error)
                })
            }).then(data=>{

                console.log(data['info']);
                

                if(data['info'].role === 'employee'){
                    localStorage.setItem('user_email', data['info'].email!)
                    location.href = 'user2.html'
                }else if(data['info'].role === 'admin'){
                    localStorage.setItem('user_email', data['info'].email!)
                    location.href = 'admin.html'
                }
            })
        }
    }
})